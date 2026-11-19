import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Heartbeat (ECG) line: flat, a spike, flat, about 800 px wide, centred on (x, y). Effect, no stand.
// Optional small heart at the right end. anim "trace": the line draws left to right over 60 frames,
// holds, then starts again, with a glowing head that follows the drawing point.
const f1 = (v: number) => v.toFixed(1);
const V: [number, number][] = [[-400, 0], [-200, 0], [-172, 22], [-140, -200], [-108, 126], [-78, 0], [40, 0], [70, -44], [104, 0], [330, 0]];
const PATH = "M " + V.map((v) => `${v[0]} ${v[1]}`).join(" L ");
const segs = V.slice(1).map((v, i) => Math.hypot(v[0] - V[i][0], v[1] - V[i][1]));
const total = segs.reduce((a, b) => a + b, 0);
// Point on the trace after walking `len` px along it.
const pointAt = (len: number): [number, number] => {
  let l = len;
  for (let i = 0; i < segs.length; i++) {
    if (l <= segs[i]) {
      const t = l / segs[i];
      return [V[i][0] + (V[i + 1][0] - V[i][0]) * t, V[i][1] + (V[i + 1][1] - V[i][1]) * t];
    }
    l -= segs[i];
  }
  return V[V.length - 1];
};
const HEART = "M 0 26 C -44 -6 -40 -44 -18 -44 C -8 -44 -2 -38 0 -30 C 2 -38 8 -44 18 -44 C 40 -44 44 -6 0 26 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const trace = anim === "trace";
  const prog = trace ? Math.min(1, (f % 90) / 60) : 1;
  const [hx, hy] = pointAt(prog * total);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
      <g transform="translate(-28 0)">
        {/* faint track */}
        <path d={PATH} fill="none" stroke={c} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" opacity={0.22} />
        {/* the trace, drawn left to right */}
        <path d={PATH} fill="none" stroke={c} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round"
          pathLength={1} strokeDasharray={`${prog.toFixed(4)} 1`} />
        {/* glowing head */}
        {trace && <circle cx={f1(hx)} cy={f1(hy)} r={26} fill={c} opacity={0.35} />}
        {trace && <circle cx={f1(hx)} cy={f1(hy)} r={11} fill={C.white} />}
        {p.heart !== false && (
          <g transform="translate(400 -4) scale(1.1)">
            <path d={HEART} fill={c} />
            <path d="M -30 -20 C -30 -28 -22 -32 -16 -30" stroke={C.white} strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.6} />
          </g>
        )}
      </g>
    </g>
  );
}
