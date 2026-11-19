import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";
import { shade } from "../style/index";

// Salmon (preset of flat-vector/fish): silver-pink torpedo, dark speckles on the back, slightly hooked lower jaw, fork tail.
const LOOK = {"len": 280, "bodyH": 110, "shape": "torpedo", "head": "normal", "color": "#EDB2AC", "belly": "#FBEDEA", "back": "#6F8C97", "finColor": "#E39A94", "tail": "fork", "tailSize": 130, "dorsal": "small", "pattern": "speckles", "patternColor": "#2B3848", "eyeSize": 1, "eyeType": "eye", "mouth": "closed", "gills": true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s: number = q.s ?? 1, f: number = q.f ?? 0, len: number = q.len, H: number = q.bodyH, hx = len / 2;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1000;
  const bob = q.pose === "idle" ? Math.sin(f * 0.05) * 6 : 0;
  // lower jaw that curls up at the tip
  const jaw = (
    <path d={`M ${hx - len * 0.1} ${H * 0.05} Q ${hx + len * 0.02} ${H * 0.1} ${hx + len * 0.05} ${H * 0.06} Q ${hx + len * 0.08} ${H * 0.03} ${hx + len * 0.07} ${-H * 0.03}`} fill="none" stroke={shade(q.color, 0.3)} strokeWidth={Math.max(3, len * 0.035)} strokeLinecap="round" />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${q.flip ? -s : s} ${s})`}>
      <Fish {...q} x={0} y={0} s={1} flip={false} vx={0} />
      <g transform={`translate(0 ${bob})`}>{jaw}</g>
    </g>
  );
}
