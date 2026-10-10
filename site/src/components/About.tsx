import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { education, experience, profile } from '../data/portfolio';
import { Chip, Counter, Reveal, SectionHead } from './ui';

const QUERY = `SELECT name, role, location, focus
FROM   anish
WHERE  status = 'open_to_work';`;

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [n, setN] = useState(0);
  const [showRes, setShowRes] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(QUERY.length);
      setShowRes(true);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= QUERY.length) {
        window.clearInterval(id);
        window.setTimeout(() => setShowRes(true), 350);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [inView]);

  const rows: [string, string][] = [
    ['name', profile.fullName],
    ['role', profile.role],
    ['location', profile.location],
    ['focus', profile.interests.join(', ')],
  ];

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-dim">about.sql</span>
      </div>
      <pre className={`min-h-[84px] overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-cyan sm:px-5 sm:text-sm ${n < QUERY.length ? 'caret' : ''}`}>
        {QUERY.slice(0, n)}
      </pre>
      <div className="border-t border-line">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className="grid grid-cols-[88px_1fr] gap-3 border-b border-line px-4 py-3 text-sm transition-all duration-500 last:border-b-0 sm:grid-cols-[110px_1fr] sm:px-5"
            style={{ opacity: showRes ? 1 : 0, transform: showRes ? 'none' : 'translateY(8px)', transitionDelay: `${i * 110}ms` }}
          >
            <span className="font-mono text-xs uppercase tracking-wider text-dim">{k}</span>
            <span className="break-words text-fg">{v}</span>
          </div>
        ))}
        <p className="px-4 py-2.5 font-mono text-[11px] text-dim sm:px-5" style={{ opacity: showRes ? 1 : 0, transition: 'opacity .6s .6s' }}>
          4 rows returned · 0.002s
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="gutter relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead index="01" kicker="about" title={<>Numbers first. <span className="text-mute">Then the story behind them.</span></>} />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <Terminal />
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-fg sm:text-xl">{profile.intro}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.interests.map((i) => (
                  <Chip key={i} tone="lime">{i}</Chip>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line text-center">
                {[
                  { n: 5, s: '', k: 'Projects' },
                  { n: 1, s: 'M+', k: 'Rows analysed' },
                  { n: 2, s: '', k: 'Industry roles' },
                ].map((s) => (
                  <div key={s.k} className="bg-panel px-2 py-5">
                    <dd className="font-mono text-3xl font-bold text-lime"><Counter to={s.n} suffix={s.s} /></dd>
                    <dt className="mt-1 text-[10px] uppercase tracking-[0.16em] text-dim">{s.k}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-cyan">Experience</h3>
            <ul className="space-y-4">
              {experience.map((e) => (
                <li key={e.company} className="rounded-xl border border-line bg-panel p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-semibold text-fg">{e.role}</p>
                    <p className="font-mono text-[11px] text-lime">{e.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-mute">{e.company}</p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-mute">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-lime">›</span>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-cyan">Education &amp; learning</h3>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.school} className="rounded-xl border border-line bg-panel p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-semibold text-fg">{e.degree}</p>
                    <p className="font-mono text-[11px] text-lime">{e.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-mute">{e.school} · {e.place}</p>
                  <p className="mt-2 inline-block rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">{e.score}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
