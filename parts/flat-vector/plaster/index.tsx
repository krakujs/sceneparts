import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, SKIN } from "../style/index";

// Adhesive plaster (sticking plaster): a long strip with a padded centre and rows of tiny holes,
// lying at a slight angle. Origin = bottom centre (the lowest corner rests on y).
const f1 = (v: number) => v.toFixed(1);
const A = -8; // tilt in degrees
const HALF_L = 210, HALF_H = 62;
// lowest point of the tilted strip, so it rests on y
const LOW = HALF_L * Math.sin((-A * Math.PI) / 180) + HALF_H * Math.cos((A * Math.PI) / 180);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const col = p.color && p.color !== "none" ? p.color : SKIN.fair;
  const dk = shade(col, 0.22);
  const holes = [-185, -150, -115, 115, 150, 185];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <g transform={`translate(0 ${f1(-LOW)}) rotate(${A})`}>
          {/* strip with a darker lower edge */}
          <rect x={-HALF_L} y={-HALF_H + 8} width={HALF_L * 2} height={HALF_H * 2} rx={58} fill={dk} />
          <rect x={-HALF_L} y={-HALF_H} width={HALF_L * 2} height={HALF_H * 2 - 8} rx={58} fill={col} />
          {/* padded centre */}
          <rect x={-78} y={-HALF_H + 6} width={156} height={HALF_H * 2 - 12} rx={8} fill={shade(C.white, 0.08)} />
          <rect x={-72} y={-HALF_H + 12} width={144} height={HALF_H * 2 - 24} rx={6} fill={C.white} />
          {/* tiny holes along both sides */}
          {holes.map((hx) => (
            <g key={hx}>
              <circle cx={hx} cy={-22} r={6} fill={dk} />
              <circle cx={hx} cy={22} r={6} fill={dk} />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
