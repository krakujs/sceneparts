import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Log raft, side view facing right. Origin = waterline centre. Room scale: about 660 px wide and 520 px tall.
// Two layers of logs with end rings and rope lashings, a small mast and a cloth sail. anim "drive" rocks it.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 2.2)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 60} y={8} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 150} y={18} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const log = p.color && p.color !== "none" ? p.color : C.brown;
  const cloth = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const logs = (yy: number, xs: number[]) =>
    xs.map((lx, k) => (
      <g key={`${yy}-${lx}`}>
        <rect x={lx} y={yy} width={210} height={40} rx={20} fill={k % 2 ? shade(log, 0.12) : log} />
        <circle cx={lx + 22} cy={yy + 20} r={11} fill={C.sand} />
      </g>
    ));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* mast and sail */}
        <rect x={-20} y={-520} width={16} height={440} fill={C.brownDark} />
        <path d="M -4 -510 Q 130 -420 180 -250 L 180 -200 L -4 -190 Z" fill={cloth} />
        <path d="M -4 -380 Q 60 -340 120 -300 L 120 -290 Q 60 -320 -4 -350 Z" fill={shade(cloth, 0.12)} />
        <path d="M -4 -520 L 40 -506 L -4 -496 Z" fill={C.red} />
        {/* two layers of logs */}
        {logs(-100, [-325, -105, 115])}
        {logs(-56, [-270, -50, 170])}
        {/* rope lashings */}
        {[-250, -40, 170].map((lx) => (
          <rect key={lx} x={lx} y={-108} width={14} height={60} fill={C.sand} />
        ))}
      </g>
      <Water w={680} />
    </g>
  );
}
