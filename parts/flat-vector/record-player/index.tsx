import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Record player: turntable with a platter, a record on it and a tone arm. Origin = bottom centre of the plinth.
// anim "spin": the record turns on the platter and the arm sways slightly.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? (f * 4) % 360 : 0;
  const sway = anim === "spin" ? 2 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const cy = -250;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={14} fill={C.shadow} />
      <g transform={motion(anim === "spin" ? "none" : anim, f)}>
        {/* plinth */}
        <rect x={-300} y={-60} width={600} height={60} rx={14} fill={shade(body, 0.3)} />
        <rect x={-300} y={-300} width={600} height={250} rx={24} fill={body} />
        <path d="M -260 -280 Q -100 -300 200 -282" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.25} />
        {/* feet */}
        <circle cx={-260} cy={-62} r={10} fill={C.ink} />
        <circle cx={260} cy={-62} r={10} fill={C.ink} />
        {/* platter with record */}
        <ellipse cx={-30} cy={cy + 30} rx={210} ry={22} fill={shade(body, 0.4)} opacity={0.6} />
        <circle cx={-30} cy={cy} r={200} fill={C.greyDark} />
        <g transform={`translate(-30 ${cy}) rotate(${f1(spin)})`}>
          <circle cx={0} cy={0} r={180} fill={C.ink} />
          {[160, 135, 110].map((r) => <circle key={r} cx={0} cy={0} r={r} fill="none" stroke={C.inkSoft} strokeWidth={3} />)}
          <circle cx={0} cy={0} r={58} fill={C.yellow} />
          <rect x={-30} y={-8} width={60} height={10} rx={5} fill={C.white} opacity={0.7} />
          <circle cx={0} cy={0} r={8} fill={C.ink} />
          <path d="M -120 -60 A 140 140 0 0 1 -60 -120" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.15} />
        </g>
        {/* spindle */}
        <circle cx={-30} cy={cy} r={6} fill={C.greyLight} />
        {/* tone arm, resting on the arm rest and swaying with the spin */}
        <g transform={`rotate(${f1(sway)} 220 ${-230})`}>
          <circle cx={220} cy={-230} r={28} fill={C.greyLight} />
          <path d="M 220 -230 L 110 -150" stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" />
          <rect x={80} y={-166} width={44} height={28} rx={8} fill={C.greyDark} transform="rotate(-30 102 -152)" />
        </g>
        {/* power and speed controls */}
        <circle cx={230} cy={-120} r={12} fill={C.green} />
        <rect x={180} y={-130} width={30} height={20} rx={6} fill={shade(body, 0.4)} />
      </g>
    </g>
  );
}
