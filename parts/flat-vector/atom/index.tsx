import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Atom: a nucleus of protons and neutrons with three elliptical orbits and electrons. Centred on x, y.
// About 680 px wide and 360 px tall at s = 1. anim "orbit": the electrons travel round their orbits in a 120-frame loop.
const f1 = (v: number) => v.toFixed(1);
const ORBITS = [
  { a: 0, rx: 330, ry: 120, start: 0 },
  { a: 60, rx: 330, ry: 120, start: 2.1 },
  { a: 120, rx: 330, ry: 120, start: 4.2 },
];
const NUCLEUS: { x: number; y: number; r: number; k: 1 | 2 }[] = [
  { x: 0, y: 0, r: 40, k: 1 }, { x: -34, y: -22, r: 30, k: 2 }, { x: 30, y: -26, r: 30, k: 2 },
  { x: 26, y: 26, r: 30, k: 1 }, { x: -28, y: 26, r: 30, k: 1 }, { x: 0, y: -52, r: 26, k: 1 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const electron = p.color && p.color !== "none" ? p.color : C.yellow;
  const nucleus = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const step = anim === "orbit" ? (f * 2 * Math.PI) / 120 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {ORBITS.map((o, i) => (
        <ellipse key={i} cx={0} cy={0} rx={o.rx} ry={o.ry} transform={`rotate(${o.a})`} fill="none" stroke={C.navy} strokeWidth={12} opacity={0.35} />
      ))}
      <g transform="scale(1.3)">
        {NUCLEUS.map((n, i) => {
          const col = n.k === 1 ? nucleus : C.white;
          return (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.r} fill={shade(col, 0.22)} />
              <circle cx={n.x - n.r * 0.12} cy={n.y - n.r * 0.12} r={n.r * 0.86} fill={col} />
            </g>
          );
        })}
      </g>
      {ORBITS.map((o, i) => {
        const th = o.start + step * (i % 2 === 0 ? 1 : -1) * 1.0;
        const ex = o.rx * Math.cos(th), ey = o.ry * Math.sin(th);
        const rad = (o.a * Math.PI) / 180;
        const px = ex * Math.cos(rad) - ey * Math.sin(rad);
        const py = ex * Math.sin(rad) + ey * Math.cos(rad);
        return (
          <g key={`e${i}`}>
            <circle cx={f1(px)} cy={f1(py)} r={24} fill={shade(electron, 0.2)} />
            <circle cx={f1(px - 4)} cy={f1(py - 4)} r={19} fill={electron} />
            <circle cx={f1(px - 9)} cy={f1(py - 9)} r={6} fill={C.white} opacity={0.6} />
          </g>
        );
      })}
    </g>
  );
}
