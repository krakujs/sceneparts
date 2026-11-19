import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A pair of maracas: two gourd-shaped heads on wooden handles, with a dot pattern.
// Origin = bottom centre, between the two handle ends. anim "shake" rattles them out of step.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const DOTS: [number, number][] = [[-30, -40], [30, -40], [0, 0], [-40, 40], [40, 40], [0, 75]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const left = p.color && p.color !== "none" ? p.color : C.yellow;
  const right = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const anim: string = p.anim ?? "none";
  const sh = anim === "shake" ? Math.sin((f * 2 * Math.PI) / 16) : 0;
  const shB = anim === "shake" ? Math.sin((f * 2 * Math.PI) / 16 + Math.PI) : 0;
  const one = (cx: number, col: number, colour: string, k: number) => (
    <g transform={`translate(${cx} 0) rotate(${f1(k * (anim === "shake" ? (col < 0 ? sh : shB) * 9 : 0))}) translate(${-cx} 0)`}>
      <g transform={`translate(${cx} ${f1(anim === "shake" ? (col < 0 ? sh : shB) * -10 : 0)})`}>
        {/* handle */}
        <rect x={cx - 22} y={-200} width={44} height={200} rx={20} fill={C.brownDark} />
        <rect x={cx - 22} y={-200} width={44} height={200} rx={20} fill={C.brown} opacity={0.6} transform={`translate(-6 0)`} />
        {/* head: gourd shape */}
        <ellipse cx={cx} cy={-300} rx={105} ry={122} fill={colour} />
        <rect x={cx - 105} y={-330} width={210} height={60} fill={shade(colour, 0.12)} opacity={0.5} />
        {DOTS.map(([dx, dy], i) => (
          <circle key={i} cx={cx + dx * 1.2} cy={-300 + dy * 1.05} r={11} fill={i % 2 ? C.ink : shade(colour, 0.35)} />
        ))}
        {/* seam where the head meets the handle */}
        <rect x={cx - 40} y={-186} width={80} height={14} rx={7} fill={shade(colour, 0.3)} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {one(-130, -1, left, -1)}
        {one(130, 1, right, 1)}
      </g>
    </g>
  );
}
