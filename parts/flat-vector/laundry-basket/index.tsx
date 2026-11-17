import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Woven laundry basket with a blue T-shirt, a teal towel and a pink sock peeking out of the top.
// Origin = bottom centre; about 340 px tall at s = 1. anim "peek" lifts and drops the clothes gently.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};
// Half-width of the basket wall at height y (from 300 at the rim to 240 at the base).
const hw = (yy: number) => 240 + 60 * (-yy / 420);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const rim = shade(c, 0.1), dark = shade(c, 0.45);
  const peek = p.anim === "peek" ? Math.sin((f * 2 * Math.PI) / 60) * 10 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(0.6)`}>
      <ellipse cx={0} cy={0} rx={300} ry={22} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* back half of the rim, then the dark opening */}
        <path d="M -316 -420 A 316 56 0 0 1 316 -420 L 290 -420 A 290 40 0 0 0 -290 -420 Z" fill={rim} />
        <ellipse cx={0} cy={-420} rx={290} ry={40} fill={dark} />
        {/* clothes inside: they sit higher than the rim, and the front wall hides their bottoms */}
        <g transform={`translate(0 ${f1(peek)})`}>
          <rect x={-130} y={-560} width={110} height={150} rx={26} fill={C.blue} />
          <path d="M -130 -540 L -170 -500 L -150 -470 L -120 -490 Z" fill={shade(C.blue, 0.1)} />
          <ellipse cx={-75} cy={-560} rx={26} ry={10} fill={shade(C.blue, 0.3)} />
          <rect x={30} y={-520} width={150} height={120} rx={14} fill={C.teal} />
          <rect x={30} y={-500} width={150} height={10} fill={C.tealDark} />
          <rect x={-20} y={-500} width={40} height={110} rx={18} fill={C.pink} />
        </g>
        {/* woven front wall */}
        <path d={`M -300 -420 L 300 -420 L 240 -10 Q 236 0 220 0 L -220 0 Q -236 0 -240 -10 Z`} fill={c} />
        {[-350, -280, -210, -140, -70].map((yy) => (
          <path key={yy} d={`M ${f1(-hw(yy) + 16)} ${yy} L ${f1(hw(yy) - 16)} ${yy}`} stroke={shade(c, 0.22)} strokeWidth={14} strokeLinecap="round" fill="none" />
        ))}
        {/* front half of the rim */}
        <path d="M -316 -420 A 316 56 0 0 0 316 -420 L 290 -420 A 290 40 0 0 1 -290 -420 Z" fill={rim} />
      </g>
    </g>
  );
}
