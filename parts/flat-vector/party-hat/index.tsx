import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Striped party hat: a paper cone standing on its open rim, with stripes, a pompom on the tip and an elastic.
// Origin = centre of the open rim (bottom of the hat). About 300 px wide and 470 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1000;
  const c1 = p.color && p.color !== "none" ? p.color : C.pink;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  let tr = "";
  if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 50) * 5)} 0 0)`;

  const HW = 150, H = 420;                       // half-width at the rim, height of the cone
  const wAt = (h: number) => HW * (1 - h / H);   // half-width at height h above the rim
  // stripes: trapezoids between heights, alternating colours
  const stripes: string[] = [];
  const bands = [0, 70, 140, 210, 280, 350, 420];
  for (let i = 0; i < bands.length - 1; i++) {
    const h0 = bands[i], h1 = bands[i + 1];
    stripes.push(`M ${f1(-wAt(h0))} ${f1(-h0)} L ${f1(wAt(h0))} ${f1(-h0)} L ${f1(wAt(h1))} ${f1(-h1)} L ${f1(-wAt(h1))} ${f1(-h1)} Z`);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={HW + 20} ry={22} fill={C.shadow} />
      <g transform={tr}>
        {/* the cone body in the first colour, then the second-colour stripes on top */}
        <path d={`M ${-HW} 0 L 0 ${-H} L ${HW} 0 Z`} fill={c1} />
        {stripes.map((d, i) => (i % 2 ? <path key={i} d={d} fill={c2} /> : null))}
        {/* open rim: a darker ellipse with a lighter inner edge */}
        <ellipse cx={0} cy={0} rx={HW} ry={20} fill={shade(c2, 0.2)} />
        <ellipse cx={0} cy={-6} rx={HW - 14} ry={12} fill={shade(c1, 0.35)} />
        {/* elastic under the rim, drawn as a thin curve */}
        <path d={`M ${-HW + 10} -4 Q 0 60 ${HW - 10} -4`} fill="none" stroke={C.greyDark} strokeWidth={6} strokeLinecap="round" />
        {/* pompom on the tip */}
        {[[-14, -H - 28], [14, -H - 28], [0, -H - 44], [0, -H - 14]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={24} fill={i % 2 ? C.purple : C.purpleDark} />
        ))}
        <circle cx={0} cy={-H - 28} r={20} fill={C.purple} />
      </g>
    </g>
  );
}
