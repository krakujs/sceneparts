import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// 1950s tabletop radio: a wooden cabinet with an arched top, a cloth speaker grille, a round dial window
// with a red needle, two knobs and small feet. Origin = bottom centre. anim "tune" swings the dial needle.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const WEAVE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const cloth = p.cloth && p.cloth !== "none" ? p.cloth : C.sand;
  const anim: string = p.anim ?? "none";
  const sweep = anim === "tune" ? 50 * Math.sin((f * 2 * Math.PI) / 90) : 12;
  const dial = { x: 110, y: -190 };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "tune" ? "" : anim, f)}>
        <rect x={-190} y={0} width={24} height={14} rx={5} fill={C.brownDark} />
        <rect x={166} y={0} width={24} height={14} rx={5} fill={C.brownDark} />
        {/* arched wooden cabinet */}
        <path d="M -200 0 V -250 A 200 110 0 0 1 200 -250 V 0 Z" fill={wood} />
        <path d="M -186 -8 V -250 A 186 98 0 0 1 186 -250 V -8 Z" fill="none" stroke={shade(wood, 0.3)} strokeWidth={6} />
        <path d="M -150 -120 H 150" stroke={shade(wood, 0.15)} strokeWidth={4} opacity={0.5} />
        <path d="M -170 -300 Q -110 -330 -40 -336" fill="none" stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.15} />
        {/* cloth grille */}
        <rect x={-170} y={-230} width={200} height={180} rx={14} fill={cloth} />
        {WEAVE.map((i) => (
          <line key={`w${i}`} x1={-170} y1={-220 + i * 16} x2={30} y2={-220 + i * 16} stroke={shade(cloth, 0.2)} strokeWidth={2} />
        ))}
        {/* dial window */}
        <circle cx={dial.x} cy={dial.y} r={60} fill={shade(wood, 0.3)} />
        <circle cx={dial.x} cy={dial.y} r={52} fill={C.paper} />
        <circle cx={dial.x} cy={dial.y} r={42} fill={C.yellow} opacity={0.25} />
        {Array.from({ length: 9 }, (_, i) => {
          const a = ((i - 4) * 18 * Math.PI) / 180;
          return <line key={`t${i}`} x1={dial.x + Math.sin(a) * 36} y1={dial.y - Math.cos(a) * 36} x2={dial.x + Math.sin(a) * 46} y2={dial.y - Math.cos(a) * 46} stroke={C.inkSoft} strokeWidth={3} />;
        })}
        <line x1={dial.x} y1={dial.y} x2={dial.x} y2={dial.y - 44} stroke={C.red} strokeWidth={4} strokeLinecap="round" transform={`rotate(${f1(sweep)} ${dial.x} ${dial.y})`} />
        <circle cx={dial.x} cy={dial.y} r={6} fill={C.red} />
        {/* knobs */}
        <circle cx={70} cy={-90} r={22} fill={C.ink} />
        <line x1={70} y1={-90} x2={70} y2={-106} stroke={C.white} strokeWidth={4} strokeLinecap="round" />
        <circle cx={150} cy={-90} r={22} fill={C.ink} />
        <line x1={150} y1={-90} x2={150} y2={-106} stroke={C.white} strokeWidth={4} strokeLinecap="round" />
        <circle cx={110} cy={-40} r={8} fill={C.greyDark} />
      </g>
    </g>
  );
}
