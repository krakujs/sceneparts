import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector Zzz: three chunky Z letters of growing size with white die-cut edges, shadow and one darker shade,
// drifting up in turn. Motion only from p.f. Centre (x, y), about 430 px wide at s = 1.

const Z = (L: number) => {
  const h = L / 2;
  return `M ${-h} ${-h} L ${h} ${-h} L ${-h} ${h} L ${h} ${h}`;
};
const LETTERS = [
  { x: -150, y: 120, L: 90, ph: 0 },
  { x: -10, y: -10, L: 140, ph: 1.1 },
  { x: 130, y: -150, L: 200, ph: 2.2 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.blue;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "drift";
  const lift = (ph: number) => (anim === "drift" ? -(8 + (10 * (1 + Math.sin(f * 0.08 - ph))) / 2) : anim === "bob" ? Math.sin(f * 0.12 + ph) * 8 : 0);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      {LETTERS.map((g, i) => {
        const sw = g.L * 0.22;
        const d = Z(g.L);
        return (
          <g key={i} transform={`translate(${g.x} ${g.y + lift(g.ph)})`}>
            <path d={d} transform="translate(0 14)" fill="none" stroke={C.shadow} strokeWidth={sw + 34} strokeLinejoin="round" strokeLinecap="round" />
            <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={sw + 34} strokeLinejoin="round" strokeLinecap="round" />
            <path d={d} transform="translate(0 10)" fill="none" stroke={shade(col, 0.18)} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
            <path d={d} fill="none" stroke={col} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}
