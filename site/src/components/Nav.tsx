import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { profile } from '../data/portfolio';

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Pipeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : ''}`}>
      <motion.div aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-lime via-cyan to-violet" style={{ scaleX: progress }} />
      <div className="gutter">
        <div className="wrap flex h-14 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight" aria-label="Back to top">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-lime text-[13px] text-black">AT</span>
            <span className="hidden text-fg sm:inline">anish<span className="text-lime">.</span>tiwari</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${active === s.id ? 'text-lime' : 'text-mute hover:text-fg'}`}
              >
                {s.label}
                {active === s.id && <motion.span layoutId="navdot" className="absolute inset-x-3 -bottom-0.5 h-px bg-lime" />}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="hidden min-h-9 items-center rounded-md border border-lime/50 px-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-lime transition hover:bg-lime hover:text-black sm:flex">
              Hire me
            </a>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-md border border-line md:hidden">
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-px w-5 bg-fg transition ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px w-5 bg-fg transition ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="gutter fixed inset-x-0 top-14 flex h-[calc(100svh-3.5rem)] flex-col gap-1 overflow-y-auto bg-bg/95 pb-10 pt-4 backdrop-blur-xl md:hidden"
            aria-label="Mobile"
          >
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-bold tracking-tight">
                <span className="font-mono text-xs text-lime">0{i + 1}</span>
                {s.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center rounded-lg bg-lime font-mono text-sm font-bold uppercase tracking-[0.14em] text-black">
              Hire me
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
