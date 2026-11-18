import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Large cello standing upright on its endpin, with a bow leaning on the right. Origin = bottom centre
// (endpin on y). Body, neck with fingerboard, scroll, f-holes, bridge, tailpiece and four strings.
// Room-scale: about 810 px tall at s = 1. anim "play": the bow slides across the strings, strings tremble.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.2)})`;
  return "";
};
const bodyPath = (H: number, Wu: number, Ww: number, Wl: number) =>
  `M 0 0 C ${f1(Wu * 0.7)} 0 ${f1(Wu)} ${f1(H * 0.1)} ${f1(Wu)} ${f1(H * 0.22)} C ${f1(Wu)} ${f1(H * 0.3)} ${f1(Ww * 1.05)} ${f1(H * 0.38)} ${f1(Ww)} ${f1(H * 0.45)} C ${f1(Ww * 1.05)} ${f1(H * 0.52)} ${f1(Wl)} ${f1(H * 0.62)} ${f1(Wl)} ${f1(H * 0.78)} C ${f1(Wl)} ${f1(H * 0.9)} ${f1(Wl * 0.55)} ${f1(H)} 0 ${f1(H)} C ${f1(-Wl * 0.55)} ${f1(H)} ${f1(-Wl)} ${f1(H * 0.9)} ${f1(-Wl)} ${f1(H * 0.78)} C ${f1(-Wl)} ${f1(H * 0.62)} ${f1(-Ww * 1.05)} ${f1(H * 0.52)} ${f1(-Ww)} ${f1(H * 0.45)} C ${f1(-Ww * 1.05)} ${f1(H * 0.38)} ${f1(-Wu)} ${f1(H * 0.3)} ${f1(-Wu)} ${f1(H * 0.22)} C ${f1(-Wu)} ${f1(H * 0.1)} ${f1(-Wu * 0.7)} 0 0 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#B0622E";
  const dark = p.accent && p.accent !== "none" ? p.accent : C.brownDark;
  const anim: string = p.anim ?? "none";
  const H = 470, ENDPIN = 40;
  const BODY_BOTTOM = -ENDPIN, BODY_TOP = BODY_BOTTOM - H;
  const NECK_TOP = BODY_TOP - 260;
  const slide = anim === "play" ? Math.sin((f * 2 * Math.PI) / 70) * 50 : 0;
  const tremble = anim === "play" ? Math.sin((f * 2 * Math.PI) / 6) * 1.5 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* endpin */}
        <rect x={-6} y={-ENDPIN} width={12} height={ENDPIN} rx={4} fill={C.greyDark} />
        {/* bow leaning on the right, tip at the floor */}
        <g transform={`translate(${f1(slide)} 0)`}>
          <line x1={230} y1={-10} x2={400} y2={-640} stroke={dark} strokeWidth={10} strokeLinecap="round" />
          <line x1={244} y1={-14} x2={388} y2={-620} stroke={C.white} strokeWidth={2.5} opacity={0.8} />
          <rect x={218} y={-34} width={26} height={30} rx={5} fill={C.ink} />
          <circle cx={400} cy={-640} r={10} fill={dark} />
        </g>
        {/* body */}
        <g transform={`translate(0 ${f1(BODY_TOP)})`}>
          <path d={bodyPath(H, 100, 70, 128)} fill={wood} />
          <path d={`M -120 ${H * 0.8} Q 0 ${H + 6} 120 ${H * 0.8} Q 0 ${H * 0.92} -120 ${H * 0.8} Z`} fill={shade(wood, 0.2)} />
          {/* f-holes */}
          <path d={`M -36 ${H * 0.48} Q -50 ${H * 0.6} -34 ${H * 0.74} M 36 ${H * 0.48} Q 50 ${H * 0.6} 34 ${H * 0.74}`} fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
          {/* bridge and tailpiece */}
          <rect x={-40} y={H * 0.58} width={80} height={16} rx={5} fill={C.brown} />
          <rect x={-22} y={H - 44} width={44} height={22} rx={6} fill={C.greyDark} />
        </g>
        {/* neck, fingerboard, scroll */}
        <rect x={-18} y={NECK_TOP - 10} width={36} height={270} rx={7} fill={dark} />
        <rect x={-13} y={NECK_TOP - 10} width={26} height={230} rx={4} fill={C.ink} />
        <circle cx={0} cy={NECK_TOP - 30} r={28} fill={dark} />
        <circle cx={0} cy={NECK_TOP - 30} r={15} fill={C.ink} />
        {/* strings from the tailpiece up to the pegbox, trembling when played */}
        {[-12, -4, 4, 12].map((sx, i) => (
          <path key={i} d={`M ${sx * 1.6} ${BODY_BOTTOM - 44} Q ${f1(sx * 1.6 + tremble * (i % 2 ? 1 : -1))} ${f1(NECK_TOP - 80)} ${sx} ${NECK_TOP - 10}`} fill="none" stroke={C.greyLight} strokeWidth={2} />
        ))}
      </g>
    </g>
  );
}
