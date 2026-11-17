import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blimp (airship), side view, facing right: oval envelope with tail fins and a small dark gondola on struts.
// Origin = bottom centre (the bottom of the gondola); about 940 px wide and 690 px tall at s = 1. No words.
// anim "fly": gentle float up and down.
const f1 = (v: number) => v.toFixed(1);
const float = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 110) + 1) * 9;
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
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const fin = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y + float(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* tail fins, behind the envelope */}
        <path d="M -380 -540 L -460 -680 L -420 -690 L -330 -540 Z" fill={fin} />
        <path d="M -380 -400 L -478 -314 L -458 -296 L -330 -356 Z" fill={fin} />
        {/* gondola struts */}
        <rect x={-70} y={-272} width={12} height={188} fill={C.greyDark} />
        <rect x={58} y={-272} width={12} height={188} fill={C.greyDark} />
        {/* envelope */}
        <ellipse cx={0} cy={-460} rx={460} ry={200} fill={body} />
        <path d="M -460 -460 A 460 200 0 0 0 460 -460 Z" fill={shade(body, 0.22)} />
        <ellipse cx={-130} cy={-560} rx={190} ry={34} fill={C.white} opacity={0.25} />
        {/* gondola */}
        <rect x={-120} y={-90} width={240} height={90} rx={30} fill={C.greyDark} />
        {[-96, -40, 16].map((wx) => (
          <rect key={wx} x={wx} y={-74} width={40} height={30} rx={8} fill={C.sky} />
        ))}
      </g>
    </g>
  );
}
