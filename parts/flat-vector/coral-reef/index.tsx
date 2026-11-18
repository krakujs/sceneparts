import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Coral reef vignette: sandy seabed with branch corals, a brain coral, sea fans and two small fish.
// Origin = centre of the seabed line. About 1000 px wide and 400 px tall at s = 1. anim sway rocks the corals and swims the fish.
const f1 = (v: number) => v.toFixed(1);
const SAND = "#EBCB8B", SAND_DK = "#D9B472", PINK = "#F27BA6", ORANGE = "#FF8A3D", PURPLE = "#9B6BD6", TEAL = "#1FA39A";
const BASE = -80; // corals grow from the sand line

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const sand = p.color && p.color !== "none" ? p.color : SAND;
  const anim: string = p.anim ?? "none";
  const sway = (i: number, amp: number) => (anim === "sway" ? amp * Math.sin((f * 2 * Math.PI) / 100 + i * 0.9) : 0);
  const fishX = (base: number, i: number) => base + (anim === "sway" ? 14 * Math.sin((f * 2 * Math.PI) / 120 + i) : 0);

  const branch = (cx: number, h: number, col: string, i: number) => (
    <g key={`b${i}`} transform={`rotate(${f1(sway(i, 2))} ${cx} ${BASE})`}>
      <path d={`M ${cx} ${BASE} L ${cx} ${BASE - h}`} stroke={col} strokeWidth={34} strokeLinecap="round" fill="none" />
      <path d={`M ${cx} ${BASE - h * 0.45} L ${cx - 70} ${BASE - h * 0.78}`} stroke={col} strokeWidth={26} strokeLinecap="round" fill="none" />
      <path d={`M ${cx} ${BASE - h * 0.6} L ${cx + 66} ${BASE - h * 0.86}`} stroke={col} strokeWidth={26} strokeLinecap="round" fill="none" />
      <path d={`M ${cx} ${BASE - h * 0.25} L ${cx + 48} ${BASE - h * 0.4}`} stroke={col} strokeWidth={22} strokeLinecap="round" fill="none" />
    </g>
  );
  const brain = (cx: number, col: string, i: number) => (
    <g key={`br${i}`} transform={`rotate(${f1(sway(i, 1.5))} ${cx} ${BASE})`}>
      <ellipse cx={cx} cy={BASE - 30} rx={92} ry={60} fill={col} />
      <path d={`M ${cx - 70} ${BASE - 40} Q ${cx - 40} ${BASE - 70} ${cx - 10} ${BASE - 44} Q ${cx + 20} ${BASE - 20} ${cx + 50} ${BASE - 54}`} stroke={shade(col, 0.25)} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M ${cx - 74} ${BASE - 10} Q ${cx - 30} ${BASE - 0} ${cx} ${BASE - 18} Q ${cx + 40} ${BASE - 32} ${cx + 80} ${BASE - 12}`} stroke={shade(col, 0.25)} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  );
  const fan = (cx: number, h: number, col: string, i: number) => {
    const cy = BASE - h;
    return (
      <g key={`f${i}`} transform={`rotate(${f1(sway(i, 3))} ${cx} ${BASE})`}>
        <path d={`M ${cx} ${BASE} L ${cx} ${cy}`} stroke={shade(col, 0.2)} strokeWidth={10} strokeLinecap="round" />
        <path d={`M ${cx - 120} ${cy} A 120 120 0 0 1 ${cx + 120} ${cy} Z`} fill={col} />
        {[-150, -120, -90, -60, -30].map((a) => (
          <line key={a} x1={cx} y1={cy} x2={f1(cx + 120 * Math.cos((a * Math.PI) / 180))} y2={f1(cy + 120 * Math.sin((a * Math.PI) / 180))} stroke={shade(col, 0.3)} strokeWidth={4} />
        ))}
      </g>
    );
  };
  const fish = (fx: number, fy: number, col: string, i: number) => (
    <g key={`fi${i}`} transform={`translate(${f1(fishX(fx, i))} ${fy}) scale(1.6)`}>
      <path d="M -40 0 L -94 -28 L -94 28 Z" fill={shade(col, 0.1)} />
      <ellipse cx={0} cy={0} rx={48} ry={26} fill={col} />
      <ellipse cx={-6} cy={-12} rx={28} ry={6} fill={C.white} opacity={0.3} />
      <circle cx={22} cy={-6} r={8} fill={C.white} />
      <circle cx={24} cy={-6} r={4} fill={C.ink} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={520} ry={14} fill={C.shadow} />
      <path d="M -520 0 L -520 -70 C -300 -120 300 -120 520 -70 L 520 0 Z" fill={sand} />
      <path d="M -520 -20 C -300 -50 300 -50 520 -20 L 520 0 L -520 0 Z" fill={SAND_DK} opacity={0.6} />
      {fish(-190, -390, ORANGE, 0)}
      {fish(170, -300, C.yellow, 1)}
      {branch(-330, 260, PINK, 0)}
      {brain(-120, ORANGE, 1)}
      {fan(40, 150, PURPLE, 2)}
      {branch(260, 300, TEAL, 3)}
      {fan(410, 120, C.pink, 4)}
    </g>
  );
}
