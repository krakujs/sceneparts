import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Sea turtle (preset of flat-vector/reptile): flat green-brown shell with flippers, swims with a gentle bob.
// Extra SVG: darker shell plates and a bob from f on top of the generator.
const LOOK = { body: "turtle", shell: "sea", len: 240, bodyH: 100, head: 30, snout: 14, tailLen: 50, legLen: 50, legW: 30, color: "#7E9A4A", shellColor: "#5C7A3A", plateColor: "#3E5628" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const f = q.f ?? 0, s = q.s ?? 1, flip = !!q.flip;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = (q.y ?? 1560) + Math.sin(f * 0.07) * 6;
  // shell geometry in local space (see reptile turtle branch)
  const L = q.len, shellRy = q.bodyH * 0.5, cy = -q.legLen - shellRy * 0.5, rx = L / 2;
  const plates: [number, number][] = [[0, 0], [-0.45, 0], [0.45, 0], [-0.2, -0.5], [0.2, -0.5], [-0.2, 0.5], [0.2, 0.5]];
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip ? -s : s} ${s})`}>
      <Reptile {...q} x={0} y={0} s={1} flip={false} vx={0} />
      {plates.map(([u, v], i) => (
        <ellipse key={i} cx={u * rx} cy={cy + v * shellRy * 0.6} rx={rx * 0.16} ry={shellRy * 0.3} fill={q.plateColor} />
      ))}
    </g>
  );
}
