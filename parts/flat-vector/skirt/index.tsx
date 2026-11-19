import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pleated A-line skirt with a waistband, hung from a clip hanger by its waistband. Origin = bottom centre:
// the hem rests on y, the hook is the highest point. About 480 px wide and 690 px tall at s = 1.
// anim "sway": the skirt swings gently from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";
const PLEATS = [-180, -130, -80, -30, 20, 70, 120, 170];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.blue;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={250} ry={14} fill={C.shadow} />
      {/* clip hanger: hook, wooden bar and a grey clip that grips the waistband */}
      <path d="M 0 -600 L 0 -636 Q 0 -684 30 -684 Q 52 -684 46 -660" stroke={WOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <rect x={-150} y={-612} width={300} height={22} rx={11} fill={WOOD} />
      <g transform={`rotate(${f1(sw)} 0 -600)`}>
        <rect x={-22} y={-612} width={44} height={60} rx={8} fill={C.grey} />
        {/* skirt body: flaring from the waistband to the hem */}
        <path d="M -122 -500 L 122 -500 Q 160 -260 240 -10 Q 0 26 -240 -10 Q -160 -260 -122 -500 Z" fill={cloth} />
        <path d="M 60 -500 L 122 -500 Q 160 -260 240 -10 Q 150 2 120 -150 Q 100 -300 60 -500 Z" fill={shade(cloth, 0.15)} opacity={0.55} />
        {/* knife pleats */}
        {PLEATS.map((px) => <line key={px} x1={px * 0.6} y1={-492} x2={px * 1.15} y2={-20} stroke={shade(cloth, 0.22)} strokeWidth={6} strokeLinecap="round" opacity={0.7} />)}
        {/* hem band */}
        <path d="M -238 -10 Q 0 26 238 -10 L 234 -36 Q 0 0 -234 -36 Z" fill={shade(cloth, 0.12)} />
        {/* waistband with a button */}
        <rect x={-124} y={-540} width={248} height={44} rx={10} fill={trim} />
        <rect x={-124} y={-508} width={248} height={12} rx={6} fill={shade(trim, 0.15)} />
        <circle cx={0} cy={-518} r={12} fill={shade(trim, 0.3)} />
      </g>
    </g>
  );
}
