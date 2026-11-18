import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector glossy heart sticker: die-cut white edge, soft shadow, one darker shade and a small highlight.
// Beats (or floats) from p.f only. Centre (x, y), about 490 px wide at s = 1.

const HEART = "M 0 170 C -200 40 -230 -90 -150 -150 C -100 -190 -20 -150 0 -90 C 20 -150 100 -190 150 -150 C 230 -90 200 40 0 170 Z";

function Sticker({ d, col }: { d: string; col: string }) {
  return (
    <g>
      <path d={d} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
      <path d={d} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
      <path d={d} transform="translate(0 14)" fill={shade(col, 0.18)} />
      <path d={d} fill={col} />
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.red;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "beat";
  let sc = 1, dy = 0;
  if (anim === "beat") sc = 1 + Math.pow(Math.max(0, Math.sin(f * 0.25)), 6) * 0.1;
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * sc})`}>
      <Sticker d={HEART} col={col} />
      <ellipse cx={-120} cy={-95} rx={34} ry={20} transform="rotate(-28 -120 -95)" fill="#FFFFFF" opacity={0.75} />
      <circle cx={-80} cy={-40} r={9} fill="#FFFFFF" opacity={0.6} />
    </g>
  );
}
