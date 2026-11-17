import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mantel clock: round face on an arched wooden case. Origin = centre of the plinth on the floor.
// anim "tick": the second hand jumps once a second and the hands move with the frame.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const tick = anim === "tick";
  const hourA = 300 + (tick ? f * 0.008 : 0);
  const minA = 60 + (tick ? f * 0.1 : 0);
  const secA = tick ? Math.floor(f / 30) * 6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <circle cx={0} cy={-398} r={14} fill={shade(wood, 0.2)} />
        <path d="M -140 -40 V -250 A 140 140 0 0 1 140 -250 V -40 Z" fill={wood} />
        <path d="M 60 -376.5 A 140 140 0 0 1 140 -250 V -40 H 60 Z" fill={shade(wood, 0.2)} />
        <rect x={-160} y={-40} width={320} height={40} rx={10} fill={shade(wood, 0.25)} />
        <circle cx={0} cy={-240} r={108} fill={C.white} />
        <circle cx={0} cy={-240} r={100} fill={C.paper} />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`translate(0 -240) rotate(${i * 30})`}>
            <rect x={-3.5} y={-98} width={7} height={i % 3 === 0 ? 16 : 9} rx={2} fill={C.ink} />
          </g>
        ))}
        <g transform={`translate(0 -240) rotate(${f1(hourA)})`}>
          <line x1={0} y1={8} x2={0} y2={-56} stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
        </g>
        <g transform={`translate(0 -240) rotate(${f1(minA)})`}>
          <line x1={0} y1={8} x2={0} y2={-84} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        </g>
        <g transform={`translate(0 -240) rotate(${f1(secA)})`}>
          <line x1={0} y1={14} x2={0} y2={-90} stroke={C.red} strokeWidth={3} strokeLinecap="round" />
        </g>
        <circle cx={0} cy={-240} r={9} fill={C.ink} />
      </g>
    </g>
  );
}
