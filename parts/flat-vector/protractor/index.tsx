import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clear semicircle protractor standing on its flat edge, tinted plastic with degree ticks and no numbers.
// Origin = centre of the flat edge (sits on y). About 560 px wide and 300 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";
const R = 280;

// Ticks: every degree short, every 5 medium, every 10 long. Drawn from radius 246 inwards.
const ticks: React.ReactNode[] = [];
for (let a = 0; a <= 180; a++) {
  const len = a % 10 === 0 ? 40 : a % 5 === 0 ? 24 : 12;
  const w = a % 10 === 0 ? 5 : a % 5 === 0 ? 3 : 2;
  const r = (a * Math.PI) / 180;
  const x1 = Math.cos(r) * 246, y1 = -Math.sin(r) * 246;
  const x2 = Math.cos(r) * (246 - len), y2 = -Math.sin(r) * (246 - len);
  ticks.push(<line key={a} x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} stroke={C.inkSoft} strokeWidth={w} strokeLinecap="round" />);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const tint = p.color && p.color !== "none" ? p.color : "#8EC5E8";
  const anim: string = p.anim ?? "none";
  const semi = `M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0 Z`;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* thickness edge */}
        <path d={semi} transform="translate(0 6)" fill={shade(tint, 0.3)} />
        {/* tinted plastic body, see-through */}
        <path d={semi} fill={tint} opacity={0.7} />
        {/* inner curve and centre hole */}
        <path d={`M ${-200} 0 A 200 200 0 0 1 200 0`} fill="none" stroke={shade(tint, 0.35)} strokeWidth={5} />
        <circle cx={0} cy={-6} r={9} fill={C.inkSoft} />
        {/* glare */}
        <path d="M 110 -226 A 236 236 0 0 1 226 -110" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.5} />
        {/* degree ticks */}
        {ticks}
        {/* flat edge */}
        <rect x={-R} y={-4} width={R * 2} height={6} rx={3} fill={shade(tint, 0.35)} />
      </g>
    </g>
  );
}
