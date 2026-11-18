import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Violin standing upright, with a bow lying diagonally beside it. Origin = bottom centre of the body.
// Figure-eight body, neck with fingerboard, scroll, f-holes, bridge, tailpiece and four strings.
// anim "play": the bow slides across the strings and the strings tremble.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};
const bodyPath = (H: number, Wu: number, Ww: number, Wl: number) =>
  `M 0 0 C ${f1(Wu * 0.7)} 0 ${f1(Wu)} ${f1(H * 0.1)} ${f1(Wu)} ${f1(H * 0.22)} C ${f1(Wu)} ${f1(H * 0.3)} ${f1(Ww * 1.05)} ${f1(H * 0.38)} ${f1(Ww)} ${f1(H * 0.45)} C ${f1(Ww * 1.05)} ${f1(H * 0.52)} ${f1(Wl)} ${f1(H * 0.62)} ${f1(Wl)} ${f1(H * 0.78)} C ${f1(Wl)} ${f1(H * 0.9)} ${f1(Wl * 0.55)} ${f1(H)} 0 ${f1(H)} C ${f1(-Wl * 0.55)} ${f1(H)} ${f1(-Wl)} ${f1(H * 0.9)} ${f1(-Wl)} ${f1(H * 0.78)} C ${f1(-Wl)} ${f1(H * 0.62)} ${f1(-Ww * 1.05)} ${f1(H * 0.52)} ${f1(-Ww)} ${f1(H * 0.45)} C ${f1(-Ww * 1.05)} ${f1(H * 0.38)} ${f1(-Wu)} ${f1(H * 0.3)} ${f1(-Wu)} ${f1(H * 0.22)} C ${f1(-Wu)} ${f1(H * 0.1)} ${f1(-Wu * 0.7)} 0 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 480, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#B0622E";
  const dark = p.accent && p.accent !== "none" ? p.accent : C.brownDark;
  const anim: string = p.anim ?? "none";
  const H = 330; // body height; body top at -H, bottom at 0
  // Bow: slides across the strings (left-right) when playing; it lies on the right, tilted.
  const slide = anim === "play" ? Math.sin((f * 2 * Math.PI) / 60) * 40 : 0;
  const tremble = anim === "play" ? Math.sin((f * 2 * Math.PI) / 6) * 1.2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* bow on the right, tip at the bottom, frog near the lower body */}
        <g transform={`translate(${f1(slide)} 0)`}>
          <line x1={250} y1={-40} x2={380} y2={-520} stroke={dark} strokeWidth={9} strokeLinecap="round" />
          <line x1={262} y1={-44} x2={370} y2={-500} stroke={C.white} strokeWidth={2.5} opacity={0.8} />
          <rect x={240} y={-62} width={24} height={26} rx={5} fill={C.ink} />
          <circle cx={380} cy={-520} r={9} fill={dark} />
        </g>
        {/* body */}
        <g transform={`translate(0 ${f1(-H)})`}>
          <path d={bodyPath(H, 78, 50, 98)} fill={wood} />
          {/* lower shade along the bottom */}
          <path d={`M -96 ${H * 0.78} Q 0 ${H + 4} 96 ${H * 0.78} Q 0 ${H * 0.92} -96 ${H * 0.78} Z`} fill={shade(wood, 0.2)} />
          {/* f-holes */}
          <path d={`M -28 ${H * 0.5} Q -40 ${H * 0.6} -26 ${H * 0.72} M 28 ${H * 0.5} Q 40 ${H * 0.6} 26 ${H * 0.72}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          {/* bridge */}
          <rect x={-30} y={H * 0.58} width={60} height={12} rx={4} fill={C.brown} />
          {/* tailpiece */}
          <rect x={-16} y={H - 40} width={32} height={18} rx={5} fill={C.greyDark} />
        </g>
        {/* neck, fingerboard and scroll */}
        <rect x={-14} y={-H - 170} width={28} height={190} rx={6} fill={dark} />
        <rect x={-10} y={-H - 170} width={20} height={150} rx={4} fill={C.ink} />
        <circle cx={0} cy={-H - 190} r={22} fill={dark} />
        <circle cx={0} cy={-H - 190} r={12} fill={C.ink} />
        <rect x={-10} y={-H - 10} width={20} height={14} rx={3} fill={C.ink} />
        {/* strings from tailpiece to scroll, trembling when played */}
        {[-9, -3, 3, 9].map((sx, i) => (
          <path key={i} d={`M ${sx * 1.4} ${-40} Q ${f1(sx * 1.4 + tremble * (i % 2 ? 1 : -1))} ${f1(-H - 90)} ${sx} ${-H - 160}`} fill="none" stroke={C.greyLight} strokeWidth={1.6} />
        ))}
      </g>
    </g>
  );
}
