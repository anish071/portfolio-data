import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/** Small illustrative visuals — one per project. They are decorative (not real results). */

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
const gauss = (r: () => number) => (r() + r() + r() + r() - 2) / 2;

type VizProps = { color: string };

function Frame({ children, label }: { children: (inView: boolean) => React.ReactNode; label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <svg ref={ref} viewBox="0 0 320 150" className="h-full w-full" role="img" aria-label={label}>
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
      ))}
      {children(inView)}
    </svg>
  );
}

export function RossmannViz({ color }: VizProps) {
  const r = rng(7);
  const actual = Array.from({ length: 40 }, (_, i) => 78 + 20 * Math.sin(i / 3.2) + 9 * Math.sin(i / 1.4) - i * 0.25 + (r() - 0.5) * 8);
  const fc = Array.from({ length: 14 }, (_, i) => 78 + 20 * Math.sin((i + 40) / 3.2) - (i + 40) * 0.25);
  const px = (i: number) => 8 + i * 5.6;
  const py = (v: number) => 150 - v;
  const aPath = actual.map((v, i) => `${i ? 'L' : 'M'}${px(i)},${py(v)}`).join(' ');
  const fPath = fc.map((v, i) => `${i ? 'L' : 'M'}${px(i + 39)},${py(v)}`).join(' ');
  const band = `${fc.map((v, i) => `${i ? 'L' : 'M'}${px(i + 39)},${py(v + 7 + i * 1.1)}`).join(' ')} ${[...fc].reverse().map((v, i) => `L${px(13 - i + 39)},${py(v - 7 - (13 - i) * 1.1)}`).join(' ')}Z`;
  return (
    <Frame label="Sales and forecast line chart">
      {(v) => (
        <>
          <line x1={px(39)} x2={px(39)} y1="8" y2="142" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 4" />
          <text x={px(39) + 6} y="18" fontSize="8" fill="#8b98aa" fontFamily="monospace">forecast →</text>
          <motion.path d={band} fill={color} initial={{ opacity: 0 }} animate={{ opacity: v ? 0.14 : 0 }} transition={{ delay: 1.6, duration: 0.8 }} />
          <motion.path d={aPath} fill="none" stroke="#8b98aa" strokeWidth="1.6" initial={{ pathLength: 0 }} animate={{ pathLength: v ? 1 : 0 }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
          <motion.path d={fPath} fill="none" stroke={color} strokeWidth="2.4" strokeDasharray="5 4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: v ? 1 : 0 }} transition={{ delay: 1.5, duration: 1 }} />
        </>
      )}
    </Frame>
  );
}

export function TelecomViz({ color }: VizProps) {
  const r = rng(21);
  const centers = [
    { x: 70, y: 100, c: color },
    { x: 165, y: 52, c: '#c8ff3d' },
    { x: 252, y: 98, c: '#a78bfa' },
  ];
  const pts = centers.flatMap((c, ci) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + gauss(r) * 34, y: c.y + gauss(r) * 26, c: c.c, d: ci * 0.25 + i * 0.025 })));
  return (
    <Frame label="Clustered scatter plot">
      {(v) => (
        <>
          {pts.map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill={p.c} initial={{ scale: 0, opacity: 0 }} animate={{ scale: v ? 1 : 0, opacity: v ? 0.85 : 0 }} transition={{ delay: p.d, type: 'spring', stiffness: 220, damping: 14 }} style={{ transformOrigin: `${p.x}px ${p.y}px` }} />
          ))}
          {centers.map((c, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: v ? 1 : 0 }} transition={{ delay: 1.2 + i * 0.15 }}>
              <circle cx={c.x} cy={c.y} r="30" fill="none" stroke={c.c} strokeOpacity="0.35" strokeDasharray="3 3" />
              <path d={`M${c.x - 4},${c.y} h8 M${c.x},${c.y - 4} v8`} stroke="#fff" strokeWidth="1.5" />
            </motion.g>
          ))}
          <text x="8" y="14" fontSize="8" fill="#8b98aa" fontFamily="monospace">k-means · pca</text>
        </>
      )}
    </Frame>
  );
}

