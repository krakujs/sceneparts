import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Firecracker: a red paper tube with twisted ends, a yellow band and a fuse that curls up from the right end.
// Origin = bottom centre of the tube (it lies on y). About 600 px wide and 200 px tall at s = 1.
// anim "sparks": sparks travel along the fuse toward the tip, looping.
const f1 = (v: number) => v.toFixed(1);
// Point on the fuse curve (quadratic bezier) at t in 0..1.
const fuse = (t: number): [number, number] => {
  const u = 1 - t;
  return [u * u * 238 + 2 * u * t * 300 + t * t * 330, u * u * -70 + 2 * u * t * -60 + t * t * -170];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.red;
  const band = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const live = anim === "sparks";
  const sparkPos = [0, 1, 2].map((j) => (live ? (f / 24 + j / 3) % 1 : [0.32, 0.62, 0.9][j]));
  const tip = fuse(1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      {/* fuse */}
      <path d="M 238 -70 Q 300 -60 330 -170" fill="none" stroke={C.brown} strokeWidth={7} strokeLinecap="round" />
      {/* twisted ends */}
      <path d="M -200 -122 L -252 -112 L -238 -92 L -256 -70 L -238 -48 L -252 -28 L -200 -18 Z" fill={band} />
      <path d="M 200 -122 L 236 -112 L 222 -92 L 240 -70 L 222 -48 L 236 -28 L 200 -18 Z" fill={shade(band, 0.12)} />
      {/* tube */}
      <rect x={-200} y={-122} width={400} height={104} rx={16} fill={paper} />
      <rect x={-190} y={-116} width={380} height={14} rx={7} fill={C.white} opacity={0.2} />
      <rect x={-200} y={-42} width={400} height={24} rx={12} fill={shade(paper, 0.3)} opacity={0.7} />
      {/* yellow band with red dots */}
      <rect x={-36} y={-122} width={72} height={104} fill={band} />
      {[-94, -70, -46].map((dy) => <circle key={dy} cx={0} cy={dy} r={7} fill={paper} />)}
      {/* sparks on the fuse */}
      {sparkPos.map((t, j) => {
        const [sx, sy] = fuse(t);
        return (
          <g key={j} opacity={f1(t < 0.97 ? 1 : 0.5) as any}>
            <circle cx={f1(sx)} cy={f1(sy)} r={11} fill={C.yellow} opacity={0.5} />
            <circle cx={f1(sx)} cy={f1(sy)} r={5} fill={C.white} />
          </g>
        );
      })}
      <circle cx={f1(tip[0])} cy={f1(tip[1])} r={live ? 16 + 4 * Math.sin(f * 0.8) : 16} fill={C.orange} opacity={0.6} />
    </g>
  );
}
