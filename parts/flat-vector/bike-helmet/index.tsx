import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A cycling helmet in side view, facing right: a rounded aerodynamic shell with dark vent slots, a short visor peak at
// the front, a dark inner foam rim along the opening, and two chin straps meeting at a buckle.
// Origin = bottom centre of the shell's rear base (sits on y); the chin straps hang below it.
// About 520 px wide and 290 px tall (shell) at s = 1.
// anim "bob": the helmet bobs gently.
const f1 = (v: number) => v.toFixed(1);

const SHELL = "M -200 -200 C -236 -300 -170 -420 -20 -420 C 120 -420 214 -346 216 -270 C 218 -240 206 -222 176 -218 L -150 -196 C -186 -194 -200 -198 -200 -200 Z";
const VENTS: [number, number, number, number][] = [[-120, -340, -86, -372], [-50, -398, -6, -400], [30, -398, 74, -392], [110, -358, 140, -326]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 36)) * 8 : 0;
  const strap = C.ink;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(200 + bob)})`}>
        {/* chin straps hanging from the shell, meeting at a buckle */}
        <path d="M 20 -200 C 40 -170 70 -150 62 -112" fill="none" stroke={strap} strokeWidth={22} strokeLinecap="round" />
        <path d="M 130 -222 C 128 -180 100 -150 74 -112" fill="none" stroke={strap} strokeWidth={22} strokeLinecap="round" />
        <path d="M 68 -110 L 68 -62" fill="none" stroke={strap} strokeWidth={20} strokeLinecap="round" />
        <rect x={46} y={-128} width={44} height={32} rx={8} fill={C.yellow} />
        <rect x={58} y={-118} width={20} height={12} rx={3} fill={shade(C.yellow, 0.45)} />
        {/* shell, with a darker rear half for depth */}
        <path d={SHELL} fill={col} />
        <path d="M -200 -200 C -236 -300 -170 -420 -20 -420 C -110 -400 -150 -320 -150 -220 Z" fill={shade(col, 0.18)} />
        {/* highlight along the crown */}
        <path d="M -70 -392 Q 0 -410 80 -390" fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.35} />
        {/* vent slots */}
        {VENTS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={shade(col, 0.55)} strokeWidth={16} strokeLinecap="round" />
        ))}
        {/* visor peak at the front */}
        <path d="M 160 -292 C 220 -286 268 -266 292 -238 C 300 -226 288 -216 270 -220 C 236 -226 200 -226 168 -226 Z" fill={shade(col, 0.35)} />
        {/* dark inner foam rim along the opening */}
        <path d="M -188 -206 L 168 -226" fill="none" stroke={C.inkSoft} strokeWidth={16} strokeLinecap="round" />
      </g>
    </g>
  );
}
