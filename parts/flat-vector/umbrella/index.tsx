import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open umbrella, standing upright on its J handle. Eight scalloped panels alternate between two colours, with a
// darker right-hand side for depth. Origin = bottom centre (the tip of the J handle sits on y).
// About 500 px wide and 840 px tall at s = 1.
// anim "spin": the canopy turns slightly back and forth; "sway": the whole umbrella rocks a touch.
const f1 = (v: number) => v.toFixed(1);

const TOP = -820, RIM = -560, R = 250;
// x positions of the eight panel edges, left to right across the front of the canopy
const xs = Array.from({ length: 9 }, (_, k) => -R + (2 * R * k) / 8);

const panelD = (a: number, b: number) =>
  `M 0 ${TOP} Q ${f1(a * 0.6)} ${TOP + 70} ${f1(a)} ${RIM} Q ${f1((a + b) / 2)} ${RIM + 40} ${f1(b)} ${RIM} Q ${f1(b * 0.6)} ${TOP + 70} 0 ${TOP} Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.red;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sx = anim === "spin" ? Math.cos(Math.sin((f * 2 * Math.PI) / 90) * 0.4) : 1;
  const rock = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(rock)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      {/* canopy: eight panels with scalloped edges, turned about the shaft */}
      <g transform={`translate(0 ${RIM}) scale(${f1(sx)} 1) translate(0 ${-RIM})`}>
        {xs.slice(0, 8).map((a, k) => {
          const b = xs[k + 1];
          const base = k % 2 === 0 ? c1 : c2;
          const fill = (a + b) / 2 > 0 ? shade(base, 0.12) : base;
          return <path key={k} d={panelD(a, b)} fill={fill} stroke={shade(base, 0.25)} strokeWidth={2} />;
        })}
        {/* highlight along the left panels */}
        <path d={`M -170 ${RIM - 30} Q -200 ${TOP + 190} -40 ${TOP + 12}`} fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.25} />
        {/* top ferrule */}
        <rect x={-9} y={TOP - 20} width={18} height={24} rx={6} fill={C.greyDark} />
      </g>
      {/* shaft down from the canopy to the J handle */}
      <rect x={-6} y={RIM} width={12} height={-56 - RIM} fill={C.greyDark} />
      {/* J handle: its curled tip sits at the bottom of the hook, on y */}
      <path d="M 0 -56 A 45 45 0 0 0 90 -56 L 90 -100" fill="none" stroke={C.brown} strokeWidth={22} strokeLinecap="round" />
      <path d="M 0 -56 A 45 45 0 0 0 90 -56 L 90 -100" fill="none" stroke={shade(C.brown, 0.25)} strokeWidth={6} strokeLinecap="round" transform="translate(4 0)" opacity={0.4} />
    </g>
  );
}
