import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import { animate, motion, useInView } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, kicker, title, sub }: { index: string; kicker: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-lime sm:text-xs">
          <span className="text-dim">{index} /</span> {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 max-w-3xl text-[clamp(2rem,5.4vw,4rem)] font-bold leading-[1.02] tracking-tight text-fg">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Counts up to a number when it scrolls into view. */
export function Counter({ to, suffix = '', prefix = '', decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix, prefix, decimals]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/** Pointer-follow highlight for .spot cards. */
export function spotMove(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
}

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'lime' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium leading-none ${
        tone === 'lime' ? 'border-lime/40 bg-lime/10 text-lime' : 'border-line bg-white/[0.03] text-mute'
      }`}
    >
      {children}
    </span>
  );
}
