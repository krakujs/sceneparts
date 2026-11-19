import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector hot dog: long soft bun with a sausage, mustard zig-zag and a ketchup line.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 400 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function HotDog(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const bunC = p.bunColor ?? "#F2C27B";
  const sausC = p.sausageColor ?? "#D9644A";
  const mustard = p.mustard ?? true;
  const ketchup = p.ketchup ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const W = 400, top = -150, bot = -18;
  // mustard: zig-zag across the sausage
  const zz: string[] = [];
  for (let i = 0; i <= 12; i++) zz.push(`${f1(-W / 2 + 40 + i * ((W - 80) / 12))} ${f1(i % 2 ? -118 : -86)}`);

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* bun: back half, then the sausage sits in its opening */}
        <path d={`M ${-W / 2 + 30} ${bot} Q ${-W / 2 - 14} ${bot} ${-W / 2 - 10} ${(top + bot) / 2} Q ${-W / 2 - 4} ${top} ${-W / 2 + 40} ${top} L ${W / 2 - 40} ${top} Q ${W / 2 + 4} ${top} ${W / 2 + 10} ${(top + bot) / 2} Q ${W / 2 + 14} ${bot} ${W / 2 - 30} ${bot} Z`} fill={bunC} />
        <path d={`M ${-W / 2 + 30} ${bot} L ${W / 2 - 30} ${bot} Q ${W / 2 + 14} ${bot} ${W / 2 + 10} ${(top + bot) / 2} Q ${W / 2 - 10} ${-80} ${W / 2 - 40} ${-70} L ${-W / 2 + 40} ${-70} Q ${-W / 2 + 10} ${-80} ${-W / 2 - 10} ${(top + bot) / 2} Q ${-W / 2 - 14} ${bot} ${-W / 2 + 30} ${bot} Z`} fill={shade(bunC, 0.18)} />
        {/* sausage */}
        <rect x={-W / 2 + 26} y={-132} width={W - 52} height={70} rx={35} fill={sausC} />
        <rect x={-W / 2 + 60} y={-124} width={W - 120} height={12} rx={6} fill="#FFFFFF" opacity={0.3} />
        <rect x={-W / 2 + 26} y={-80} width={W - 52} height={18} rx={9} fill={shade(sausC, 0.2)} opacity={0.5} />
        {mustard && <polyline points={zz.join(" ")} fill="none" stroke={C.yellow} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />}
        {ketchup && <path d={`M ${-W / 2 + 60} -96 Q ${-W / 4} -104 0 -96 T ${W / 2 - 60} -96`} fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" opacity={0.0} />}
        {ketchup && <path d={`M ${-W / 2 + 70} -146 Q 0 -132 ${W / 2 - 70} -146`} fill="none" stroke={C.red} strokeWidth={9} strokeLinecap="round" opacity={0.9} />}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <HotDog {...p} />;
}
