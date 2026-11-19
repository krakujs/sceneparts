import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kettlebell standing on a flat base: a round iron bell with a thick loop handle on top and a small
// yellow weight label. Origin = bottom centre (the base rests on y). About 380 px wide, 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const iron = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const label = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* handle loop, drawn behind the bell so the bell covers its base */}
        <path d="M -100 -330 Q -110 -460 0 -460 Q 110 -460 100 -330" stroke={shade(iron, 0.25)} strokeWidth={46} strokeLinecap="round" fill="none" />
        <path d="M -100 -330 Q -110 -460 0 -460 Q 110 -460 100 -330" stroke={iron} strokeWidth={30} strokeLinecap="round" fill="none" />
        {/* bell body */}
        <circle cx={0} cy={-210} r={190} fill={iron} />
        {/* shade crescent on the right */}
        <path d="M 60 -400 Q 200 -330 190 -210 Q 170 -90 60 -30 Q 130 -110 130 -210 Q 130 -320 60 -400 Z" fill={shade(iron, 0.22)} />
        {/* flat base */}
        <rect x={-130} y={-30} width={260} height={30} rx={12} fill={C.ink} />
        {/* weight label */}
        <rect x={-60} y={-270} width={120} height={60} rx={14} fill={label} />
        <rect x={-60} y={-236} width={120} height={26} rx={0} fill={shade(label, 0.12)} opacity={0.5} />
        {/* highlight */}
        <ellipse cx={-90} cy={-290} rx={22} ry={44} fill={C.white} opacity={0.25} transform="rotate(20 -90 -290)" />
      </g>
    </g>
  );
}
