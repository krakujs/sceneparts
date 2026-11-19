import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector chocolate bar: segmented milk-chocolate bar with the foil peeled back at the top and one corner broken off.
// Plain wrapper, no text. Origin = resting point (bottom centre), honours flip and s. Hero size ~330 px tall at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ChocolateBar(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const choc = p.color ?? "#6B3E26";
  const foil = "#C9D2DE";
  const L = -130, R = 130, T = -400, B = 0; // bar extents
  const exposed = "#B07650";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // bar outline with a broken bottom-right corner
  const bar = `M ${L} ${T} L ${R} ${T} L ${R} -96 L 104 -70 L 118 -46 L 84 -26 L 92 ${B} L ${L} ${B} Z`;
  // the exposed break face, showing the chocolate inside
  const breakFace = `M ${R} -96 L 104 -70 L 118 -46 L 84 -26 L 92 ${B} L 62 ${B} L 66 -30 L 96 -52 L 84 -78 Z`;
  // grid of segments: 3 columns, 4 rows of the visible bar
  const rows = [-320, -240, -160, -80];
  const cols = [-43, 43];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={16} fill={C.shadow} />
      <g transform={tr}>
        <path d={bar} fill={choc} />
        <path d={breakFace} fill={exposed} />
        {/* segment grooves */}
        {rows.map((ry0, i) => <line key={"r" + i} x1={L + 6} y1={ry0} x2={R - 6} y2={ry0} stroke={shade(choc, 0.35)} strokeWidth={7} strokeLinecap="round" />)}
        {cols.map((cx, i) => <line key={"c" + i} x1={cx} y1={T + 80} x2={cx} y2={-100} stroke={shade(choc, 0.35)} strokeWidth={7} strokeLinecap="round" />)}
        <path d={`M ${L + 18} ${T + 30} L ${L + 18} ${-150}`} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.18} />
        {/* foil peeled back over the top */}
        <path d={`M ${L} ${T} L ${R} ${T} L ${R + 34} ${T - 58} L ${L + 22} ${T - 74} Z`} fill={foil} />
        <path d={`M ${L + 22} ${T - 74} L ${R + 34} ${T - 58} L ${R + 30} ${T - 42} L ${L + 26} ${T - 58} Z`} fill={shade(foil, 0.18)} />
        <path d={`M ${L + 10} ${T + 2} L ${R - 10} ${T + 2} L ${R - 10} ${T + 10} L ${L + 10} ${T + 10} Z`} fill={shade(foil, 0.12)} opacity={0.6} />
        <path d={`M ${L + 30} ${T - 58} L ${R - 10} ${T - 60}`} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <ChocolateBar {...p} />;
}
