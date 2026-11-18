import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector fire sticker: a cartoon flame with an inner yellow flame and white core, die-cut white edge,
// shadow and one darker shade. Flickers from p.f only. Centre (x, y), about 380 px wide at s = 1.

const FLAME = "M 0 -230 C 30 -170 170 -110 170 30 C 170 140 100 200 0 200 C -100 200 -170 140 -170 30 C -170 -30 -130 -80 -95 -120 C -85 -70 -65 -50 -45 -40 C -55 -110 -30 -170 0 -230 Z";
const INNER = "M 0 -100 C 25 -50 90 -10 90 60 C 90 120 50 150 0 150 C -50 150 -90 120 -90 60 C -90 20 -55 0 -40 -30 C -20 0 0 10 0 -100 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.orange;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "flicker";
  let sx = 1, sy = 1, sway = 0, rot = 0;
  if (anim === "flicker") {
    sx = 1 + Math.sin(f * 0.8) * 0.03;
    sy = 1 + Math.sin(f * 0.9) * 0.035 + Math.sin(f * 0.37 + 1) * 0.02;
  } else if (anim === "sway") rot = Math.sin(f * 0.1) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k}) rotate(${rot})`}>
      <g transform={`translate(0 200) scale(${sx} ${sy}) translate(0 -200)`}>
        <path d={FLAME} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
        <path d={FLAME} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
        <path d={FLAME} transform="translate(0 14)" fill={shade(col, 0.18)} />
        <path d={FLAME} fill={col} />
        <path d={INNER} transform="translate(0 10)" fill={shade(C.yellow, 0.18)} />
        <path d={INNER} fill={C.yellow} />
        <ellipse cx={0} cy={100} rx={36} ry={46} fill="#FFFFFF" opacity={0.85} />
      </g>
    </g>
  );
}
