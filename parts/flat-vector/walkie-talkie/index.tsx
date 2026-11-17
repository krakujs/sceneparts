import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld two-way radio: a chunky body with a speaker grille, a small screen, a keypad, a side talk button
// and a telescoping antenna. Origin = bottom of the body, centred on x. anim "talk" presses the talk button
// and sends sound arcs out of the grille.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const HOLES = [-50, -17, 17, 50];
const ROWS = [-355, -325, -295, -265];
const KEYS = [-46, 0, 46];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const talking = anim === "talk";
  const press = talking && f % 40 < 20 ? 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={10} fill={C.shadow} />
      <g transform={motion(anim === "talk" ? "" : anim, f)}>
        {/* antenna */}
        <rect x={46} y={-640} width={18} height={230} rx={9} fill={C.inkSoft} />
        <circle cx={55} cy={-644} r={10} fill={C.ink} />
        {/* body */}
        <rect x={-100} y={-430} width={200} height={410} rx={54} fill={body} />
        <rect x={-100} y={-70} width={200} height={50} rx={24} fill={shade(body, 0.2)} />
        <rect x={-74} y={-446} width={100} height={26} rx={10} fill={C.inkSoft} />
        <circle cx={-44} cy={-446} r={16} fill={C.greyDark} />
        {/* talk button on the side */}
        <rect x={96} y={-330 + press} width={30} height={60} rx={10} fill={C.inkSoft} />
        {/* speaker grille */}
        <rect x={-80} y={-380} width={160} height={130} rx={22} fill={shade(body, 0.25)} />
        {ROWS.map((yy) => HOLES.map((xx) => <circle key={`${xx}${yy}`} cx={xx} cy={yy + 30} r={6} fill={C.ink} />))}
        {/* screen and LED */}
        <circle cx={58} cy={-240} r={6} fill={C.green} />
        <rect x={-62} y={-228} width={124} height={60} rx={12} fill={C.navy} />
        <rect x={-40} y={-200} width={14} height={20} rx={3} fill={C.teal} />
        <rect x={-18} y={-208} width={14} height={28} rx={3} fill={C.teal} />
        <rect x={4} y={-214} width={14} height={34} rx={3} fill={C.teal} />
        <rect x={26} y={-198} width={14} height={18} rx={3} fill={C.greyLight} />
        {/* keypad */}
        {KEYS.map((kx) => (
          <g key={kx}>
            <circle cx={kx} cy={-146} r={13} fill={C.greyDark} />
            <circle cx={kx} cy={-108} r={13} fill={C.greyDark} />
          </g>
        ))}
        <rect x={-46} y={-86} width={92} height={16} rx={8} fill={shade(body, 0.25)} />
        {/* talk waves on the left of the grille */}
        {talking &&
          [0, 1, 2].map((i) => {
            const r = 70 + i * 34;
            const op = 0.3 + 0.7 * (Math.sin((f * 2 * Math.PI) / 20 - i * 1.1) > 0 ? 1 : 0.2);
            const a = (45 * Math.PI) / 180;
            const d = `M ${f1(-100 - r * Math.cos(a) + 0)} ${f1(-315 - r * Math.sin(a))} A ${r} ${r} 0 0 0 ${f1(-100 - r * Math.cos(a))} ${f1(-315 + r * Math.sin(a))}`;
            return <path key={i} d={d} fill="none" stroke={C.ink} strokeWidth={12} strokeLinecap="round" opacity={op} />;
          })}
      </g>
    </g>
  );
}
