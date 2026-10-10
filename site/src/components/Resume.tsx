import { achievements, certifications, profile } from '../data/portfolio';
import { Reveal, SectionHead, spotMove } from './ui';

export default function Resume() {
  return (
    <section id="resume" className="gutter relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead index="05" kicker="resume" title={<>Two resumes, <span className="text-gradient">one person.</span></>} sub="Pick the one that matches the role you are hiring for." />

        <div className="grid gap-5 md:grid-cols-2">
          {profile.resumes.map((r, i) => (
            <Reveal key={r.file} delay={i * 0.1}>
              <div onPointerMove={spotMove} className="spot flex h-full flex-col rounded-2xl border border-line bg-panel p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">PDF · {i === 0 ? 'analytics' : 'ai / ml'}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{r.label}</h3>
                <p className="mt-2 flex-1 text-mute sm:text-lg">{r.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={r.file} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-lg bg-lime px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-white">View ↗</a>
                  <a href={r.file} download={r.download} className="inline-flex min-h-12 items-center rounded-lg border border-line px-6 font-mono text-sm font-medium uppercase tracking-[0.12em] text-fg transition hover:border-lime/60 hover:text-lime">Download ↓</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-line bg-panel p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{a.laurel}</p>
                <p className="mt-2 font-semibold text-fg">{a.title}</p>
                <p className="text-sm text-dim">{a.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 flex flex-wrap gap-3">
            {certifications.map((c) => (
              <div key={c.name} className="rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-sm">
                <p className="font-mono text-[11px] uppercase tracking-wider text-lime">{c.issuer}</p>
                <p className="mt-0.5 text-mute">{c.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
