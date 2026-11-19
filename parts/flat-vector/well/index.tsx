import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round stone well with a little pitched roof, a wooden crank and a bucket on a rope.
// Origin = centre of the ground line. About 500 px wide and 760 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = pick(p.color, "#B8B0A0");
  const wood = pick(p.color2, "#8A5A3C");
  const anim: string = p.anim ?? "none";
  const swing = anim === "bucket" ? 6 * Math.sin((f * 2 * Math.PI) / 80) : 0;
  const mortar = shade(stone, 0.22);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={250} ry={22} fill={C.shadow} />
        {/* stone drum with courses of blocks */}
        <rect x={-200} y={-260} width={400} height={260} rx={12} fill={stone} />
        {[-205, -150, -95].map((ly) => (
          <line key={ly} x1={-200} y1={ly} x2={200} y2={ly} stroke={mortar} strokeWidth={6} />
        ))}
        {[-170, -60, 60, 170].map((vx, i) => (
          <line key={vx} x1={vx} y1={i % 2 ? -260 : -205} x2={vx} y2={i % 2 ? -205 : -150} stroke={mortar} strokeWidth={6} />
        ))}
        <rect x={-200} y={-94} width={400} height={18} rx={6} fill={shade(stone, 0.15)} />
        {/* top rim and water */}
        <ellipse cx={0} cy={-260} rx={212} ry={56} fill={shade(stone, 0.1)} />
        <ellipse cx={0} cy={-260} rx={170} ry={40} fill={C.blueDark} />
        <ellipse cx={0} cy={-258} rx={150} ry={28} fill={C.blue} opacity={0.85} />
        {/* posts, beam, drum with crank */}
        <rect x={-168} y={-470} width={22} height={216} rx={6} fill={wood} />
        <rect x={146} y={-470} width={22} height={216} rx={6} fill={wood} />
        <rect x={-170} y={-430} width={340} height={18} rx={8} fill={wood} />
        <rect x={-56} y={-448} width={112} height={36} rx={8} fill={shade(wood, 0.25)} />
        <path d="M 170 -421 L 214 -421 L 214 -372" stroke={wood} strokeWidth={16} strokeLinecap="round" fill="none" />
        <circle cx={214} cy={-362} r={14} fill={shade(wood, 0.3)} />
        {/* little pitched roof */}
        <path d="M -250 -456 L 0 -606 L 250 -456 Z" fill={C.redDark} />
        <rect x={-262} y={-466} width={524} height={18} rx={9} fill={shade(C.redDark, 0.2)} />
        {/* rope and bucket, which can sway */}
        <g transform={`rotate(${f1(swing)} 0 -412)`}>
          <line x1={0} y1={-412} x2={0} y2={-236} stroke="#C9A46A" strokeWidth={6} strokeLinecap="round" />
          <path d="M -44 -236 L 44 -236 L 36 -172 L -36 -172 Z" fill={wood} />
          <rect x={-50} y={-246} width={100} height={14} rx={6} fill={shade(wood, 0.3)} />
        </g>
      </g>
    </g>
  );
}
