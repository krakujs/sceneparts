import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Passenger airliner, side view, facing right: tube body, row of windows, solid swept wing, one engine pod,
// swept tail fin with a small tailplane. Origin = bottom centre (the gear); about 990 px wide, 580 px tall at s = 1.
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
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const turn = anim === "fly" ? f * 30 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + hover(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* far engine, behind the fuselage */}
        <ellipse cx={-40} cy={-96} rx={70} ry={34} fill={shade(C.grey, 0.2)} />
        {/* tail fin: swept trapezoid, wide base, narrow top, leaning back; small tailplane */}
        <path d="M -450 -285 L -470 -570 L -410 -570 L -320 -300 Z" fill={accent} />
        <path d="M -340 -215 L -488 -215 L -496 -188 L -340 -178 Z" fill={accent} />
        {/* fuselage, stripe, windows */}
        <path d="M -470 -200 Q -478 -262 -400 -284 L 300 -302 Q 432 -304 468 -222 Q 482 -180 462 -152 Q 440 -124 380 -122 L -380 -122 Q -456 -124 -470 -200 Z" fill={body} />
        <path d="M -462 -196 L 470 -196 L 462 -174 L -462 -174 Z" fill={accent} />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={-330 + i * 50} y={-268} width={30} height={36} rx={12} fill={C.sky} />
        ))}
        <path d="M 352 -274 L 404 -276 Q 430 -272 444 -244 L 366 -240 Z" fill={C.sky} />
        {/* solid swept wing crossing the lower fuselage */}
        <path d="M 170 -150 L -10 -150 L -110 -22 L -40 -22 Z" fill={C.greyDark} />
        {/* engine pod under the wing */}
        <rect x={132} y={-138} width={24} height={40} fill={C.greyDark} />
        <ellipse cx={160} cy={-100} rx={72} ry={36} fill={C.grey} />
        <ellipse cx={226} cy={-100} rx={12} ry={32} fill={C.ink} />
        <g transform={`rotate(${f1(turn)} 226 -100)`}>
          <rect x={223} y={-126} width={6} height={52} rx={3} fill={C.greyLight} />
        </g>
        {/* landing gear */}
        <rect x={32} y={-110} width={16} height={90} fill={C.greyDark} />
        <circle cx={40} cy={-30} r={30} fill={C.ink} />
        <circle cx={40} cy={-30} r={11} fill={C.greyLight} />
        <rect x={330} y={-122} width={14} height={98} fill={C.greyDark} />
        <circle cx={337} cy={-24} r={24} fill={C.ink} />
        <circle cx={337} cy={-24} r={9} fill={C.greyLight} />
      </g>
    </g>
  );
}
