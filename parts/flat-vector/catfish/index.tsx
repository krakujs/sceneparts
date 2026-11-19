import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";
import { shade } from "../style/index";

// Catfish (preset of flat-vector/fish): brown-grey flat-top body, long barbel whiskers, wide smiling mouth, fork tail.
const LOOK = {"len": 300, "bodyH": 110, "shape": "flat-top", "head": "normal", "color": "#7E7165", "belly": "#CFC5B3", "back": "#5B5048", "finColor": "#6B5F55", "tail": "fork", "tailSize": 130, "dorsal": "small", "pattern": "none", "eyeSize": 1.1, "eyeType": "eye", "mouth": "smile", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s: number = q.s ?? 1, f: number = q.f ?? 0, len: number = q.len, H: number = q.bodyH, hx = len / 2;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1000;
  const bob = q.pose === "idle" ? Math.sin(f * 0.05) * 6 : 0;
  const L = len, Hh = H;
  const bar = (d: string) => <path d={d} fill="none" stroke={shade(q.color, 0.4)} strokeWidth={Math.max(3, L * 0.016)} strokeLinecap="round" />;
  const whiskers = (
    <g>
      {bar(`M ${hx - L * 0.03} ${Hh * 0.02} C ${hx + L * 0.08} ${-Hh * 0.12} ${hx + L * 0.22} ${-Hh * 0.1} ${hx + L * 0.3} ${-Hh * 0.02}`)}
      {bar(`M ${hx - L * 0.02} ${Hh * 0.06} C ${hx + L * 0.1} ${Hh * 0.02} ${hx + L * 0.22} ${Hh * 0.08} ${hx + L * 0.28} ${Hh * 0.22}`)}
      {bar(`M ${hx - L * 0.04} ${Hh * 0.1} C ${hx + L * 0.04} ${Hh * 0.18} ${hx + L * 0.12} ${Hh * 0.24} ${hx + L * 0.14} ${Hh * 0.38}`)}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${q.flip ? -s : s} ${s})`}>
      <Fish {...q} x={0} y={0} s={1} flip={false} vx={0} />
      <g transform={`translate(0 ${bob})`}>{whiskers}</g>
    </g>
  );
}
