import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { EASE } from './ui';
import { asset } from '../lib/asset';

/**
 * A "living photo": the background (soft, depth-of-field) and the sharp cut-out of Anish sit on separate layers
 * that drift at different speeds (parallax). Window lights pulse like bokeh, dust floats up through the light,
 * a sheen slides across the suit and he "breathes". On desktop the layers also follow the cursor.
 */

const LIGHTS = [
  { x: 0.64, y: 0.015, r: 0.07, d: 0 },
  { x: 0.81, y: 0.048, r: 0.06, d: 1.1 },
  { x: 0.846, y: 0.065, r: 0.05, d: 2.3 },
  { x: 0.853, y: 0.178, r: 0.07, d: 0.6 },
  { x: 0.52, y: 0.04, r: 0.12, d: 1.8 },
  { x: 0.355, y: 0.255, r: 0.045, d: 0.9 },
  { x: 0.355, y: 0.31, r: 0.05, d: 2.7 },
  { x: 0.114, y: 0.56, r: 0.12, d: 0.4 },
  { x: 0.13, y: 0.709, r: 0.06, d: 1.5 },
  { x: 0.13, y: 0.787, r: 0.06, d: 2.1 },
  { x: 0.13, y: 0.878, r: 0.06, d: 0.2 },
  { x: 0.857, y: 0.29, r: 0.06, d: 3.0 },
];

const CHIPS = [
  { t: 'Python', c: '#c8ff3d', pos: 'right-2 top-[18%]', d: 0 },
  { t: 'SQL', c: '#38e1ff', pos: 'right-1 top-[47%]', d: 0.8 },
  { t: 'Power BI', c: '#ffb547', pos: 'right-3 bottom-[16%]', d: 1.6 },
];

function Dust({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !active) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;
    const N = 46;
    const ps = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), s: 0.6 + Math.random() * 1.8, v: 0.00012 + Math.random() * 0.00032, a: Math.random() * 6.28, o: 0.25 + Math.random() * 0.6 }));
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    let vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting));
    io.observe(cv);
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!vis) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.v * 16;
        p.x += Math.sin(t / 1800 + p.a) * 0.0004;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        const tw = 0.6 + 0.4 * Math.sin(t / 700 + p.a);
        ctx.fillStyle = `rgba(255,214,150,${p.o * tw})`;
        ctx.shadowColor = 'rgba(255,200,120,0.9)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.s, 0, 6.2832);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [active]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export default function ContactPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();

  // pointer (mouse only) + autonomous sway so it is alive on phones too
  const px = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 });
  const py = useSpring(useMotionValue(0), { stiffness: 70, damping: 16 });
  const sway = useMotionValue(0);
  const swayY = useMotionValue(0);
  useAnimationFrame((t) => {
    if (reduce) return;
    sway.set(Math.sin(t / 2600));
    swayY.set(Math.cos(t / 3300));
  });

  const bgX = useTransform([sway, px], ([s, p]: number[]) => `${-1.8 * s - 2.6 * p}%`);
  const bgY = useTransform([swayY, py], ([s, p]: number[]) => `${-1.1 * s - 1.8 * p}%`);
  const fgX = useTransform([sway, px], ([s, p]: number[]) => `${1.1 * s + 2.2 * p}%`);
  const fgY = useTransform([swayY, py], ([s, p]: number[]) => `${0.5 * s + 1.2 * p}%`);
  const chipX = useTransform(px, [-1, 1], [12, -12]);
  const chipY = useTransform(py, [-1, 1], [8, -8]);
  const rotY = useTransform(px, [-1, 1], [-5, 5]);
  const rotX = useTransform(py, [-1, 1], [4, -4]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
      className="relative mx-auto w-full max-w-[420px] lg:max-w-[470px]"
    >
      <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-lime/10 blur-3xl" />

      <div className="relative aspect-[1145/1374] w-full overflow-hidden rounded-[1.75rem] border border-line bg-panel shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        {/* camera push-in + focus pull on entry */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 2.2, ease: EASE }}
        >
          {/* background layer: soft scene + pulsing lights */}
          <motion.div className="absolute -inset-[7%]" style={{ x: bgX, y: bgY }}>
            <img src={asset('/assets/anish-live-bg.webp')} alt="" draggable={false} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            {LIGHTS.map((l, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute rounded-full mix-blend-screen"
                style={{ left: `${l.x * 100}%`, top: `${l.y * 100}%`, width: `${l.r * 100}%`, aspectRatio: '1', translate: '-50% -50%', background: 'radial-gradient(circle, rgba(255,205,125,0.95) 0%, rgba(255,170,70,0.35) 40%, transparent 70%)' }}
                animate={reduce ? { opacity: 0.55 } : { opacity: [0.25, 0.95, 0.35, 0.8, 0.25], scale: [1, 1.25, 0.9, 1.15, 1] }}
                transition={{ duration: 5 + (i % 4), delay: l.d, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>

          {/* person layer: breathing + sheen */}
          <motion.div className="absolute -inset-[7%]" style={{ x: fgX, y: fgY }}>
            <motion.div
              className="relative h-full w-full"
              style={{ transformOrigin: '50% 90%' }}
              animate={reduce ? undefined : { scale: [1, 1.009, 1], rotate: [-0.35, 0.35, -0.35] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={asset('/assets/anish-live-person.webp')} alt="Anish Kumar Tiwari in a navy suit, leaning on a granite wall" draggable={false} loading="lazy" decoding="async" className="h-full w-full object-cover drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]" />
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 mix-blend-soft-light"
                  style={{ WebkitMaskImage: `url(${asset('/assets/anish-live-person.webp')})`, maskImage: `url(${asset('/assets/anish-live-person.webp')})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', backgroundImage: 'linear-gradient(105deg, transparent 35%, rgba(255,235,190,0.95) 50%, transparent 65%)', backgroundSize: '260% 100%' }}
                  animate={{ backgroundPositionX: ['130%', '-30%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          </motion.div>

          {!reduce && <Dust active={inView} />}
        </motion.div>

        {/* grade: warm vignette + fade at the bottom into the page */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_55%,rgba(7,11,16,0.55)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/85 to-transparent" />
      </div>

      {/* floating skill chips, parallax with the pointer */}
      <motion.div aria-hidden style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0">
        {CHIPS.map((c) => (
          <motion.span
            key={c.t}
            className={`absolute ${c.pos} rounded-lg border bg-bg/80 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur sm:text-[11px]`}
            style={{ color: c.c, borderColor: `${c.c}66` }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1, y: reduce ? 0 : [0, -8, 0] } : {}}
            transition={{ opacity: { delay: 1.6 + c.d * 0.3, duration: 0.5 }, scale: { delay: 1.6 + c.d * 0.3, type: 'spring' }, y: { duration: 4.5, delay: c.d, repeat: Infinity, ease: 'easeInOut' } }}
          >
            {c.t}
          </motion.span>
        ))}
      </motion.div>

      <div className="absolute left-3 top-4 rounded-lg border border-line bg-bg/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mute backdrop-blur sm:text-[11px]">
        <span className="relative mr-1 inline-flex h-2 w-2 align-middle">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
        </span>{' '}
        open to work
      </div>
      <div className="absolute bottom-4 left-3 rounded-lg border border-line bg-bg/80 px-3 py-2 backdrop-blur">
        <p className="text-sm font-semibold text-fg">Anish Kumar Tiwari</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-lime">data · ml · ai</p>
      </div>
    </motion.div>
  );
}
