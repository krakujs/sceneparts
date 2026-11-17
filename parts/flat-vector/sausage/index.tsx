import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector sausages: two plump curved sausages with grill marks.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 400 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Sausage(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const sausC = p.sausageColor ?? "#C9573A";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // a plump curved sausage as a thick round-capped stroke, with a shade stroke underneath and a highlight on top
  const link = (d: string, col: string) => (
    <g>
      <path d={d} stroke={shade(col, 0.22)} strokeWidth={104} strokeLinecap="round" fill="none" />
      <path d={d} stroke={col} strokeWidth={92} strokeLinecap="round" fill="none" />
      <path d={d} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.22} transform="translate(-6 -22)" />
    </g>
  );
  const marks = (pts: [number, number, number][]) => pts.map(([mx, my, ang], i) => (
    <path key={i} d={`M ${f1(mx - 16)} ${f1(my)} L ${f1(mx + 16)} ${f1(my)}`} stroke={shade(sausC, 0.4)} strokeWidth={7} strokeLinecap="round" transform={`rotate(${f1(ang)} ${f1(mx)} ${f1(my)})`} opacity={0.8} />
  ));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={16} fill={C.shadow} />
      <g transform={tr}>
        <g transform="translate(0 -70)">
          {link("M -150 -40 Q -30 -170 150 -70", sausC)}
          {marks([[-100, -60, -28], [-30, -96, -18], [40, -110, -8], [110, -104, 6]])}
        </g>
        <g transform="translate(0 -6)">
          {link("M -140 -10 Q 10 -110 160 10", shade(sausC, 0.06))}
          {marks([[-80, -40, -30], [0, -62, -14], [80, -60, 0]])}
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Sausage {...p} />;
}
