import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of five-fingered gloves side by side, with ribbed cuffs. Origin = bottom centre (y).
// About 580 px wide and 420 px tall at s = 1. anim "bob": the pair bobs gently up and down.
const f1 = (v: number) => v.toFixed(1);

// One glove, thumb on the outside, fingers up, cuff resting on y = 0 at its origin.
const Glove = ({ c, c2 }: { c: string; c2: string }) => (
  <g>
    <rect x={-78} y={-290} width={156} height={230} rx={44} fill={c} />
    <rect x={-74} y={-400} width={36} height={150} rx={18} fill={c} />
    <rect x={-36} y={-430} width={36} height={170} rx={18} fill={c} />
    <rect x={2} y={-412} width={36} height={160} rx={18} fill={c} />
    <rect x={40} y={-350} width={32} height={120} rx={16} fill={c} />
    {[-38, 0, 38].map((sx) => <rect key={sx} x={sx - 2} y={-300} width={4} height={60} rx={2} fill={shade(c, 0.25)} opacity={0.7} />)}
    <rect x={-122} y={-268} width={44} height={120} rx={22} fill={c} transform="rotate(-28 -78 -230)" />
    <rect x={40} y={-290} width={38} height={230} rx={20} fill={shade(c, 0.18)} opacity={0.55} />
    <rect x={-92} y={-70} width={184} height={70} rx={18} fill={c2} />
    {[-60, -30, 0, 30, 60].map((rx) => <rect key={rx} x={rx - 3} y={-62} width={6} height={54} rx={3} fill={shade(c2, 0.2)} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 0.9, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * 2 * Math.PI) / 50)) * 14 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={290} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        <g transform="translate(-130 0)"><Glove c={c} c2={c2} /></g>
        <g transform="translate(130 0) scale(-1 1)"><Glove c={c} c2={c2} /></g>
      </g>
    </g>
  );
}
