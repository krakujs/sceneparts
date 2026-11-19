import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// One jigsaw piece: a square body with a round knob on top, right and bottom and a socket on the left
// (the socket is a shaded circle that reads as a notch). Origin = bottom centre of the piece.
// About 380 px across at s = 1. anim "pop": springs in from small.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const H = 150; // half of the square body
  const K = 56;  // knob radius
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(-(H + K))})`}>
          <rect x={-H} y={-H} width={H * 2} height={H * 2} rx={22} fill={body} />
          {/* knobs: top, right, bottom */}
          <circle cx={0} cy={-H} r={K} fill={body} />
          <circle cx={H} cy={0} r={K} fill={body} />
          <circle cx={0} cy={H} r={K} fill={body} />
          {/* socket on the left */}
          <circle cx={-H} cy={0} r={K} fill={C.sky} />
          {/* shading: a darker band along the bottom and right edges */}
          <rect x={-H} y={H - 26} width={H * 2} height={26} rx={12} fill={shade(body, 0.14)} />
          <rect x={H - 26} y={-H} width={26} height={H * 2} rx={12} fill={shade(body, 0.14)} />
          {/* highlight */}
          <rect x={-H + 22} y={-H + 20} width={70} height={14} rx={7} fill={C.white} opacity={0.35} />
          {/* picture hint: a small printed sky-coloured dot cluster */}
          <circle cx={-40} cy={-30} r={12} fill={C.skyDeep} opacity={0.8} />
          <circle cx={30} cy={40} r={12} fill={C.skyDeep} opacity={0.8} />
        </g>
      </g>
    </g>
  );
}
