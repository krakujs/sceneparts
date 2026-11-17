import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Earthworm: pink segmented body that wriggles.
// pose "crawl": the body lies on the ground in a sine wave that travels along it (driven by f).
// pose "peek": the worm rises half out of a soil mound, swaying gently, with the hole in front of it.
// Origin = ground under the body, bottom centre; faces right; honours flip, s and vx.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, flip = !!p.flip;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const col: string = p.color ?? C.pink, dk = shade(col, 0.22);
  const peek = p.pose === "peek";

  const face = (hx: number, hy: number, r: number) => (
    <g>
      <circle cx={hx + r * 0.1} cy={hy - r * 0.22} r={r * 0.32} fill={C.white} />
      <circle cx={hx + r * 0.2} cy={hy - r * 0.18} r={r * 0.18} fill={C.ink} />
      <circle cx={hx + r * 0.25} cy={hy - r * 0.28} r={r * 0.06} fill={C.white} />
      <circle cx={hx + r * 0.25} cy={hy + r * 0.28} r={r * 0.2} fill={C.pink} opacity={0.75} />
      <path d={`M ${hx + r * 0.1} ${hy + r * 0.35} Q ${hx + r * 0.35} ${hy + r * 0.6} ${hx + r * 0.6} ${hy + r * 0.3}`} stroke={C.ink} strokeWidth={Math.max(2, r * 0.12)} strokeLinecap="round" fill="none" />
    </g>
  );

  if (!peek) {
    // crawl: 14 segments on a sine wave; troughs touch the ground, crests lift by A
    const N = 14, A = 20;
    const segs = Array.from({ length: N }, (_, i) => {
      const head = i === N - 1, r = head ? 16 : 13;
      const cx = -112 + i * 17.5;
      const g = 0.5 - 0.5 * Math.cos(i * 0.9 - f * 0.22);
      return { i, head, r, cx, cy: -r - A * g };
    });
    const h = segs[N - 1];
    return (
      <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip ? -s : s} ${s})`}>
        <ellipse cx={0} cy={0} rx={140} ry={8} fill={C.shadow} />
        {segs.map((g) => (
          <g key={g.i}>
            <circle cx={g.cx} cy={g.cy + 3} r={g.r} fill={dk} />
            <circle cx={g.cx} cy={g.cy} r={g.r - 1.5} fill={col} />
          </g>
        ))}
        {face(h.cx, h.cy, h.r)}
      </g>
    );
  }

  // peek: a soil mound with a hole; the worm's body rises out of the hole and sways
  const N = 7, sway = 12 * Math.sin(f * 0.08);
  const segs = Array.from({ length: N }, (_, i) => {
    const head = i === N - 1, r = head ? 17 : 13;
    const t = i / (N - 1);
    const cx = sway * Math.pow(t, 1.5) + (head ? 4 * Math.sin(f * 0.12) : 0);
    return { i, head, r, cx, cy: -40 - i * 14 - (head ? 2 : 0) };
  });
  const h = segs[N - 1];
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={8} fill={C.shadow} />
      {segs.map((g) => (
        <g key={g.i}>
          <circle cx={g.cx} cy={g.cy + 3} r={g.r} fill={dk} />
          <circle cx={g.cx} cy={g.cy} r={g.r - 1.5} fill={col} />
        </g>
      ))}
      {/* soil mound in front of the lower body, then the dark hole at its top */}
      <path d="M -120 0 C -120 -32 -70 -46 0 -46 C 70 -46 120 -32 120 0 Z" fill="#B07A52" />
      <path d="M -120 0 C -120 -10 -110 -18 -96 -20 C -60 -30 60 -30 96 -20 C 110 -18 120 -10 120 0 Z" fill="#9A6742" />
      <ellipse cx={0} cy={-46} rx={36} ry={10} fill="#5E3B26" />
      <path d="M -36 -46 Q 0 -34 36 -46" stroke="#8A5A3C" strokeWidth={5} strokeLinecap="round" fill="none" />
      {face(h.cx, h.cy, h.r)}
    </g>
  );
}
