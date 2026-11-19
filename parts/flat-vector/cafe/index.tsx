import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small cafe with a striped awning, a coffee-cup icon sign and a bistro table with two chairs out front.
// Origin = bottom centre on the ground. About 640 px wide and 720 px tall at s = 1.
// anim "lights": the steam from the coffee-cup sign drifts up in turn (a gentle bob of the sign with "lights").
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.sand;
  const awn = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const steam = anim === "lights" ? Math.sin((f / 30) * Math.PI * 2) * 6 : 0;
  const stripeXs = [-300, -240, -180, -120, -60, 0, 60, 120, 180, 240];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={330} ry={18} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* building */}
        <rect x={-300} y={-520} width={600} height={520} rx={14} fill={wall} />
        <rect x={-320} y={-560} width={640} height={46} rx={10} fill={shade(wall, 0.2)} />
        <rect x={-300} y={-22} width={600} height={14} fill={shade(wall, 0.15)} />
        {/* striped awning */}
        <path d="M -310 -440 L 310 -440 L 330 -370 L -330 -370 Z" fill={awn} />
        {stripeXs.map((sx, i) => (i % 2 ? <rect key={sx} x={sx} y={-440} width={60} height={70} fill={C.white} /> : null))}
        {/* window and door */}
        <rect x={-250} y={-340} width={200} height={230} rx={10} fill={C.greyDark} />
        <rect x={-238} y={-328} width={176} height={206} rx={8} fill={C.sky} />
        <path d="M -210 -328 L -180 -328 L -220 -122 L -240 -122 Z" fill={C.white} opacity={0.35} />
        <rect x={-30} y={-330} width={120} height={310} rx={10} fill={C.brownDark} />
        <rect x={-16} y={-316} width={92} height={120} rx={6} fill={C.sky} />
        <circle cx={70} cy={-90} r={8} fill={C.yellow} />
        {/* coffee-cup icon sign on a bracket */}
        <rect x={-10} y={-600} width={8} height={70} fill={C.greyDark} />
        <rect x={-42} y={-600} width={84} height={62} rx={14} fill={C.white} />
        <path d="M -30 -588 L 22 -588 L 18 -552 Q 16 -546 10 -546 L -22 -546 Q -28 -546 -30 -552 Z" fill={C.brown} />
        <path d="M 22 -580 Q 38 -580 36 -567 Q 34 -556 20 -556" fill="none" stroke={C.brown} strokeWidth={6} strokeLinecap="round" />
        <path d="M -14 -610 Q -20 -630 -8 -640 M 6 -612 Q 0 -632 12 -640" fill="none" stroke={C.grey} strokeWidth={5} strokeLinecap="round" transform={`translate(0 ${f1(steam)})`} />
        {/* bistro table and two chairs */}
        <rect x={150} y={-120} width={130} height={12} rx={6} fill={C.white} />
        <rect x={210} y={-108} width={10} height={108} fill={C.greyDark} />
        <ellipse cx={215} cy={-108} rx={34} ry={7} fill={C.greyDark} />
        <rect x={110} y={-130} width={44} height={10} rx={5} fill={C.brown} />
        <rect x={110} y={-130} width={8} height={130} fill={C.brownDark} />
        <rect x={308} y={-130} width={44} height={10} rx={5} fill={C.brown} />
        <rect x={344} y={-130} width={8} height={130} fill={C.brownDark} />
        {/* small base */}
        <rect x={-320} y={-8} width={640} height={10} fill={C.greyDark} />
      </g>
    </g>
  );
}
