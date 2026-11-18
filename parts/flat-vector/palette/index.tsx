import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Kidney-shaped wooden painter's palette lying on its edge, with a thumb hole and paint blobs.
// Origin = bottom centre. Hero size: about 480 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const PATH = "M -230 -60 C -250 -170 -150 -230 -20 -220 C 120 -210 230 -150 230 -60 C 230 -20 190 0 150 -8 C 100 -18 40 -40 0 -40 C -60 -40 -120 -30 -170 0 C -210 6 -230 -20 -230 -60 Z";
const BLOBS: [number, number, number, string][] = [
  [-150, -150, 24, C.red], [-80, -180, 26, C.yellow], [-6, -184, 24, C.green], [70, -170, 26, C.blue],
  [140, -130, 22, C.purple], [-170, -100, 18, C.orange],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.wood && p.wood !== "none" ? p.wood : "#C9A46C";
  const anim: string = p.anim ?? "none";
  const tilt = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 3 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.08 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(tilt)} 0 0) scale(${f1(pop)})`}>
        {/* wooden board with a darker edge for depth */}
        <path d={PATH} fill={shade(wood, 0.25)} transform="translate(0 8)" />
        <path d={PATH} fill={wood} />
        {/* thumb hole */}
        <ellipse cx={-70} cy={-50} rx={26} ry={18} fill={shade(wood, 0.35)} />
        {/* paint pools on the palette surface */}
        {BLOBS.map(([cx, cy, r, c], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy + 6} rx={r} ry={r * 0.7} fill={shade(c, 0.2)} />
            <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.7} fill={c} />
          </g>
        ))}
        <ellipse cx={-54} cy={-190} rx={10} ry={6} fill="#FFFFFF" opacity={0.3} />
      </g>
    </g>
  );
}
