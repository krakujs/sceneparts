import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";
import { ink } from "../style/index";

// Hammerhead shark (preset of ink-sketch/fish): grey torpedo body, white belly, tall dorsal, crescent tail, gill slits.
// The hammer is a wide bar across the nose (drawn behind the body); the generator draws the eyes on its ends.
const LOOK = {"len": 490, "bodyH": 150, "shape": "torpedo", "head": "hammer", "color": "#7F8C9B", "belly": "#EEF2F5", "back": "#5D6878", "finColor": "#6F7D8D", "tail": "crescent", "tailSize": 190, "dorsal": "tall", "pattern": "none", "eyeSize": 0.9, "eyeType": "dot", "mouth": "closed", "gills": true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s: number = q.s ?? 1, f: number = q.f ?? 0, len: number = q.len, H: number = q.bodyH, hx = len / 2;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1000;
  // same idle bob as the generator, so the hammer moves with the head
  const bob = q.pose === "idle" ? Math.sin(f * 0.05) * 6 : 0;
  const hammer = <rect x={hx - len * 0.06} y={-H * 0.8} width={len * 0.17} height={H * 1.6} rx={len * 0.06} fill={q.color} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${q.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${bob})`}>{ink(hammer, 5)}</g>
      <Fish {...q} x={0} y={0} s={1} flip={false} vx={0} />
    </g>
  );
}
