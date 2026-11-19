import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Three cricket stumps with two bails resting in the grooves on top. Origin = bottom centre; the stumps stand on y.
// anim "knock" throws the bails up and away from frame 20 on, then they stay off.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const anim: string = p.anim ?? "none";
  const rot = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 1.5 : 0;
  const kk = anim === "knock" ? Math.min(1, Math.max(0, (f - 20) / 30)) : 0;
  const top = -380;
  const stumpX = [-48, 0, 48];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(rot)})`}>
      <ellipse cx={0} cy={0} rx={80} ry={9} fill={C.shadow} />
      {stumpX.map((sx) => (
        <g key={sx}>
          <rect x={sx - 17} y={top} width={34} height={380} rx={8} fill={wood} />
          <rect x={sx + 6} y={top + 8} width={11} height={364} rx={5} fill={shade(wood, 0.16)} />
        </g>
      ))}
      {/* bails, one over each pair of gaps */}
      <g transform={`translate(${f1(-24 - kk * 190)} ${f1(top - 6 - kk * 250)}) rotate(${f1(-kk * 200)} -24 0)`}>
        <rect x={-54} y={-7} width={60} height={14} rx={6} fill={C.ink} />
        <rect x={-54} y={3} width={60} height={4} rx={2} fill={C.greyDark} />
      </g>
      <g transform={`translate(${f1(24 + kk * 190)} ${f1(top - 6 - kk * 250)}) rotate(${f1(kk * 220)} 24 0)`}>
        <rect x={-6} y={-7} width={60} height={14} rx={6} fill={C.ink} />
        <rect x={-6} y={3} width={60} height={4} rx={2} fill={C.greyDark} />
      </g>
    </g>
  );
}
