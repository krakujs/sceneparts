import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small business jet, side view, facing right: slim fuselage with a pointed nose and cockpit windows, swept T-tail
// (fin and tailplane in the accent colour), one engine nacelle on the rear fuselage side, solid swept wing with a
// winglet, small landing gear. Origin = bottom centre (the gear); about 720 px wide and 500 px tall at s = 1.
// anim "fly": gentle hover and the engine fan spins.
const f1 = (v: number) => v.toFixed(1);
const hover = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 90) + 1) * 7;
  if (anim === "bob") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6;
  return 0;
};
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1500;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const turn = anim === "fly" ? f * 36 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + hover(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* swept T-tail: fin and tailplane on top, both accent */}
        <path d="M -270 -250 L -330 -470 L -270 -470 L -200 -250 Z" fill={accent} />
        <path d="M -386 -480 L -250 -480 L -256 -456 L -380 -456 Z" fill={accent} />
        {/* slim fuselage with pointed nose */}
        <path d="M -330 -170 Q -336 -240 -270 -250 L 220 -254 Q 300 -252 350 -220 L 392 -190 Q 396 -180 384 -172 L 340 -150 Q 280 -132 200 -132 L -270 -132 Q -326 -132 -330 -170 Z" fill={body} />
        <rect x={-320} y={-176} width={690} height={12} rx={6} fill={accent} />
        {[-20, 20, 60, 100, 140].map((wx) => (
          <rect key={wx} x={wx} y={-224} width={24} height={22} rx={8} fill={C.sky} />
        ))}
        <path d="M 296 -236 L 340 -226 L 330 -208 L 294 -212 Z" fill={C.sky} />
        {/* solid swept wing with winglet */}
        <path d="M 120 -134 L -30 -134 L -130 -20 L -60 -20 Z" fill={C.greyDark} />
        <rect x={-136} y={-60} width={10} height={42} rx={4} fill={C.greyDark} />
        {/* engine nacelle on the rear fuselage side, just in front of the fin */}
        <rect x={-168} y={-176} width={120} height={54} rx={27} fill={C.grey} />
        <ellipse cx={-62} cy={-149} rx={10} ry={22} fill={C.ink} />
        <g transform={`rotate(${f1(turn)} -62 -149)`}>
          <rect x={-65} y={-128} width={6} height={44} rx={3} fill={C.greyLight} />
        </g>
        {/* small landing gear */}
        <rect x={56} y={-130} width={14} height={104} fill={C.greyDark} />
        <circle cx={63} cy={-26} r={26} fill={C.ink} />
        <circle cx={63} cy={-26} r={10} fill={C.greyLight} />
        <rect x={300} y={-112} width={12} height={90} fill={C.greyDark} />
        <circle cx={306} cy={-22} r={22} fill={C.ink} />
        <circle cx={306} cy={-22} r={8} fill={C.greyLight} />
      </g>
    </g>
  );
}
