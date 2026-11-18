import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Golf ball: a white ball with a grid of small dimples, optionally on a wooden tee. Origin = bottom centre;
// the tee's foot (or the ball, when there is no tee) rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const R = 110;
  const ballC = p.color && p.color !== "none" ? p.color : C.white;
  const tee = p.tee !== false;
  const anim: string = p.anim ?? "none";
  const lift = anim === "bounce" ? Math.abs(Math.sin((f * 2 * Math.PI) / 30)) * 60 : 0;
  const spin = anim === "spin" ? f * 6 : 0;
  const base = tee ? -58 - R + 10 : -R - 4;
  // dimples on three rings (deterministic positions)
  const dimples: [number, number][] = [];
  for (const [ring, n, off] of [[0.3, 6, 0], [0.6, 12, 15], [0.85, 16, 7]] as [number, number, number][]) {
    for (let i = 0; i < n; i++) {
      const a = ((i * 360) / n + off) * (Math.PI / 180);
      dimples.push([Math.cos(a) * R * ring, Math.sin(a) * R * ring]);
    }
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {tee && (
        <g>
          <path d="M -26 0 L 26 0 L 18 -54 L -18 -54 Z" fill={C.sand} />
          <path d="M 6 0 L 26 0 L 18 -54 L 6 -54 Z" fill={shade(C.sand, 0.2)} />
          <rect x={-22} y={-62} width={44} height={12} rx={5} fill={shade(C.sand, 0.12)} />
        </g>
      )}
      <ellipse cx={0} cy={0} rx={R * 0.8} ry={9} fill={C.shadow} />
      <g transform={`translate(0 ${f1(base - lift)}) rotate(${f1(spin)})`}>
        <circle cx={0} cy={0} r={R} fill={shade(ballC, 0.12)} />
        <circle cx={-5} cy={-6} r={R - 5} fill={ballC} />
        {dimples.map(([dx, dy], i) => (
          <circle key={i} cx={f1(dx)} cy={f1(dy)} r={6.5} fill={shade(ballC, 0.14)} />
        ))}
      </g>
    </g>
  );
}
