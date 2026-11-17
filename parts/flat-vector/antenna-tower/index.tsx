import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lattice radio / cell tower: tapered legs with X braces, antenna panels on arms, a mast and a blinking red top light.
// Room scale (about 1030 px tall). Origin = centre of the foundation on the ground.
// anim "blink": the red warning light flashes.
const f1 = (v: number) => v.toFixed(1);
const H = 900;
const hw = (h: number) => 150 - (125 * h) / H;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 0.8)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const on = anim !== "blink" || Math.sin((f * 2 * Math.PI) / 60) > 0;
  const panels: Array<[number, number]> = [[-300, -1], [-550, 1], [-760, -1]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-180} y={-24} width={360} height={24} rx={6} fill={C.greyDark} />
        <line x1={-150} y1={0} x2={-25} y2={-H} stroke={body} strokeWidth={16} strokeLinecap="round" />
        <line x1={150} y1={0} x2={25} y2={-H} stroke={body} strokeWidth={16} strokeLinecap="round" />
        {Array.from({ length: 9 }, (_, i) => {
          const y0 = -i * 100, y1 = -(i + 1) * 100;
          const a0 = hw(i * 100), a1 = hw((i + 1) * 100);
          return (
            <g key={i} stroke={body} strokeWidth={9} strokeLinecap="round">
              <line x1={-a1} y1={y1} x2={a1} y2={y1} />
              <line x1={-a0} y1={y0} x2={a1} y2={y1} />
              <line x1={a0} y1={y0} x2={-a1} y2={y1} />
            </g>
          );
        })}
        {panels.map(([py, side], i) => {
          const h = hw(-py);
          const cx = side * (h + 40);
          return (
            <g key={i}>
              <rect x={side > 0 ? h : -(h + 14)} y={py - 4} width={14} height={8} fill={body} />
              <rect x={cx - 26} y={py - 46} width={52} height={92} rx={6} fill={C.white} />
              <rect x={cx - 26} y={py + 14} width={52} height={32} rx={6} fill={C.greyLight} />
              <rect x={cx - 18} y={py - 38} width={10} height={6} rx={3} fill={C.grey} />
            </g>
          );
        })}
        <rect x={-8} y={-H - 100} width={16} height={100} rx={4} fill={body} />
        <circle cx={0} cy={-H - 112} r={34} fill={C.red} opacity={on ? 0.35 : 0} />
        <circle cx={0} cy={-H - 112} r={12} fill={on ? C.red : C.redDark} />
      </g>
    </g>
  );
}
