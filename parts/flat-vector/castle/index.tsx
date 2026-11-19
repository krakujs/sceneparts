import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stone castle, front view: two round towers, a crenellated curtain wall, a gate with a portcullis and pennants.
// Blank heraldry (plain colour pennants only). Origin = centre of the floor line. About 960 px wide and 960 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const merlons = (x0: number, y0: number, count: number, w: number, h: number, fill: string) =>
  Array.from({ length: count }, (_, i) => <rect key={`${x0}-${i}`} x={x0 + i * w * 2} y={y0 - h} width={w} height={h} fill={fill} />);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const flutter = anim === "lights" ? (Math.floor(f / 8) % 2 ? 6 : -6) : 0;
  const torch = anim === "lights" && Math.floor(f / 10) % 2 ? C.yellow : C.orange;
  const tower = (tx: number) => (
    <g key={tx}>
      <rect x={tx - 110} y={-760} width={220} height={760} rx={14} fill={stone} />
      <rect x={tx + 50} y={-760} width={60} height={760} rx={14} fill={shade(stone, 0.15)} opacity={0.6} />
      {merlons(tx - 110, -760, 4, 18, 40, stone)}
      <rect x={tx - 110} y={-790} width={220} height={24} rx={6} fill={shade(stone, 0.12)} />
      <path d={`M ${tx - 120} -790 L ${tx} -920 L ${tx + 120} -790 Z`} fill={roof} />
      <rect x={tx - 16} y={-600} width={32} height={60} rx={14} fill={C.navy} />
      <rect x={tx - 8} y={-520} width={16} height={18} rx={6} fill={torch} />
      <rect x={tx - 16} y={-430} width={32} height={48} rx={14} fill={C.navy} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={460} ry={24} fill={C.shadow} />
        {/* curtain wall with crenellations */}
        <rect x={-340} y={-520} width={680} height={520} rx={8} fill={stone} />
        <rect x={-340} y={-520} width={680} height={20} fill={shade(stone, 0.12)} />
        {merlons(-340, -520, 9, 18, 40, stone)}
        {/* gate arch with portcullis */}
        <path d="M -80 0 L -80 -170 Q -80 -230 0 -230 Q 80 -230 80 -170 L 80 0 Z" fill={C.brownDark} />
        {[-50, -25, 0, 25, 50].map((gx) => <rect key={gx} x={gx - 2} y={-220} width={4} height={200} fill={C.greyDark} />)}
        {[-190, -140].map((gy) => <rect key={gy} x={-78} y={gy} width={156} height={4} fill={C.greyDark} />)}
        {/* towers */}
        {tower(-400)}
        {tower(400)}
        {/* central keep top and pennant pole */}
        <rect x={-30} y={-640} width={60} height={120} fill={stone} />
        <rect x={-6} y={-760} width={12} height={130} fill={C.greyDark} />
        <path d={`M 6 -760 L ${96 + flutter} -740 L 6 -720 Z`} fill={roof} />
        <path d={`M -400 -980 L ${-400 + 60 + flutter} -962 L -400 -944 Z`} fill={roof} />
        <rect x={-404} y={-1010} width={8} height={70} fill={C.greyDark} />
        <rect x={396} y={-1010} width={8} height={70} fill={C.greyDark} />
        <path d={`M 404 -1010 L ${464 + flutter} -992 L 404 -974 Z`} fill={C.blue} />
        <path d={`M -396 -1010 L ${-336 + flutter} -992 L -396 -974 Z`} fill={C.blue} />
      </g>
    </g>
  );
}
