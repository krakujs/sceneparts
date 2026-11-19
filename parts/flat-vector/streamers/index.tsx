import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Curly paper streamers: six ribbons, each a wavy band with a lighter inner stripe.
// Anim fall: each streamer drifts down and wraps back to the top, out of step with the others.
const f1 = (v: number) => v.toFixed(1);
const COLS = [C.pink, C.yellow, C.teal, C.purple, C.orange, C.blue];
const HEAD = 380, SPAN = 700; // wrap band: streamers move through a 700 px window

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const anim: string = p.anim ?? "none";
  const streamers = COLS.map((col, i) => {
    const x0 = (i - 2.5) * 170;
    const drop = anim === "fall" ? ((f * 3 + i * 117) % SPAN) : (i * 117) % SPAN;
    const pts: string[] = [];
    for (let k = 0; k <= 12; k++) {
      const t = k / 12;
      const px = x0 + Math.sin(t * Math.PI * 2.4 + i * 1.1) * 42;
      const py = -HEAD + t * 520 + (anim === "fall" ? 0 : 0);
      pts.push(`${f1(px)} ${f1(py)}`);
    }
    const d = `M ${pts.join(" L ")}`;
    return (
      <g key={i} transform={`translate(0 ${f1(drop - SPAN / 2)})`} opacity={anim === "fall" ? 0.96 : 1}>
        <path d={d} fill="none" stroke={col} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" opacity={0.35} />
      </g>
    );
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {streamers}
    </g>
  );
}
