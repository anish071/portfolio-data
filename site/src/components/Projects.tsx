import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { Chip, EASE, Reveal, SectionHead, spotMove } from './ui';
import { ProjectViz } from './Viz';

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="gutter relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead index="03" kicker="projects" title={<>Five notebooks, <span className="text-gradient">one mindset.</span></>} sub="Retail forecasting, telecom analytics, ML auditing, property pricing and crop-disease detection. Tap a notebook to open it. The charts are illustrations of each approach, not real outputs." />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} className={i === projects.length - 1 && projects.length % 2 === 1 ? 'md:col-span-2' : ''}>
              <button
                type="button"
                onClick={() => setOpen(p)}
                onPointerMove={spotMove}
                className="spot group block h-full w-full overflow-hidden rounded-2xl border border-line bg-panel text-left transition duration-300 hover:-translate-y-1 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
              >
                <div className={`grid h-full grid-cols-[minmax(0,1fr)] ${i === projects.length - 1 && projects.length % 2 === 1 ? 'md:grid-cols-2' : ''}`}>
                  <div className="relative aspect-[320/150] w-full border-b border-line bg-[#0a1118] p-3 md:border-b-0">
                    <ProjectViz id={p.id} color={p.palette.accent} />
                  </div>
                  <div className="flex flex-col p-5 sm:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: p.palette.accent }}>
                      In [{i + 1}] · {p.genre}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-fg sm:text-2xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute sm:text-base">{p.logline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                    <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-lime">
                      Open notebook <span className="inline-block transition group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <Modal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

function Modal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', key);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-end bg-black/70 backdrop-blur-sm sm:place-items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-panel sm:rounded-3xl"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="sticky left-full top-3 z-10 float-right mr-3 mt-3 grid h-10 w-10 place-items-center rounded-full border border-line bg-bg/80 text-xl text-mute backdrop-blur hover:text-fg">×</button>
        <div className="aspect-[320/150] w-full border-b border-line bg-[#0a1118] p-4"><ProjectViz id={p.id} color={p.palette.accent} /></div>
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: p.palette.accent }}>{p.genre} · {p.year}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">{p.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-mute sm:text-lg">{p.logline}</p>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-bg/60 p-3 sm:p-4">
                <dd className="font-mono text-lg font-bold text-fg sm:text-2xl" style={{ color: p.palette.accent }}>{m.value}</dd>
                <dt className="mt-1 text-[10px] uppercase leading-tight tracking-wider text-dim sm:text-[11px]">{m.label}</dt>
              </div>
            ))}
          </dl>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-cyan">What I built</h4>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-mute sm:text-base">
            {p.build.map((b) => (
              <li key={b} className="flex gap-3"><span className="mt-0.5 text-lime">›</span>{b}</li>
            ))}
          </ul>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-cyan">Highlights</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.features.map((f) => (
              <Chip key={f} tone="lime">{f}</Chip>
            ))}
          </div>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-cyan">Stack</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {p.github ? (
              <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-lime px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-white">
                View on GitHub ↗
              </a>
            ) : (
              <span className="inline-flex min-h-12 items-center rounded-lg border border-line px-6 font-mono text-xs uppercase tracking-[0.12em] text-dim">Repository coming soon</span>
            )}
            <button type="button" onClick={onClose} className="inline-flex min-h-12 items-center rounded-lg border border-line px-6 font-mono text-sm uppercase tracking-[0.12em] text-mute hover:text-fg">Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
