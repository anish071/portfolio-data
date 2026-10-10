import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { profile } from '../data/portfolio';
import ContactPhoto from './ContactPhoto';
import { Reveal, SectionHead } from './ui';

export default function Contact() {
  const [panel, setPanel] = useState<'email' | 'call' | null>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement('textarea');
      t.value = text;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  // Real mailto: / tel: links work on phones and any desktop with a handler. If nothing reacts
  // (typical on a PC without a mail client), show Copy / Gmail / WhatsApp so nobody is stuck.
  const watch = (kind: 'email' | 'call') => () => {
    window.clearTimeout(timer.current);
    let left = false;
    const mark = () => { left = true; };
    window.addEventListener('blur', mark, { once: true });
    document.addEventListener('visibilitychange', mark, { once: true });
    timer.current = window.setTimeout(() => {
      window.removeEventListener('blur', mark);
      document.removeEventListener('visibilitychange', mark);
      if (!left) setPanel(kind);
    }, 1200);
  };

  const btn = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] transition';

  return (
    <section id="contact" className="gutter relative overflow-hidden py-24 pb-10 md:py-32 md:pb-10">
      <div aria-hidden className="absolute left-1/2 top-1/3 h-[420px] w-[min(800px,100%)] -translate-x-1/2 rounded-full bg-lime/10 blur-[130px]" />
      <div className="wrap relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
        <SectionHead index="06" kicker="contact" title={<>Have a dataset <span className="text-gradient">that needs answers?</span></>} sub="I'm open to Data Analyst, BI, Data Science and AI/ML roles. The fastest way to reach me is below." />

        <Reveal>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Hello Anish')}`} onClick={watch('email')} className={`${btn} bg-lime text-black hover:bg-white`}>✉ Email me</a>
            <a href={`tel:+91${profile.phone}`} onClick={watch('call')} className={`${btn} border border-line text-fg hover:border-lime/60 hover:text-lime`}>☎ Call</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={`${btn} border border-line text-fg hover:border-cyan/60 hover:text-cyan`}>LinkedIn ↗</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className={`${btn} border border-line text-fg hover:border-violet/60 hover:text-violet`}>GitHub ↗</a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 max-w-xl rounded-2xl border border-line bg-panel p-5 font-mono text-sm">
            <p className="text-dim">$ contact --anish</p>
            <p className="mt-2 break-all"><span className="text-lime">email</span>&nbsp;&nbsp;<a className="text-fg underline-offset-4 hover:underline" href={`mailto:${profile.email}`} onClick={watch('email')}>{profile.email}</a></p>
            <p className="mt-1"><span className="text-lime">phone</span>&nbsp;&nbsp;<a className="text-fg underline-offset-4 hover:underline" href={`tel:+91${profile.phone}`} onClick={watch('call')}>+91 {profile.phone}</a></p>
            <p className="mt-1"><span className="text-lime">base</span>&nbsp;&nbsp;&nbsp;<span className="text-mute">{profile.location}</span></p>
          </div>
        </Reveal>
        </div>

        <ContactPhoto />
        </div>

        <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dim sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {profile.fullName}</p>
          <a href="#top" className="min-h-9 py-2 text-mute transition hover:text-lime">↑ Back to top</a>
        </footer>
      </div>

      {panel &&
        createPortal(
          <div role="dialog" aria-label="Contact" style={{ width: 'min(28rem, calc(100% - 2rem))' }} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[80] -translate-x-1/2 rounded-2xl border border-line bg-panel-2/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-lime">{panel === 'email' ? 'Email' : 'Call'}</p>
                <p className="mt-1 break-all text-lg font-semibold text-fg">{panel === 'email' ? profile.email : `+91 ${profile.phone}`}</p>
              </div>
              <button type="button" onClick={() => setPanel(null)} aria-label="Close" className="-m-2 p-2 text-xl text-mute hover:text-fg">×</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => copy(panel === 'email' ? profile.email : profile.phone)} className="min-h-11 rounded-lg bg-lime px-5 font-mono text-xs font-bold tracking-[0.14em] text-black">
                {copied ? 'COPIED ✓' : 'COPY'}
              </button>
              {panel === 'email' ? (
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-lg border border-line px-5 font-mono text-xs font-bold tracking-[0.14em] text-fg">OPEN GMAIL</a>
              ) : (
                <a href={`https://wa.me/91${profile.phone}`} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-lg border border-line px-5 font-mono text-xs font-bold tracking-[0.14em] text-fg">WHATSAPP</a>
              )}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
