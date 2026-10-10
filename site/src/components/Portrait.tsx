import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';

/**
 * The signature animation: the portrait starts as a noisy, scattered dataset.
 * The points are "cleaned" into the image, a model line sweeps across it and the real photo is revealed.
 * Afterwards the points stay interactive (they flee the cursor / finger) and can be toggled back with DATA VIEW.
 */

const PALETTE = ['#16303f', '#1d4f63', '#1f7f95', '#38e1ff', '#7df0c8', '#c8ff3d', '#e9ffb0', '#ffffff'];

type View = 'photo' | 'data';
export const STAGES = ['RAW DATA', 'CLEANING', 'MODELLING', 'INSIGHT'] as const;

export default function Portrait({ onStage }: { onStage?: (i: number) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [view, setView] = useState<View>('data');
  const viewRef = useRef<View>('data');
  const reveal = useMotionValue(0);
  const photoOpacity = useMotionValue(1);
  const clip = useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`);
  const sweepLeft = useTransform(reveal, (v) => `${v}%`);
  const sweepOpacity = useTransform(reveal, [0, 2, 98, 100], [0, 1, 1, 0]);
  const [done, setDone] = useState(false);
  const stageCb = useRef(onStage);
  stageCb.current = onStage;

  /* ---- timeline ---- */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      reveal.set(100);
      viewRef.current = 'photo';
      setView('photo');
      setDone(true);
      stageCb.current?.(3);
      return;
    }
    const timers: number[] = [];
    let ctl: ReturnType<typeof animate> | undefined;
    stageCb.current?.(0);
    timers.push(window.setTimeout(() => stageCb.current?.(1), 900));
    timers.push(window.setTimeout(() => stageCb.current?.(2), 2300));
    timers.push(
      window.setTimeout(() => {
        stageCb.current?.(3);
        ctl = animate(reveal, 100, {
          duration: 1.5,
          ease: [0.65, 0, 0.35, 1],
          onComplete: () => {
            viewRef.current = 'photo';
            setView('photo');
            setDone(true);
          },
        });
      }, 3500),
    );
    return () => {
      timers.forEach(window.clearTimeout);
      ctl?.stop();
    };
  }, [reveal]);

  const toggle = (v: View) => {
    if (!done) return;
    viewRef.current = v;
    setView(v);
    animate(photoOpacity, v === 'photo' ? 1 : 0, { duration: 0.5 });
  };

  /* ---- particle canvas ---- */
  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let assembled = false;
    let t0 = performance.now() + 250;
    let count = 0;
    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let dl = new Float32Array(0);
    let rad = new Float32Array(0);
    let buckets: Int32Array[] = [];
    let amb: { x: number; y: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let dotsAlpha = 1;

    const img = new Image();
    img.src = profile.portrait.src;

    const build = () => {
      if (!img.complete || !img.naturalWidth) return;
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = Math.max(5, Math.round(w / 68));
      const cols = Math.ceil(w / step);
      const rows = Math.ceil(h / step);
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const list: { px: number; py: number; l: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.4) continue;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          list.push({ px: (c + 0.5) * step, py: (r + 0.5) * step, l: Math.min(1, Math.pow(lum, 0.8) * 1.15) });
        }
      }
      count = list.length;
      hx = new Float32Array(count);
      hy = new Float32Array(count);
      sx = new Float32Array(count);
      sy = new Float32Array(count);
      x = new Float32Array(count);
      y = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      dl = new Float32Array(count);
      rad = new Float32Array(count);
      const tmp: number[][] = PALETTE.map(() => []);
      list.forEach((p, i) => {
        hx[i] = p.px;
        hy[i] = p.py;
        sx[i] = Math.random() * w;
        sy[i] = Math.random() * h;
        const dist = Math.hypot(p.px - w / 2, p.py - h / 2) / Math.hypot(w / 2, h / 2);
        dl[i] = Math.random() * 1.1 + dist * 0.7;
        rad[i] = step * (0.17 + 0.34 * Math.pow(p.l, 0.9));
        x[i] = assembled || reduce ? p.px : sx[i];
        y[i] = assembled || reduce ? p.py : sy[i];
        tmp[Math.min(PALETTE.length - 1, Math.floor(p.l * PALETTE.length))].push(i);
      });
      buckets = tmp.map((a) => Int32Array.from(a));

      const n = w < 420 ? 34 : 64;
      amb = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !count) return;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      // ambient plexus (always on)
      for (const a of amb) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -10) a.x = w + 10;
        if (a.x > w + 10) a.x = -10;
        if (a.y < -10) a.y = h + 10;
        if (a.y > h + 10) a.y = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < amb.length; i++) {
        const a = amb[i];
        for (let j = i + 1; j < amb.length; j++) {
          const b = amb[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.strokeStyle = `rgba(56,225,255,${0.16 * (1 - d / 90)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 150) {
          ctx.strokeStyle = `rgba(200,255,61,${0.5 * (1 - dm / 150)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(56,225,255,0.55)';
      for (const a of amb) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, 6.2832);
        ctx.fill();
      }

      // portrait particles
      const target = viewRef.current === 'data' ? 1 : 0;
      dotsAlpha += (target - dotsAlpha) * 0.08;
      if (t > 3.4) assembled = true;
      if (dotsAlpha > 0.01) {
        const R = Math.max(60, w * 0.16);
        const R2 = R * R;
        for (let i = 0; i < count; i++) {
          let tx: number;
          let ty: number;
          if (reduce || t >= dl[i] + 0.2) {
            tx = hx[i];
            ty = hy[i];
            const dx = x[i] - mouse.x;
            const dy = y[i] - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / R) * 7;
              vx[i] += (dx / d) * f;
              vy[i] += (dy / d) * f;
            }
          } else {
            // still raw: drift as noisy data
            tx = sx[i];
            ty = sy[i];
            vx[i] += (Math.random() - 0.5) * 0.5;
            vy[i] += (Math.random() - 0.5) * 0.5;
          }
          vx[i] = (vx[i] + (tx - x[i]) * 0.06) * 0.84;
          vy[i] = (vy[i] + (ty - y[i]) * 0.06) * 0.84;
          x[i] += vx[i];
          y[i] += vy[i];
        }
        ctx.globalAlpha = dotsAlpha;
        for (let b = 0; b < buckets.length; b++) {
          const idx = buckets[b];
          if (!idx.length) continue;
          ctx.fillStyle = PALETTE[b];
          ctx.beginPath();
          for (let k = 0; k < idx.length; k++) {
            const i = idx[k];
            ctx.moveTo(x[i] + rad[i], y[i]);
            ctx.arc(x[i], y[i], rad[i], 0, 6.2832);
          }
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };

    const onLoad = () => {
      build();
      t0 = performance.now() + 250;
    };
    if (img.complete) onLoad();
    else img.addEventListener('load', onLoad);

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.01 });
    io.observe(wrap);

    const move = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerleave', leave);
    wrap.addEventListener('pointerup', leave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      img.removeEventListener('load', onLoad);
      wrap.removeEventListener('pointermove', move);
      wrap.removeEventListener('pointerleave', leave);
      wrap.removeEventListener('pointerup', leave);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div ref={wrapRef} className="relative aspect-[999/1246] w-full touch-pan-y select-none">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <motion.img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="(max-width: 1024px) 80vw, 460px"
          alt={profile.portrait.alt}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          style={{ clipPath: clip, opacity: photoOpacity }}
        />
        {/* model line sweeping across */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-y-0 w-px" style={{ left: sweepLeft, opacity: sweepOpacity }}>
          <div className="h-full w-px bg-lime shadow-[0_0_24px_6px_rgba(200,255,61,0.55)]" />
        </motion.div>
      </div>

      {/* viewfinder corners */}
      {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c) => (
        <span key={c} aria-hidden className={`pointer-events-none absolute h-5 w-5 border-lime/70 ${c}`} />
      ))}

      <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim sm:text-[11px]">
        <span>fig.01 — anish_tiwari.png</span>
        <div role="group" aria-label="Portrait view" className="flex overflow-hidden rounded-md border border-line">
          {(['photo', 'data'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => toggle(v)}
              disabled={!done}
              aria-pressed={view === v}
              className={`min-h-9 px-3 transition ${view === v && done ? 'bg-lime text-black' : 'text-mute hover:text-fg'} disabled:opacity-40`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
