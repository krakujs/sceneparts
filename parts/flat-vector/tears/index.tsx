import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector tears: two big blue tear drops with white die-cut edges, shadow and one darker shade, falling in
// turn and fading out. Motion only from p.f. Centre (x, y), about 390 px wide at s = 1.

const dropPath = (r: number) =>
  `M 0 ${-r * 1.7} Q ${r * 1.05} ${-r * 0.2} ${r} ${r * 0.25} A ${r} ${r} 0 0 1 ${-r} ${r * 0.25} Q ${-r * 1.05} ${-r * 0.2} 0 ${-r * 1.7} Z`;

const R = 72;
const DROPS = [
  { x: -95, y: -40, off: 0 },
  { x: 95, y: 10, off: 30 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? "#4FA3E8";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "fall";
  const d = dropPath(R);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      {DROPS.map((dr, i) => {
        const t = anim === "fall" ? ((f + dr.off) % 60) / 60 : 0;
        const dy = anim === "bob" ? Math.sin(f * 0.12 + i) * 10 : t * 70;
        const op = anim === "fall" && t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
        return (
          <g key={i} opacity={op} transform={`translate(${dr.x} ${dr.y + dy})`}>
            <path d={d} transform="translate(0 14)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
            <path d={d} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
            <path d={d} transform="translate(0 10)" fill={shade(col, 0.18)} />
            <path d={d} fill={col} />
            <ellipse cx={-R * 0.35} cy={R * 0.1} rx={R * 0.2} ry={R * 0.32} fill="#FFFFFF" opacity={0.7} />
          </g>
        );
      })}
    </g>
  );
}
