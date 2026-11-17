import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Quadcopter drone with four rotors, a gimbal camera underneath. It floats: x, y is the centre of the body.
// anim "hover" bobs the drone gently and spins the rotors with a blur disc.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const ROTORS: [number, number][] = [[-190, -86], [190, -86], [-190, 40], [190, 40]];
const R = 100; // rotor radius

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const hovering = anim === "hover";
  const th = (f * 2 * Math.PI) / 50;
  const bob = hovering ? -Math.sin(th) * 10 : 0;
  const tilt = hovering ? Math.sin(th) * 2 : 0;
  const pop = anim === "pop" ? easeOutBack(Math.min(1, Math.max(0, f / 20))) : 1;
  const wob = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 3 : 0;
  const spin = f * 0.9;
  const rotor = (cx: number, cy: number, i: number) => {
    if (!hovering) {
      return (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={R} ry={12} fill={C.greyLight} opacity={0.7} />
          <ellipse cx={cx} cy={cy} rx={R} ry={5} fill={C.ink} opacity={0.6} />
        </g>
      );
    }
    const a = spin + i * 0.6;
    return (
      <g key={i}>
        <ellipse cx={cx} cy={cy} rx={R + 4} ry={24} fill={C.greyLight} opacity={0.35} />
        <ellipse cx={cx} cy={cy} rx={Math.max(8, R * Math.abs(Math.cos(a)))} ry={9} fill={C.ink} opacity={0.85} />
        <ellipse cx={cx} cy={cy} rx={Math.max(8, R * Math.abs(Math.sin(a)))} ry={9} fill={C.inkSoft} opacity={0.6} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(tilt + wob)}) scale(${f1(pop)})`}>
        {/* arms */}
        {ROTORS.map(([rx, ry], i) => (
          <line key={`a${i}`} x1={0} y1={0} x2={rx} y2={ry} stroke={shade(body, 0.2)} strokeWidth={20} strokeLinecap="round" />
        ))}
        {/* rear rotors */}
        {rotor(ROTORS[0][0], ROTORS[0][1], 0)}
        {rotor(ROTORS[1][0], ROTORS[1][1], 1)}
        {/* body */}
        <rect x={-100} y={-30} width={200} height={60} rx={30} fill={body} />
        <rect x={-70} y={-40} width={140} height={14} rx={7} fill={shade(body, 0.2)} />
        <circle cx={-84} cy={0} r={6} fill={C.green} />
        <circle cx={84} cy={0} r={6} fill={C.red} />
        {/* gimbal camera */}
        <line x1={-60} y1={28} x2={-96} y2={84} stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" />
        <line x1={60} y1={28} x2={96} y2={84} stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" />
        <rect x={-14} y={26} width={28} height={20} fill={C.greyDark} />
        <circle cx={0} cy={64} r={38} fill={C.ink} />
        <circle cx={0} cy={64} r={27} fill={C.inkSoft} />
        <circle cx={0} cy={64} r={18} fill={C.navy} />
        <circle cx={-6} cy={58} r={6} fill={C.white} opacity={0.6} />
        {/* front rotors */}
        {rotor(ROTORS[2][0], ROTORS[2][1], 2)}
        {rotor(ROTORS[3][0], ROTORS[3][1], 3)}
        {ROTORS.map(([rx, ry], i) => (
          <circle key={`h${i}`} cx={rx} cy={ry} r={12} fill={C.ink} />
        ))}
        <rect x={-70} y={-24} width={140} height={6} rx={3} fill={C.white} opacity={0.2} />
      </g>
    </g>
  );
}
