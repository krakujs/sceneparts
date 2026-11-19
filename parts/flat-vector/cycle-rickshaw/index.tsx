import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cycle rickshaw, side view, facing right: a bicycle at the front (pedals and wheel turn when driving) and a
// covered two-seat passenger carriage behind it, on its own wheels, with a canopy roof and side pillars.
// Room scale: about 820 px wide and 560 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={C.ink} strokeWidth={16} />
    <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={rim} strokeWidth={4} opacity={0.6} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <line key={k} x1={cx} y1={cy} x2={cx} y2={cy - r + 14} stroke={rim} strokeWidth={3}
          transform={`rotate(${k * 45} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={9} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const canopy = p.color && p.color !== "none" ? p.color : C.pink;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const tube = (d: string, w = 16) => <path d={d} fill="none" stroke={frame} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  // bicycle at the front: wheel centre (250, -110)
  const bf = [250, -110], bbk = [60, -110], seatTop = [120, -300], head = [300, -290];
  const crank = (driving ? f * 9 : 0) * Math.PI / 180;
  const cl = 40;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* carriage wheels (behind, then in front) */}
          {wheel(-330, -95, 95, frame, spin)}
          {wheel(-250, -95, 95, frame, spin)}
          {/* carriage chassis and drawbar to the bicycle */}
          <rect x={-420} y={-200} width={400} height={30} rx={10} fill={frame} />
          {tube(`M 30 -200 L ${bbk[0]} ${bbk[1]}`, 16)}
          {/* covered carriage: pillars, roof canopy, two seats */}
          <rect x={-410} y={-470} width={14} height={280} rx={6} fill={frame} />
          <rect x={-20} y={-470} width={14} height={280} rx={6} fill={frame} />
          <path d="M -440 -480 L -10 -480 Q 14 -480 8 -450 L -20 -380 L -420 -380 L -440 -440 Z" fill={canopy} />
          <rect x={-440} y={-480} width={430} height={20} rx={10} fill={shade(canopy, 0.15)} />
          <rect x={-400} y={-300} width={360} height={28} rx={10} fill={C.brown} />
          <rect x={-400} y={-340} width={360} height={46} rx={14} fill={shade(C.brown, 0.1)} opacity={0.5} />
          {/* rear light */}
          <rect x={-456} y={-300} width={16} height={36} rx={6} fill={C.red} />
          {/* bicycle wheel and frame */}
          {wheel(bf[0], bf[1], 110, frame, spin)}
          {tube(`M ${bbk[0]} ${bbk[1]} L ${seatTop[0]} ${seatTop[1]} L ${head[0]} ${head[1]} L ${bbk[0]} ${bbk[1]}`, 18)}
          {tube(`M ${seatTop[0]} ${seatTop[1]} L ${head[0]} ${head[1]}`, 18)}
          {tube(`M ${head[0]} ${head[1]} L ${bf[0]} ${bf[1]}`, 16)}
          <rect x={seatTop[0] - 30} y={seatTop[1] - 22} width={60} height={22} rx={10} fill={C.ink} />
          {/* handlebar and chain ring with pedals */}
          {tube(`M ${head[0]} ${head[1]} L ${head[0] + 6} ${head[1] - 56}`, 14)}
          {tube(`M ${head[0] + 6} ${head[1] - 56} L ${head[0] + 40} ${head[1] - 64}`, 12)}
          <circle cx={bbk[0]} cy={bbk[1]} r={30} fill="none" stroke={C.greyLight} strokeWidth={8} />
          <line x1={bbk[0]} y1={bbk[1]} x2={bbk[0] + Math.cos(crank) * cl} y2={bbk[1] + Math.sin(crank) * cl} stroke={C.greyLight} strokeWidth={10} strokeLinecap="round" />
          <line x1={bbk[0]} y1={bbk[1]} x2={bbk[0] - Math.cos(crank) * cl} y2={bbk[1] - Math.sin(crank) * cl} stroke={C.greyLight} strokeWidth={10} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
