import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Candle holder: three-arm candelabra with three lit candles (tall centre, two shorter side ones).
// anim "flicker" makes the three flames dance out of step. Origin = base centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flamePath = (w: number, h: number) => `M ${f1(-w / 2)} 0 C ${f1(-w / 2)} ${f1(-h * 0.4)} ${f1(-w * 0.1)} ${f1(-h * 0.55)} 0 ${f1(-h)} C ${f1(w * 0.1)} ${f1(-h * 0.55)} ${f1(w / 2)} ${f1(-h * 0.4)} ${f1(w / 2)} 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.yellowDark;
  const wax = p.color2 && p.color2 !== "none" ? p.color2 : C.paper;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  // [x, base y, candle height, flame phase]
  const candles: [number, number, number, number][] = [[0, -330, 130, 0], [-150, -300, 110, 2.1], [150, -300, 110, 4.2]];
  const flame = (i: number) => ({
    rot: flicker ? 3 * Math.sin(f * 1.1 + i) : 0,
    sx: flicker ? 1 + 0.05 * Math.sin(f * 1.7 + i * 2) : 1,
    sy: flicker ? 1 + 0.08 * Math.sin(f * 2.3 + i * 1.3) : 1,
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-12} rx={150} ry={12} fill={metal} />
        <path d="M -70 -22 Q -20 -60 -14 -110 L 14 -110 Q 20 -60 70 -22 Z" fill={metal} />
        <rect x={-12} y={-330} width={24} height={230} rx={8} fill={metal} />
        <circle cx={0} cy={-190} r={20} fill={shade(metal, 0.12)} />
        <path d="M 0 -240 C -40 -240 -120 -260 -150 -300" fill="none" stroke={metal} strokeWidth={16} strokeLinecap="round" />
        <path d="M 0 -240 C 40 -240 120 -260 150 -300" fill="none" stroke={metal} strokeWidth={16} strokeLinecap="round" />
        {candles.map(([cx, by, h, ph], i) => {
          const fl = flame(i + ph);
          return (
            <g key={i}>
              <ellipse cx={cx} cy={by} rx={30} ry={10} fill={metal} />
              <rect x={cx - 17} y={by - h} width={34} height={h} rx={5} fill={wax} />
              <rect x={cx + 6} y={by - h} width={11} height={h} rx={4} fill={shade(wax, 0.18)} />
              <g transform={`translate(${f1(cx)} ${f1(by - h)}) rotate(${f1(fl.rot)}) scale(${f1(fl.sx)} ${f1(fl.sy)})`}>
                <path d={flamePath(34, 74)} fill={C.orange} />
                <path d={flamePath(18, 42)} fill={C.yellow} />
              </g>
            </g>
          );
        })}
      </g>
    </g>
  );
}
