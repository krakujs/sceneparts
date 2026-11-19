import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Crew-neck T-shirt on a wooden hanger, front view. Origin = bottom centre (the hem rests on y).
// About 600 px wide and 720 px tall at s = 1 including the hanger. anim "sway" swings from the hook.
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
  const main = p.color && p.color !== "none" ? p.color : C.blue;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          <path d="M -72 -584 Q 0 -520 72 -584 L 128 -578 L 302 -500 L 258 -418 L 186 -446 L 180 0 L -180 0 L -186 -446 L -258 -418 L -302 -500 L -128 -578 Z" fill={main} />
          <path d="M 120 -430 Q 150 -200 150 0 L 180 0 L 186 -446 Z" fill={shade(main, 0.12)} />
          <path d="M -180 -22 L 180 -22 L 180 0 L -180 0 Z" fill={shade(main, 0.14)} />
          <path d="M -72 -584 Q 0 -520 72 -584" stroke={trim} strokeWidth={16} strokeLinecap="round" fill="none" />
        </g>
      </g>
    </g>
  );
}
