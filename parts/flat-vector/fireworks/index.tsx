import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Fireworks: three bursts of radiating spark trails in different colours, centred on x, y.
// About 600 px wide and 560 px tall at s = 1. Each burst is a ring of trails that expands and fades.
// anim "burst": the bursts loop every 2 seconds, staggered. Frame 0 already shows bursts in progress.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const cols = [
    p.color && p.color !== "none" ? p.color : C.red,
    p.color2 && p.color2 !== "none" ? p.color2 : C.yellow,
    p.color3 && p.color3 !== "none" ? p.color3 : C.blue,
  ];
  const anim: string = p.anim ?? "none";
  const live = anim === "burst";
  const bursts = [
    { cx: 0, cy: 0, R: 250, n: 22, off: 0.1, col: cols },
    { cx: -250, cy: -170, R: 170, n: 16, off: 0.55, col: [cols[1], cols[2], cols[0]] },
    { cx: 240, cy: -210, R: 190, n: 18, off: 0.8, col: [cols[2], cols[0], cols[1]] },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {bursts.map((b, bi) => {
        const t = live ? (f / 60 + b.off) % 1 : 0.4 + bi * 0.12;
        const r = b.R * (1 - (1 - t) ** 2);
        const op = 1 - t * 0.85;
        return (
          <g key={bi} transform={`translate(${b.cx} ${b.cy})`} opacity={f1(op) as any}>
            {Array.from({ length: b.n }, (_, j) => {
              const a = (j * 2 * Math.PI) / b.n + b.off;
              const x0 = Math.cos(a) * r * 0.35, y0 = Math.sin(a) * r * 0.35;
              const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r;
              return (
                <g key={j}>
                  <line x1={f1(x0)} y1={f1(y0)} x2={f1(x1)} y2={f1(y1)} stroke={b.col[j % 3]} strokeWidth={7} strokeLinecap="round" />
                  <circle cx={f1(x1)} cy={f1(y1)} r={6} fill={C.white} opacity={0.9} />
                </g>
              );
            })}
            {t < 0.2 && <circle cx={0} cy={0} r={f1(60 * (1 - t / 0.2)) as any} fill={C.white} opacity={0.8} />}
          </g>
        );
      })}
    </g>
  );
}
