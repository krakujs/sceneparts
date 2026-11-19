import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cluster of three rod-shaped (capsule) bacteria, each with a wavy flagellum tail.
// Effect, centred on (x, y), about 560 px wide at s = 1. anim "wiggle": each one rocks and its tail ripples.
const f1 = (v: number) => v.toFixed(1);
const LEN = 230, WID = 100;
const BACT: { x: number; y: number; a: number }[] = [
  { x: -130, y: -40, a: -25 },
  { x: 130, y: -120, a: 20 },
  { x: 0, y: 90, a: -6 },
];

// wavy tail from the right end of a capsule, drawn in its local frame
const tail = (phase: number) => {
  const pts: string[] = [];
  for (let k = 0; k <= 24; k++) {
    const px = LEN / 2 + 8 + k * 8;
    const py = 26 * Math.sin(k * 0.7 + phase) * (k / 24 + 0.2);
    pts.push(`${k === 0 ? "M" : "L"} ${f1(px)} ${f1(py)}`);
  }
  return pts.join(" ");
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const flag = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      {BACT.map((b, i) => {
        const rock = anim === "wiggle" ? 6 * Math.sin((f * 2 * Math.PI) / 50 + i * 2) : 0;
        const phase = anim === "wiggle" ? (f * 2 * Math.PI) / 30 + i : i;
        return (
          <g key={i} transform={`translate(${f1(b.x)} ${f1(b.y)}) rotate(${f1(b.a + rock)})`}>
            <path d={tail(phase)} stroke={flag} strokeWidth={12} strokeLinecap="round" fill="none" />
            <rect x={-LEN / 2} y={-WID / 2 + 10} width={LEN} height={WID} rx={WID / 2} fill={shade(body, 0.22)} />
            <rect x={-LEN / 2} y={-WID / 2} width={LEN} height={WID} rx={WID / 2} fill={body} />
            <rect x={-LEN / 2 + 26} y={-WID / 2 + 14} width={LEN - 52} height={10} rx={5} fill={C.white} opacity={0.4} />
          </g>
        );
      })}
    </g>
  );
}
