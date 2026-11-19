import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic bell tower, front view: a plain stone shaft with a doorway and narrow windows, an open belfry with three arched
// openings, a bronze bell hung from a beam in the middle opening, and a pyramid roof with a ball finial. No symbols.
// Origin = bottom centre; the plinth stands on y. About 590 px wide and 1120 px tall at s = 1.
// anim "lights": the bell swings on its beam (a slow pendulum swing). "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
const arch = (cx: number, w: number, yb: number, h: number) => {
  const r = w / 2;
  return `M ${cx - r} ${yb} L ${cx - r} ${yb - h + r} A ${r} ${r} 0 0 1 ${cx + r} ${yb - h + r} L ${cx + r} ${yb} Z`;
};
const BELL = C.yellowDark;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.greyLight;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.redDark;
  const anim: string = p.anim ?? "none";
  const swing = anim === "lights" ? Math.sin((f * 2 * Math.PI) / 60) * 14 : 0;
  const PIV = -838;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-270} y={-60} width={540} height={60} rx={8} fill={C.greyDark} />
        {/* shaft with doorway and windows */}
        <rect x={-230} y={-700} width={460} height={640} fill={stone} />
        <rect x={-230} y={-700} width={26} height={640} fill={shade(stone, 0.12)} />
        <rect x={204} y={-700} width={26} height={640} fill={shade(stone, 0.12)} />
        {[-150, 150].map((wx) => (
          <path key={wx} d={arch(wx, 50, -420, 120)} fill={C.inkSoft} />
        ))}
        <path d={arch(0, 110, -60, 170)} fill={C.brownDark} />
        {/* belfry: three arched openings, beam and bell */}
        <rect x={-260} y={-880} width={520} height={180} rx={6} fill={stone} />
        <rect x={-260} y={-716} width={520} height={16} fill={shade(stone, 0.15)} />
        {[-170, 0, 170].map((ox) => (
          <path key={ox} d={arch(ox, 120, -700, 150)} fill={shade(stone, 0.55)} />
        ))}
        <rect x={-150} y={-852} width={300} height={14} rx={4} fill={C.brownDark} />
        <g transform={`rotate(${f1(swing)} 0 ${PIV})`}>
          <rect x={-20} y={PIV - 10} width={40} height={10} rx={4} fill={C.greyDark} />
          <rect x={-6} y={PIV} width={12} height={12} fill={C.greyDark} />
          <path d={`M -40 ${PIV + 4} Q -40 ${PIV + 44} -70 ${PIV + 78} Q -92 ${PIV + 102} -92 ${PIV + 116} L 92 ${PIV + 116} Q 92 ${PIV + 102} 70 ${PIV + 78} Q 40 ${PIV + 44} 40 ${PIV + 4} Z`} fill={BELL} />
          <path d={`M 20 ${PIV + 12} Q 40 ${PIV + 50} 60 ${PIV + 92} L 70 ${PIV + 86} Q 52 ${PIV + 44} 34 ${PIV + 10} Z`} fill={C.white} opacity={0.35} />
          <rect x={-100} y={PIV + 110} width={200} height={14} rx={6} fill={shade(BELL, 0.2)} />
          <circle cx={0} cy={PIV + 6} r={14} fill={shade(BELL, 0.2)} />
          <circle cx={0} cy={PIV + 130} r={12} fill={C.greyDark} />
        </g>
        {/* pyramid roof and finial */}
        <path d="M -280 -880 L 0 -1040 L 280 -880 Z" fill={roof} />
        <rect x={-296} y={-896} width={592} height={26} rx={8} fill={shade(roof, 0.15)} />
        <rect x={-6} y={-1090} width={12} height={56} fill={C.greyDark} />
        <circle cx={0} cy={-1100} r={16} fill={C.yellow} />
      </g>
    </g>
  );
}
