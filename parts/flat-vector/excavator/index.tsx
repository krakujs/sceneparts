import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tracked excavator (digger) facing right: tracks, rear counterweight, cab, boom, arm and bucket.
// Room scale, about 530 px tall and 750 px wide at s = 1. Origin = floor centre under the tracks.
// anim "dig": the arm and bucket swing back and forth round the elbow joint.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const dig = anim === "dig" ? 12 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={360} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tracks with rollers */}
        <rect x={-330} y={-120} width={460} height={120} rx={60} fill={C.inkSoft} />
        {[-270, -200, -130, -60, 10].map((tx) => (
          <circle key={tx} cx={tx} cy={-60} r={22} fill={C.greyDark} />
        ))}
        {/* rear counterweight, cab house */}
        <rect x={-330} y={-340} width={112} height={210} rx={22} fill={shade(body, 0.2)} />
        <rect x={-230} y={-340} width={320} height={230} rx={36} fill={body} />
        <rect x={-150} y={-300} width={160} height={80} rx={14} fill={C.sky} />
        {/* boom and hydraulic ram */}
        <line x1={40} y1={-300} x2={150} y2={-460} stroke={C.greyLight} strokeWidth={16} strokeLinecap="round" />
        <line x1={30} y1={-250} x2={200} y2={-520} stroke={body} strokeWidth={60} strokeLinecap="round" />
        {/* arm and bucket, swing round the elbow */}
        <g transform={`rotate(${f1(dig)} 200 -520)`}>
          <line x1={200} y1={-520} x2={330} y2={-330} stroke={frame} strokeWidth={48} strokeLinecap="round" />
          <path d="M296,-352 L420,-372 L400,-262 L330,-240 Z" fill={frame} strokeLinejoin="round" />
          <circle cx={330} cy={-330} r={20} fill={C.inkSoft} />
        </g>
        <circle cx={200} cy={-520} r={24} fill={C.inkSoft} />
        <circle cx={30} cy={-250} r={24} fill={C.inkSoft} />
      </g>
    </g>
  );
}
