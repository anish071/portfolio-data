import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { profile, projects } from '../data/portfolio';
import Portrait, { STAGES } from './Portrait';
import { EASE } from './ui';

const WORDS = ['decisions', 'forecasts', 'predictions', 'products'];

export default function Hero() {
  const [word, setWord] = useState(0);
  const [stage, setStage] = useState(0);
  const rows = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = rows.current;
    if (!el) return;
    if (reduce) {
      el.textContent = '1,000,000+';
      return;
    }
    const c = animate(0, 1000000, {
      duration: 3.6,
      delay: 0.3,
      ease: [0.3, 0, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString('en-US');
      },
      onComplete: () => {
        el.textContent = '1,000,000+';
      },
    });
    return () => c.stop();
  }, []);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

  return (
    <section id="top" className="relative overflow-hidden pt-20">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-lime/10 blur-[120px]" />
      <div aria-hidden className="absolute -right-32 top-40 h-[460px] w-[460px] rounded-full bg-cyan/10 blur-[130px]" />

      <div className="gutter relative">
        <div className="wrap grid items-center gap-16 pb-28 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24 lg:pt-12">
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
            <motion.p variants={item} className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Open to work · {profile.location.split(',')[0]}
            </motion.p>

            <motion.h1 variants={item} className="mt-6 text-[clamp(2.7rem,8.2vw,6.4rem)] font-bold leading-[0.94] tracking-[-0.035em]">
              Anish Kumar
              <br />
              <span className="text-gradient">Tiwari</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-xl font-medium text-fg sm:text-2xl">
              I turn raw data into{' '}
              <span className="relative inline-grid align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[word]}
                    initial={{ y: '70%', opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-70%', opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="font-mono text-lime"
                  >
                    {WORDS[word]}
                  </motion.span>
                </AnimatePresence>
              </span>
              .
            </motion.p>

            <motion.p variants={item} className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-mute sm:text-[13px]">
              {profile.tagline.join('  /  ')}
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-lime px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-white">
                View projects <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a href={profile.resumePdf} download className="inline-flex min-h-12 items-center rounded-lg border border-line px-6 font-mono text-sm font-medium uppercase tracking-[0.12em] text-fg transition hover:border-lime/60 hover:text-lime">
                Resume ↓
              </a>
              <a href="#contact" className="inline-flex min-h-12 items-center rounded-lg px-4 font-mono text-sm font-medium uppercase tracking-[0.12em] text-mute transition hover:text-fg">
                Contact
              </a>
            </motion.div>

            <motion.dl variants={item} className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {[
                { k: 'Rows analysed', v: '1M+' },
                { k: 'Projects', v: String(projects.length) },
                { k: 'CNN accuracy', v: '~92%' },
              ].map((s) => (
                <div key={s.k} className="bg-panel px-3 py-4 sm:px-5">
                  <dd className="font-mono text-xl font-bold text-fg sm:text-2xl">{s.v}</dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-[0.16em] text-dim sm:text-[11px]">{s.k}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: EASE }} className="order-1 lg:order-2">
            <div className="mx-auto mb-4 flex max-w-[460px] items-center justify-between gap-3 rounded-lg border border-line bg-panel/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute backdrop-blur sm:text-[11px]">
              <span>
                rows <span ref={rows} className="text-fg">0</span>
              </span>
              <span className="flex items-center gap-1.5 text-lime">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                {STAGES[stage]}
              </span>
            </div>
            <Portrait onStage={setStage} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
