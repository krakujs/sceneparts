import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Eid decoration: a golden crescent moon with a star and two small hanging lanterns, hung from a cord.
// Origin = the top hook point (it hangs from y). About 360 px wide and 560 px tall at s = 1.
// anim "sway": the whole decoration swings on its cord and the lanterns trail behind.
const f1 = (v: number) => v.toFixed(1);
const star = (cx: number, cy: number, R: number, r: number) => {
  const pts: string[] = [];
  for (let k = 0; k < 10; k++) {
    const a = (-90 + k * 36) * (Math.PI / 180);
    const rad = k % 2 ? r : R;
    pts.push(`${f1(cx + Math.cos(a) * rad)} ${f1(cy + Math.sin(a) * rad)}`);
  }
  return `M ${pts.join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 240;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const lamp = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 5 : 0;
  const lag = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90 - 0.7) * 6 : 0;
  const lantern = (lx: number, top: number, col: string, id: string) => (
    <g key={id} transform={`translate(${f1(lx)} ${f1(top)}) rotate(${f1(lag)} 0 0)`}>
      <line x1={0} y1={-30} x2={0} y2={0} stroke={C.inkSoft} strokeWidth={4} />
      <rect x={-12} y={-6} width={24} height={10} rx={4} fill={shade(gold, 0.2)} />
      <rect x={-28} y={4} width={56} height={70} rx={14} fill={col} />
      <rect x={-28} y={4} width={56} height={70} rx={14} fill={C.white} opacity={0.18} />
      <rect x={-18} y={20} width={14} height={40} rx={6} fill={C.white} opacity={0.35} />
      <rect x={-14} y={74} width={28} height={8} rx={3} fill={shade(gold, 0.2)} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <line x1={0} y1={0} x2={0} y2={120} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
      <circle cx={0} cy={0} r={9} fill={C.inkSoft} />
      <g transform={`rotate(${f1(swing)} 0 0)`}>
        <defs>
          <mask id="eid-crescent-cut" maskUnits="userSpaceOnUse" x={-400} y={-100} width={900} height={900}>
            <rect x={-400} y={-100} width={900} height={900} fill="#FFFFFF" />
            <circle cx={60} cy={230} r={150} fill="#000000" />
          </mask>
        </defs>
        <g transform="translate(58 0)">
          {/* crescent: a circle with a second circle cut out of its upper right */}
          <circle cx={0} cy={280} r={170} fill={gold} mask="url(#eid-crescent-cut)" />
          <path d={star(150, 150, 46, 19)} fill={gold} stroke={shade(gold, 0.15)} strokeWidth={4} strokeLinejoin="round" />
          {/* lanterns on short strings */}
          <line x1={-120} y1={392} x2={-120} y2={420} stroke={C.inkSoft} strokeWidth={4} />
          <line x1={-10} y1={440} x2={-10} y2={470} stroke={C.inkSoft} strokeWidth={4} />
          {lantern(-120, 420, lamp, "a")}
          {lantern(-10, 470, C.yellowDark, "b")}
        </g>
      </g>
    </g>
  );
}
