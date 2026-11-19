import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A little heap of wax crayons lying on the floor: each one a rounded body in its own colour with a pointed tip
// and a paper band near the back. Origin = bottom centre. Hero size: about 480 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);

// One crayon lying along x from tip (left) to back end (right). rot tilts it; x,y place its tip.
const Crayon = ({ x, y, rot, c }: { x: number; y: number; rot: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})`}>
    <path d="M 0 0 L 50 -24 L 240 -24 Q 260 -24 260 0 Q 260 24 240 24 L 50 24 Z" fill={c} />
    <path d="M 0 0 L 50 -24 L 50 24 Z" fill={shade(c, 0.12)} />
    <path d="M 0 0 L 22 -10 L 22 10 Z" fill={C.ink} opacity={0.6} />
    <rect x={170} y={-24} width={60} height={48} fill={C.white} opacity={0.9} />
    <path d="M 170 -24 L 170 24 M 230 -24 L 230 24" stroke={shade(c, 0.2)} strokeWidth={4} />
    <path d="M 60 -16 L 160 -16" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.3} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 3 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={240} ry={16} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        <Crayon x={-200} y={-14} rot={-4} c={C.red} />
        <Crayon x={-180} y={-50} rot={-2} c={C.orange} />
        <Crayon x={-150} y={-20} rot={5} c={C.green} />
        <Crayon x={-100} y={-70} rot={-10} c={C.blue} />
        <Crayon x={-30} y={-22} rot={-6} c={C.yellow} />
        <Crayon x={-40} y={-80} rot={6} c={C.purple} />
        <Crayon x={20} y={-120} rot={-14} c={C.pink} />
        <Crayon x={60} y={-150} rot={8} c={C.teal} />
        <g transform={`rotate(${f1(rock)} 0 -120)`}>
          <Crayon x={-120} y={-160} rot={-22} c={C.lime} />
        </g>
      </g>
    </g>
  );
}
