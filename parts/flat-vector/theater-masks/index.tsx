import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of generic theatre masks, original design: a smiling comedy mask on the left and a frowning tragedy
// mask on the right, each with eye holes, a brow, a mouth and a shaded lower face. Origin = centre of the pair.
const f1 = (v: number) => v.toFixed(1);

// Face outline: a rounded shield, wider at the brow and narrowing to the chin.
const FACE = "M -140 -190 Q 0 -230 140 -190 Q 150 -20 0 150 Q -150 -20 -140 -190 Z";

// One mask in local coordinates (centred on 0,0). smile = +1 comedy, -1 tragedy.
const Mask = ({ c, smile, accent }: { c: string; smile: number; accent: string }) => (
  <g>
    <path d={FACE} fill={c} />
    <path d="M 0 80 Q 80 80 120 0 Q 150 -20 0 150 Q -150 -20 -120 0 Q -80 80 0 80 Z" fill={shade(c, 0.12)} opacity={0.6} />
    {/* eye holes: almond shapes */}
    <path d="M -78 -60 Q -50 -90 -20 -60 Q -50 -40 -78 -60 Z" fill={C.ink} />
    <path d="M 20 -60 Q 50 -90 78 -60 Q 50 -40 20 -60 Z" fill={C.ink} />
    {/* brows, angled up (comedy) or down (tragedy) */}
    <path d={`M -84 ${f1(-100 + smile * 4)} L -22 ${f1(-100 - smile * 14)}`} stroke={accent} strokeWidth={10} strokeLinecap="round" />
    <path d={`M 22 ${f1(-100 - smile * 14)} L 84 ${f1(-100 + smile * 4)}`} stroke={accent} strokeWidth={10} strokeLinecap="round" />
    {/* mouth: an upturned arc for comedy, downturned for tragedy */}
    <path d={`M -62 ${f1(60)} Q 0 ${f1(60 + smile * 56)} 62 60`} fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
    {/* cheek highlight */}
    <ellipse cx={-96} cy={-10} rx={12} ry={8} fill="#FFFFFF" opacity={0.35} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1000;
  const face = p.mask && p.mask !== "none" ? p.mask : "#FFFFFF";
  const anim: string = p.anim ?? "none";
  const lift = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 60) * 14 : 0;
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 2.5 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={190} rx={300} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(pop)})`}>
        {/* comedy mask (left), raised when bobbing */}
        <g transform={`translate(-150 ${f1(lift)}) rotate(${f1(-8 + rock)})`}>
          <Mask c={face} smile={1} accent={C.ink} />
        </g>
        {/* tragedy mask (right), lowered when bobbing */}
        <g transform={`translate(150 ${f1(-lift)}) rotate(${f1(8 - rock)})`}>
          <Mask c={face} smile={-1} accent={C.ink} />
        </g>
      </g>
    </g>
  );
}
