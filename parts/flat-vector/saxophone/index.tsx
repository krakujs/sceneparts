import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Alto-style saxophone standing upright: a neck with a mouthpiece at the top, a tall body that curves
// round at the bottom and a bell flaring up on the right. Brass with a row of silver key cups.
// Origin = bottom centre (bell rim rests on y). About 780 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const TUBE = "M -120 -730 C -90 -745 -68 -720 -68 -680 L -68 -230 C -68 -110 40 -70 60 -180 L 60 -262";
const KEYS: [number, number][] = [[-640, 0], [-570, 0], [-500, 0], [-430, 0], [-360, 0], [-290, 0], [-240, 0], [-180, 0]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brass = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tube: darker underside, then the lit brass on top */}
        <path d={TUBE} fill="none" stroke={shade(brass, 0.3)} strokeWidth={70} strokeLinecap="round" strokeLinejoin="round" />
        <path d={TUBE} fill="none" stroke={brass} strokeWidth={56} strokeLinecap="round" strokeLinejoin="round" transform="translate(-5 0)" />
        {/* bell flare at the top of the bottom curve */}
        <ellipse cx={60} cy={-262} rx={64} ry={20} fill={brass} />
        <ellipse cx={60} cy={-262} rx={46} ry={12} fill={shade(brass, 0.35)} />
        <path d="M 6 -190 Q 0 -240 14 -262 L 40 -262 Q 22 -230 20 -190 Z" fill={shade(brass, 0.2)} opacity={0.6} />
        {/* mouthpiece with ligature */}
        <rect x={-150} y={-748} width={56} height={22} rx={8} fill={C.ink} transform="rotate(-18 -122 -737)" />
        <rect x={-140} y={-756} width={36} height={14} rx={6} fill={C.inkSoft} transform="rotate(-18 -122 -737)" />
        <rect x={-150} y={-760} width={36} height={18} rx={6} fill={C.greyDark} transform="rotate(-18 -122 -737)" />
        {/* key cups */}
        {KEYS.map(([ky], i) => (
          <g key={i}>
            <circle cx={-68 + (i % 2 ? 0 : -12)} cy={ky} r={16} fill={C.greyLight} />
            <circle cx={-68 + (i % 2 ? 0 : -12)} cy={ky} r={7} fill={C.greyDark} />
          </g>
        ))}
        {/* body key pads on the front and the bow */}
        <circle cx={-68} cy={-150} r={14} fill={C.greyLight} />
        <circle cx={-68} cy={-150} r={6} fill={C.greyDark} />
        <rect x={-60} y={-420} width={10} height={160} rx={5} fill={C.white} opacity={0.35} />
        {/* neck rod (bow) */}
        <rect x={-92} y={-610} width={18} height={36} rx={6} fill={shade(brass, 0.25)} />
      </g>
    </g>
  );
}
