import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A small pile of glass marbles: solid colour balls, one shade for depth, a highlight, and a swirl
// inside some of them. Origin = bottom centre. About 380 px wide, 200 px tall at s = 1.
// anim "roll": the front marble rolls forward and the others turn as it goes.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.blue;
  const c2 = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const anim: string = p.anim ?? "none";
  const rollT = anim === "roll" ? Math.min(1, Math.max(0, (f - 10) / 40)) : 0;
  const rollX = rollT * 120;
  const turn = anim === "roll" ? f * 6 : 0;
  // Marbles: [cx, cy, radius, colour, swirl]
  const ballPts: [number, number, number, string, boolean][] = [
    [-130, -80, 80, C.green, true],
    [0, -90, 90, c1, true],
    [130, -80, 80, C.yellow, false],
    [-62, -168, 62, c2, false],
    [70, -160, 58, C.purple, true],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {ballPts.map(([cx, cy, r, col, swirl], i) => {
          // The front marble (index 1) rolls forward; others turn in place.
          const isRoller = anim === "roll" && i === 1;
          const dx = isRoller ? rollX : 0;
          const rot = anim === "roll" ? turn * (i % 2 ? 1 : -1) : 0;
          return (
            <g key={i} transform={`translate(${f1(cx + dx)} ${f1(cy)})`}>
              <circle cx={0} cy={0} r={r} fill={shade(col, 0.28)} />
              <circle cx={0} cy={-r * 0.06} r={r * 0.92} fill={col} />
              {swirl && (
                <g transform={`rotate(${f1(rot)})`}>
                  <path d={`M ${f1(-r * 0.6)} 0 Q 0 ${f1(-r * 0.6)} ${f1(r * 0.6)} 0 Q 0 ${f1(r * 0.6)} ${f1(-r * 0.6)} 0 Z`} fill={C.white} opacity={0.5} />
                </g>
              )}
              <ellipse cx={f1(-r * 0.36)} cy={f1(-r * 0.46)} rx={f1(r * 0.22)} ry={f1(r * 0.14)} fill={C.white} opacity={0.75} transform="rotate(-30)" />
            </g>
          );
        })}
      </g>
    </g>
  );
}
