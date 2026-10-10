import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { seasons } from '../data/portfolio';
import { Chip, Reveal, SectionHead } from './ui';

const VERBS = [
  { v: 'INGEST', c: '#c8ff3d' },
  { v: 'CLEAN', c: '#38e1ff' },
  { v: 'MODEL', c: '#a78bfa' },
  { v: 'SHIP', c: '#ffb547' },
];

export default function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <section id="journey" className="gutter relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          index="02"
          kicker="journey"
          title={<>My career is a <span className="text-gradient">data pipeline.</span></>}
          sub="Four stages — from learning the fundamentals to shipping models and dashboards. The line fills as you scroll."
        />

        <div ref={ref} className="relative pl-10 sm:pl-14">
          <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line sm:left-[19px]" />
          <motion.div aria-hidden className="absolute left-[11px] top-0 w-px origin-top bg-gradient-to-b from-lime via-cyan to-violet shadow-[0_0_14px_rgba(200,255,61,0.7)] sm:left-[19px]" style={{ scaleY: fill, height: '100%' }} />

          <ol className="space-y-12 md:space-y-16">
            {seasons.map((s, i) => {
              const verb = VERBS[i % VERBS.length];
              return (
                <li key={s.number} className="relative">
                  <span aria-hidden className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border bg-bg sm:-left-14 sm:h-10 sm:w-10" style={{ borderColor: verb.c, boxShadow: `0 0 22px ${verb.c}55` }}>
                    <span className="h-2 w-2 rounded-full sm:h-3 sm:w-3" style={{ background: verb.c }} />
                  </span>

                  <Reveal>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="rounded border px-2 py-0.5 font-mono text-[11px] font-bold tracking-[0.2em]" style={{ color: verb.c, borderColor: `${verb.c}66` }}>
                        {String(s.number).padStart(2, '0')} · {verb.v}
                      </span>
                      <span className="font-mono text-xs text-dim">{s.period}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">{s.title}</h3>
                    <p className="mt-2 max-w-2xl text-mute sm:text-lg">{s.synopsis}</p>
                  </Reveal>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {s.episodes.map((ep, k) => (
                      <Reveal key={ep.code} delay={k * 0.08}>
                        <article className="h-full rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-white/25">
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ep.palette.accent }}>{ep.runtime}</p>
                          <h4 className="mt-2 text-lg font-semibold text-fg">{ep.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-mute">{ep.description}</p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {ep.tags.map((t) => (
                              <Chip key={t}>{t}</Chip>
                            ))}
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
