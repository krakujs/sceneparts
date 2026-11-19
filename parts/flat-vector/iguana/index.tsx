import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Iguana (preset of flat-vector/reptile): green body, dorsal spikes, dewlap. Extra SVG: dark bands along the tail.
const LOOK = { body: "lizard", len: 260, bodyH: 84, head: 40, snout: 34, snoutShape: "round", tailLen: 280, legLen: 90, legW: 26, color: "#6FB34B", belly: "#D7E79A", back: "#3F7F35", ridge: "spikes", dewlap: "#C9E88A", eyeSize: 1.1 };

type P2 = [number, number];
const qb = (a: P2, c: P2, b: P2, t: number): P2 => [
  (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];
const dqb = (a: P2, c: P2, b: P2, t: number): P2 => [
  2 * (1 - t) * (c[0] - a[0]) + 2 * t * (b[0] - c[0]),
  2 * (1 - t) * (c[1] - a[1]) + 2 * t * (b[1] - c[1]),
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const f = q.f ?? 0, s = q.s ?? 1, flip = !!q.flip;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1560;
  // tail of the reptile lizard branch, in local space
  const L = q.len, bh = q.bodyH, rxB = L / 2, ry = bh / 2, tl = q.tailLen;
  const by = -(q.legLen + ry) + ry * 0.1;
  const a: P2 = [-rxB + L * 0.06, by + ry * 0.1], c: P2 = [-rxB - tl * 0.6, by - tl * 0.05], b: P2 = [-rxB - tl, by + tl * 0.14];
  const w0 = bh * 0.4, w1 = Math.max(4, w0 * 0.22);
  const bands = [0.42, 0.55, 0.68, 0.8, 0.9];
  return (
    <g transform={`translate(${x.toFixed(1)} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Reptile {...q} x={0} y={0} s={1} flip={false} vx={0} />
      {bands.map((t, i) => {
        const pt = qb(a, c, b, t), d = dqb(a, c, b, t), m = Math.hypot(d[0], d[1]) || 1;
        const n: P2 = [-d[1] / m, d[0] / m], w = (w0 + (w1 - w0) * t) / 2 * 1.12;
        return <line key={i} x1={pt[0] - n[0] * w} y1={pt[1] - n[1] * w} x2={pt[0] + n[0] * w} y2={pt[1] + n[1] * w} stroke="#3A5E2A" strokeWidth={bh * 0.1} strokeLinecap="round" />;
      })}
    </g>
  );
}
