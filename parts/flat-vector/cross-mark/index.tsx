import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cross mark sticker: a bold white X on a round coloured disc with a white die-cut edge,
// shadow and one darker shade. Shakes gently from p.f only. Centre (x, y), about 430 px wide at s = 1.

const DISC = "M -200 0 A 200 200 0 1 0 200 0 A 200 200 0 1 0 -200 0 Z";
const X = "M -85 -85 L 85 85 M 85 -85 L -85 85";

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
  const anim: string = p.anim ?? "shake";
  let dx = 0, sc = 1;
  if (anim === "shake") dx = Math.sin(f * 0.8) * 8;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  return (
    <g transform={`translate(${x + dx * s} ${y}) scale(${s * k * sc})`}>
      <Sticker d={DISC} col={col} />
      <path d={X} fill="none" stroke="#FFFFFF" strokeWidth={62} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
