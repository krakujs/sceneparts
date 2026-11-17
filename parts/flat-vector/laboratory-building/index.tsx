import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Modern laboratory building: a glass-and-panel facade, a penthouse, rooftop vents and a stack, with a flask sign
// above the entrance. Origin = ground centre. About 720 px wide and 1000 px tall at s = 1.
// anim "lights": the lab windows light up one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={4} fill={glow ? C.yellow : C.sky} />
    <path d={`M ${f1(x0 + w * 0.15)} ${f1(y0 + h)} L ${f1(x0 + w * 0.42)} ${f1(y0)} L ${f1(x0 + w * 0.56)} ${f1(y0)} L ${f1(x0 + w * 0.29)} ${f1(y0 + h)} Z`} fill={C.white} opacity={0.5} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const rows = [-770, -660, -550, -440, -330, -220];
  const cols = [-240, -120, 0, 120, 240];
  const skipPanel = (r: number, c: number) => r < 2 && c === 1 || r < 2 && c === 2 || r < 2 && c === 3;
  const lit = (r: number, c: number) => anim === "lights" && Math.floor(f / 6) % 30 === r * 5 + c;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={380} ry={18} fill={C.shadow} />
        {/* main block and penthouse */}
        <rect x={-340} y={-820} width={680} height={820} fill={wall} />
        <rect x={-220} y={-900} width={440} height={80} fill={shade(wall, 0.05)} />
        <rect x={-340} y={-830} width={680} height={12} fill={accent} />
        <rect x={-340} y={-30} width={680} height={30} rx={6} fill={shade(wall, 0.3)} />
        {/* facade grid of lab windows; the flask sign occupies the top centre */}
        {rows.map((ry, r) => cols.map((cx, c) => {
          if (skipPanel(r, c)) return null;
          return win(`w${r}${c}`, cx - 40, ry, 80, 74, lit(r, c));
        }))}
        {/* flask sign */}
        <rect x={-100} y={-770} width={200} height={150} rx={14} fill={accent} />
        <rect x={-12} y={-760} width={24} height={50} fill={C.white} />
        <path d="M -12 -712 L -58 -640 Q -66 -626 -50 -626 L 50 -626 Q 66 -626 58 -640 L 12 -712 Z" fill={C.white} />
        <path d="M -46 -650 L 46 -650 L 58 -636 Q 62 -626 50 -626 L -50 -626 Q -62 -626 -58 -636 Z" fill={C.lime} />
        <circle cx={-18} cy={-640} r={5} fill={C.white} opacity={0.7} />
        {/* rooftop vents and exhaust stack */}
        <rect x={-180} y={-940} width={70} height={40} rx={4} fill={C.greyDark} />
        <rect x={110} y={-940} width={70} height={40} rx={4} fill={C.greyDark} />
        {[-170, -152, -134, -116].map((gx) => <rect key={`v${gx}`} x={gx} y={-934} width={6} height={28} fill={shade(C.greyDark, 0.3)} />)}
        {[120, 138, 156, 174].map((gx) => <rect key={`u${gx}`} x={gx} y={-934} width={6} height={28} fill={shade(C.greyDark, 0.3)} />)}
        <rect x={-18} y={-1010} width={36} height={112} fill={C.greyDark} />
        <rect x={-28} y={-1020} width={56} height={14} rx={4} fill={C.inkSoft} />
        {/* entrance canopy and glass doors */}
        <rect x={-130} y={-150} width={260} height={18} rx={6} fill={accent} />
        <rect x={-62} y={-132} width={124} height={102} fill={C.sky} />
        <rect x={-2} y={-132} width={4} height={102} fill={shade(wall, 0.4)} />
        <path d="M -50 -130 L -26 -130 L -54 -40 L -62 -40 Z" fill={C.white} opacity={0.5} />
        <rect x={-100} y={-30} width={200} height={8} fill={shade(wall, 0.15)} />
      </g>
    </g>
  );
}
