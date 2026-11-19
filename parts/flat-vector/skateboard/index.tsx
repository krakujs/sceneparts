import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Skateboard, side view, facing right: a long deck with upturned ends, grip stripe, two metal trucks and four
// wheels (two per truck, overlapping in side view). Origin = floor centre; the wheels touch y.
// Hero prop, about 520 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const deck = p.color && p.color !== "none" ? p.color : C.orange;
  const wheelC = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 14 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} -34)`}>
      <circle cx={0} cy={0} r={34} fill={wheelC} />
      <circle cx={0} cy={0} r={34} fill="none" stroke={shade(wheelC, 0.25)} strokeWidth={6} />
      <g transform={`rotate(${f1(spin)})`}>
        <line x1={-14} y1={0} x2={14} y2={0} stroke={shade(wheelC, 0.3)} strokeWidth={6} strokeLinecap="round" />
      </g>
      <circle cx={0} cy={0} r={7} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* metal trucks */}
          <rect x={-190} y={-84} width={70} height={16} rx={6} fill={C.greyDark} />
          <rect x={120} y={-84} width={70} height={16} rx={6} fill={C.greyDark} />
          <path d="M -150 -68 L -130 -84 L -110 -68 Z" fill={C.greyDark} />
          <path d="M 150 -68 L 170 -84 L 190 -68 Z" fill={C.greyDark} />
          {/* wheels: two per truck */}
          {wheel(-200)}{wheel(-160)}
          {wheel(110)}{wheel(150)}
          {/* curved deck with upturned ends */}
          <path d="M -250 -118 Q -250 -138 -226 -138 L 226 -138 Q 250 -138 250 -118 Q 250 -94 226 -94 L -226 -94 Q -250 -94 -250 -118 Z" fill={deck} />
          <path d="M -240 -118 L 240 -118" stroke={shade(deck, 0.2)} strokeWidth={6} strokeLinecap="round" fill="none" />
        </g>
      </g>
    </g>
  );
}