const CHECKS = ['leakage', 'contamination', 'metrics', 'overfitting', 'data quality', 'class imbalance'];
export function ModelDoctorViz({ color }: VizProps) {
  return (
    <Frame label="Audit checks running">
      {(v) => (
        <>
          {CHECKS.map((c, i) => {
            const y = 14 + i * 22;
            return (
              <g key={c}>
                <text x="8" y={y + 8} fontSize="9" fill="#8b98aa" fontFamily="monospace">{c}</text>
                <rect x="104" y={y} width="170" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
                <motion.rect x="104" y={y} height="10" rx="5" fill={color} initial={{ width: 0 }} animate={{ width: v ? [0, 170, 170, 0] : 0 }} transition={{ duration: 3.6, delay: i * 0.28, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.5, 0.88, 1], ease: 'easeInOut' }} />
                <motion.text x="286" y={y + 9} fontSize="10" fill="#c8ff3d" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: v ? [0, 0, 1, 1, 0] : 0 }} transition={{ duration: 3.6, delay: i * 0.28, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.48, 0.52, 0.88, 1] }}>✓</motion.text>
              </g>
            );
          })}
        </>
      )}
    </Frame>
  );
}

export function PropertyViz({ color }: VizProps) {
  const r = rng(3);
  const pts = Array.from({ length: 42 }, (_, i) => {
    const x = 14 + (i / 41) * 280 + (r() - 0.5) * 14;
    const y = 128 - (x - 14) * 0.36 + gauss(r) * 20;
    return { x, y };
  });
  return (
    <Frame label="Price versus area regression">
      {(v) => (
        <>
          {pts.map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r="2.8" fill="#8b98aa" initial={{ opacity: 0, y: -14 }} animate={{ opacity: v ? 0.8 : 0, y: 0 }} transition={{ delay: i * 0.03, duration: 0.5 }} />
          ))}
          <motion.line x1="10" y1="130" x2="304" y2="24" stroke={color} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: v ? 1 : 0 }} transition={{ delay: 1.4, duration: 1.1, ease: 'easeInOut' }} />
          <text x="8" y="14" fontSize="8" fill="#8b98aa" fontFamily="monospace">price ~ area + bhk + location</text>
        </>
      )}
    </Frame>
  );
}

export function CropViz({ color }: VizProps) {
  const layers = [4, 6, 6, 4, 2];
  const lx = (l: number) => 36 + l * 62;
  const ly = (l: number, i: number) => 75 + (i - (layers[l] - 1) / 2) * 20;
  return (
    <Frame label="Neural network layers">
      {(v) => (
        <>
          {layers.slice(0, -1).map((n, l) =>
            Array.from({ length: n }).flatMap((_, i) =>
              Array.from({ length: layers[l + 1] }).map((__, j) => (
                <line key={`${l}-${i}-${j}`} x1={lx(l)} y1={ly(l, i)} x2={lx(l + 1)} y2={ly(l + 1, j)} stroke="rgba(255,255,255,0.07)" />
              )),
            ),
          )}
          {layers.map((n, l) =>
            Array.from({ length: n }).map((_, i) => (
              <motion.circle key={`${l}-${i}`} cx={lx(l)} cy={ly(l, i)} r="5" fill="#0d141c" stroke={color} strokeWidth="1.6" animate={v ? { fill: ['#0d141c', color, '#0d141c'] } : {}} transition={{ duration: 1.1, delay: l * 0.3 + i * 0.04, repeat: Infinity, repeatDelay: 1.6 }} />
            )),
          )}
          <text x="8" y="14" fontSize="8" fill="#8b98aa" fontFamily="monospace">cnn · leaf → disease</text>
          <text x="286" y="142" fontSize="11" fill={color} fontFamily="monospace" textAnchor="end" fontWeight="700">~92%</text>
        </>
      )}
    </Frame>
  );
}

export function ProjectViz({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'rossmann-sales-forecasting': return <RossmannViz color={color} />;
    case 'telecom-user-analytics': return <TelecomViz color={color} />;
    case 'model-doctor': return <ModelDoctorViz color={color} />;
    case 'property-price-prediction': return <PropertyViz color={color} />;
    default: return <CropViz color={color} />;
  }
}
