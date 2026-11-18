import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector sweat drops: three blue drops with white die-cut edges, shadow and one darker shade, flying
// outward from a head and fading. Motion only from p.f. Centre (x, y), about 420 px wide at s = 1.

const dropPath = (r: number) =>
  `M 0 ${-r * 1.7} Q ${r * 1.05} ${-r * 0.2} ${r} ${r * 0.25} A ${r} ${r} 0 0 1 ${-r} ${r * 0.25} Q ${-r * 1.05} ${-r * 0.2} 0 ${-r * 1.7} Z`;

const DROPS = [
  { x: -150, y: -40, rot: -25, r: 60, dx: -1, dy: -0.3 },
  { x: 150, y: -120, rot: 25, r: 52, dx: 1, dy: -0.6 },
  { x: 140, y: 70, rot: 15, r: 60, dx: 1, dy: 0.3 },
];

function Drop({ d, r, col }: { d: string; r: number; col: string }) {
  return (
    <g>
      <path d={d} transform="translate(0 14)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
      <path d={d} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
      <path d={d} transform="translate(0 10)" fill={shade(col, 0.18)} />
      <path d={d} fill={col} />
      <ellipse cx={-r * 0.35} cy={r * 0.1} rx={r * 0.2} ry={r * 0.32} fill="#FFFFFF" opacity={0.7} />
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.blue;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "fly";
  const flip = p.flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * flip} ${s * k})`}>
      {DROPS.map((dr, i) => {
        const t = anim === "fly" ? ((f + i * 14) % 42) / 42 : 0;
        const shakeX = anim === "shake" ? Math.sin(f * 0.9 + i) * 5 : 0;
        const op = anim === "fly" ? (t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4) : 1;
        return (
          <g key={i} opacity={op} transform={`translate(${dr.x + dr.dx * t * 30 + shakeX} ${dr.y + dr.dy * t * 30})`}>
            <g transform={`rotate(${dr.rot})`}>
              <Drop d={dropPath(dr.r)} r={dr.r} col={col} />
            </g>
          </g>
        );
      })}
    </g>
  );
}
