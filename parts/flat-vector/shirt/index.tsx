import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Button-up collared shirt on a wooden hanger, front view: pointed collar, placket with buttons,
// breast pocket and cuffs. Origin = bottom centre (the hem rests on y). About 600 px wide, 720 px tall.
const f1 = (v: number) => v.toFixed(1);

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.teal;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const buttons = [-460, -390, -320, -250, -180, -110, -44];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* long sleeves and body */}
          <path d="M -60 -588 L 60 -588 L 150 -578 L 236 -530 L 250 -236 L 194 -236 L 180 -440 L 168 0 L -168 0 L -180 -440 L -194 -236 L -250 -236 L -236 -530 L -150 -578 Z" fill={main} />
          <path d="M 120 -430 Q 140 -200 146 0 L 168 0 L 180 -440 Z" fill={shade(main, 0.12)} />
          {/* cuffs */}
          <path d="M 192 -266 L 252 -268 L 250 -236 L 194 -236 Z" fill={shade(main, 0.18)} />
          <path d="M -192 -266 L -252 -268 L -250 -236 L -194 -236 Z" fill={shade(main, 0.18)} />
          {/* placket and hem */}
          <rect x={-4} y={-522} width={8} height={522} fill={shade(main, 0.2)} />
          <rect x={-168} y={-18} width={336} height={18} fill={shade(main, 0.14)} />
          {/* breast pocket */}
          <path d="M 52 -470 L 124 -470 L 124 -404 L 52 -404 Z" fill={shade(main, 0.08)} stroke={shade(main, 0.25)} strokeWidth={5} />
          <path d="M 52 -446 L 124 -446" stroke={shade(main, 0.25)} strokeWidth={5} />
          {/* pointed collar */}
          <path d="M -60 -588 L -10 -522 L -36 -496 L -108 -562 Z" fill={trim} stroke={shade(trim, 0.2)} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 60 -588 L 10 -522 L 36 -496 L 108 -562 Z" fill={trim} stroke={shade(trim, 0.2)} strokeWidth={4} strokeLinejoin="round" />
          {buttons.map((by, i) => (
            <circle key={i} cx={0} cy={by} r={7} fill={trim} stroke={shade(trim, 0.25)} strokeWidth={2} />
          ))}
        </g>
      </g>
    </g>
  );
}
