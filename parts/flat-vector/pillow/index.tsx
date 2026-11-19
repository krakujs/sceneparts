import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pillow: soft rectangular cushion with puffy rounded corners, a darker side for depth and a light seam inset.
// Origin = bottom centre; faces the viewer, honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : C.pink;
  const dk = shade(c, 0.2);
  const light = shade(c, -0.12);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* main puffy body */}
        <rect x={-180} y={-300} width={360} height={300} rx={96} fill={c} />
        {/* shaded right side for depth */}
        <path d="M 96 -300 H 84 A 96 96 0 0 0 180 -204 V -96 Q 180 -300 96 -300 Z" fill={dk} />
        {/* stitched seam inset, drawn as a lighter rounded panel */}
        <rect x={-146} y={-266} width={292} height={232} rx={70} fill="none" stroke={light} strokeWidth={6} strokeDasharray="14 12" />
        {/* soft highlight on the upper left puff */}
        <ellipse cx={-96} cy={-244} rx={34} ry={18} fill={C.white} opacity={0.35} transform="rotate(-20 -96 -244)" />
      </g>
    </g>
  );
}
