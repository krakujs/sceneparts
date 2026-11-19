import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shopping mall, front elevation. Origin = bottom centre on the ground. About 960 px wide and 860 px tall at s = 1.
// anim "lights": the windows on the upper floors light up one after another with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.sand;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const wins: [number, number][] = [];
  for (const row of [-640, -470]) for (const cx of [-380, -260, 260, 380]) wins.push([cx, row]);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={500} ry={22} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* main block */}
        <rect x={-470} y={-760} width={940} height={760} rx={18} fill={body} />
        <rect x={-470} y={-100} width={940} height={22} fill={shade(body, 0.12)} />
        {/* roof trim and rooftop plant */}
        <rect x={-490} y={-780} width={980} height={28} rx={10} fill={accent} />
        <rect x={-300} y={-830} width={160} height={50} rx={8} fill={shade(accent, 0.15)} />
        <rect x={-280} y={-812} width={40} height={18} rx={4} fill={C.green} />
        <rect x={-230} y={-812} width={40} height={18} rx={4} fill={C.green} />
        {/* big glass atrium in the middle */}
        <rect x={-210} y={-690} width={420} height={560} rx={14} fill={C.skyDeep} />
        <path d="M -170 -690 L -120 -690 L -190 -130 L -240 -130 Z" fill={C.white} opacity={0.35} />
        <path d="M 110 -690 L 140 -690 L 70 -130 L 40 -130 Z" fill={C.white} opacity={0.25} />
        {[-140, -70, 0, 70, 140].map((dx) => <rect key={dx} x={dx - 4} y={-690} width={8} height={560} fill={shade(body, 0.1)} />)}
        <rect x={-210} y={-520} width={420} height={10} fill={shade(body, 0.1)} />
        {/* blank banners above the atrium */}
        <rect x={-190} y={-655} width={180} height={56} rx={8} fill={C.white} />
        <rect x={10} y={-655} width={180} height={56} rx={8} fill={C.white} />
        <rect x={-190} y={-655} width={180} height={8} rx={4} fill={accent} />
        <rect x={10} y={-655} width={180} height={8} rx={4} fill={accent} />
        {/* glass entrance doors and canopy */}
        <rect x={-150} y={-260} width={300} height={160} rx={10} fill={C.sky} />
        <path d="M -120 -260 L -95 -260 L -120 -100 L -140 -100 Z" fill={C.white} opacity={0.6} />
        <rect x={-4} y={-260} width={8} height={160} fill={C.greyDark} />
        <rect x={-190} y={-290} width={380} height={24} rx={8} fill={accent} />
        <rect x={-190} y={-266} width={380} height={8} fill={shade(accent, 0.2)} />
        {/* side shop fronts */}
        {[-400, 260].map((bx) => (
          <g key={bx}>
            <rect x={bx} y={-200} width={140} height={100} rx={8} fill={C.white} />
            <rect x={bx + 10} y={-190} width={120} height={80} rx={6} fill={C.sky} />
            <rect x={bx - 6} y={-216} width={152} height={16} rx={6} fill={shade(accent, 0.2)} />
          </g>
        ))}
        {/* upper-floor windows, optionally lighting up in sequence */}
        {wins.map(([cx, row], i) => {
          const on = anim === "lights" && Math.floor(f / 6) % wins.length >= i;
          return (
            <g key={i}>
              <rect x={cx - 42} y={row} width={84} height={78} rx={8} fill={on ? C.yellow : C.sky} />
              <rect x={cx - 34} y={row + 8} width={18} height={60} rx={4} fill={C.white} opacity={0.5} />
            </g>
          );
        })}
        {/* steps */}
        <rect x={-200} y={-100} width={400} height={22} rx={6} fill={C.greyLight} />
        <rect x={-230} y={-78} width={460} height={22} rx={6} fill={C.grey} />
        <rect x={-260} y={-56} width={520} height={22} rx={6} fill={C.greyDark} />
      </g>
    </g>
  );
}
