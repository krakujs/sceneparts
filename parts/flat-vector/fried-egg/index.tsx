import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector fried egg: a sunny-side-up egg with a wavy white and a round yolk. Variant plain (on a table) or pan.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

// wavy white outline around an ellipse of radii (rx, ry), centred at (0, 0)
const wavy = (rx: number, ry: number, n = 14, amp = 0.09) => {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = 1 + (i % 2 ? -amp : amp) * (i % 3 === 0 ? 1.4 : 1);
    pts.push(`${f1(Math.cos(a) * rx * k)} ${f1(Math.sin(a) * ry * k)}`);
  }
  let d = `M ${pts[0]}`;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, b = ((i + 1) / n) * Math.PI * 2;
    const mid = (a + b) / 2, k = 1 + (i % 2 ? amp : -amp) * 0.7;
    d += ` Q ${f1(Math.cos(mid) * rx * k * 1.12)} ${f1(Math.sin(mid) * ry * k * 1.12)} ${pts[(i + 1) % n]}`;
  }
  return d + " Z";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function FriedEgg(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const variant = p.variant ?? "plain";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const whiteC = p.whiteColor ?? "#FFFFFF";
  const yolkC = p.yolkColor ?? "#FFB530";

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // egg sits on the pan surface (pan width 460: surface centre y -92) or on the table (y 0)
  const cy = variant === "pan" ? -92 : -10;
  const shadowRx = variant === "pan" ? 0 : 200;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {variant === "pan" ? <Dish x={0} y={0} vessel="pan" w={460} fill="none" /> : <ellipse cx={0} cy={0} rx={shadowRx} ry={16} fill={C.shadow} />}
      <g transform={`${tr} translate(0 ${cy})`}>
        <path d={wavy(150, 80)} fill={whiteC} transform="translate(0 6)" />
        <path d={wavy(150, 80)} fill={whiteC} />
        <path d="M -110 -20 Q -90 -50 -56 -58" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0} />
        <ellipse cx={0} cy={0} rx={150} ry={80} fill="none" stroke={shade(whiteC, 0.08)} strokeWidth={0} />
        <ellipse cx={6} cy={10} rx={62} ry={58} fill={shade(yolkC, 0.12)} opacity={0.5} />
        <ellipse cx={0} cy={0} rx={60} ry={56} fill={yolkC} />
        <ellipse cx={-22} cy={-22} rx={16} ry={9} fill="#FFFFFF" opacity={0.45} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <FriedEgg {...p} />;
}
