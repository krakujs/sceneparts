import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of gold drop earrings with gem drops, hanging from a small display card on a stand.
// Origin = bottom centre (the stand base sits on y). About 400 px wide and 560 px tall at s = 1 (hero size).
// anim "sway": the earrings swing on their hooks; "sparkle": glints pulse beside the drops.
const f1 = (v: number) => v.toFixed(1);

const drop = (cx: number) =>
  `M ${cx} -454 C ${cx + 56} -400 ${cx + 44} -300 ${cx} -262 C ${cx - 44} -300 ${cx - 56} -400 ${cx} -454 Z`;

const Star = ({ x, y, k, c }: { x: number; y: number; k: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(k)})`} opacity={f1(Math.min(1, k))}>
    <path d="M 0 -20 L 5 -5 L 20 0 L 5 5 L 0 20 L -5 5 L -20 0 L -5 -5 Z" fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const gem = p.color2 && p.color2 !== "none" ? p.color2 : "#F27BA6";
  const anim: string = p.anim ?? "none";
  const swing = (phase: number) => (anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60 + phase) * 6 : 0);
  const tw = (phase: number) => (anim === "sparkle" ? 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 45 + phase)) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      {/* stand: base, post and the display card they hang from */}
      <rect x={-130} y={-36} width={260} height={36} rx={12} fill={C.grey} />
      <rect x={-130} y={-36} width={260} height={10} rx={5} fill={shade(C.grey, 0.15)} />
      <rect x={-8} y={-530} width={16} height={500} fill={C.greyDark} />
      <rect x={-200} y={-566} width={400} height={38} rx={14} fill={C.white} />
      <rect x={-200} y={-566} width={400} height={12} rx={6} fill={C.greyLight} />
      {[-110, 110].map((hx, i) => (
        <g key={hx} transform={`translate(${f1(hx)} -528) rotate(${f1(swing(i * 1.2))}) translate(${f1(-hx)} 528)`}>
          {/* hook through the card */}
          <circle cx={hx} cy={-490} r={10} fill="none" stroke={gold} strokeWidth={6} />
          <rect x={hx - 16} y={-466} width={32} height={14} rx={6} fill={gold} />
          {/* gem drop */}
          <path d={drop(hx)} fill={gem} />
          <path d={drop(hx)} fill={shade(gem, 0.2)} opacity={0.35} transform={`translate(${f1(hx)} -262) scale(0.7) translate(${f1(-hx)} 262)`} />
          <path d={`M ${f1(hx - 18)} -400 Q ${f1(hx - 22)} -370 ${f1(hx - 12)} -340`} fill="none" stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
          <Star x={hx + 70} y={-380} k={tw(i * 2.1)} c={gold} />
        </g>
      ))}
    </g>
  );
}
