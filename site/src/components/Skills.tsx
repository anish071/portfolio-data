import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillCategories, skillEvidence } from '../data/portfolio';
import { EASE, Reveal, SectionHead } from './ui';

const TONES = ['#c8ff3d', '#38e1ff', '#a78bfa', '#ffb547', '#7df0c8', '#ff6b8b', '#8bb4ff'];

export default function Skills() {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const cat = skillCategories[idx];
  const tone = TONES[idx % TONES.length];
  const evidence = pick ? skillEvidence[pick] ?? skillEvidence[pick.split(' ')[0]] : undefined;

  return (
    <section id="skills" className="gutter relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead index="04" kicker="skills" title={<>The toolkit, <span className="text-gradient">grouped by job.</span></>} sub="Pick a category to see what I use it for. Tap a skill to see where it shows up." />

        <Reveal>
          <div role="tablist" aria-label="Skill categories" className="scroll-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0">
            {skillCategories.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={i === idx}
                type="button"
                onClick={() => {
                  setIdx(i);
                  setPick(null);
                }}
                className={`relative min-h-11 shrink-0 rounded-lg border px-4 font-mono text-xs font-medium uppercase tracking-[0.12em] transition ${i === idx ? 'text-black' : 'border-line text-mute hover:text-fg'}`}
                style={i === idx ? { background: TONES[i % TONES.length], borderColor: TONES[i % TONES.length] } : undefined}
              >
                {c.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 min-h-[300px] rounded-2xl border border-line bg-panel p-5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={cat.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
              <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: tone }}>{cat.subtitle} · {cat.skills.length} skills</p>
              <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                {cat.skills.map((s, i) => (
                  <motion.button
                    key={s.name}
                    type="button"
                    onClick={() => setPick(s.name === pick ? null : s.name)}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.035, type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{ y: -3 }}
                    className="min-h-11 rounded-xl border px-4 text-sm font-medium transition sm:text-base"
                    style={{ borderColor: pick === s.name ? tone : 'rgba(255,255,255,0.1)', background: pick === s.name ? `${tone}22` : 'rgba(255,255,255,0.03)', color: pick === s.name ? tone : '#e9eff6' }}
                  >
                    {s.name}
                  </motion.button>
                ))}
              </div>
              <div className="mt-8 min-h-[44px] border-t border-line pt-5 font-mono text-xs text-mute sm:text-sm" aria-live="polite">
                {pick ? (
                  evidence ? (
                    <>
                      <span style={{ color: tone }}>{pick}</span> → used in {evidence.join(' · ')}
                    </>
                  ) : (
                    <>
                      <span style={{ color: tone }}>{pick}</span> → part of my {cat.title.toLowerCase()} toolkit.
                    </>
                  )
                ) : (
                  <span className="text-dim">// select a skill</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
