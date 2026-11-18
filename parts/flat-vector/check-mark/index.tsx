import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector check mark sticker: a bold white tick on a round coloured disc with a white die-cut edge,
// shadow and one darker shade. Idles from p.f only. Centre (x, y), about 430 px wide at s = 1.

const DISC = "M -200 0 A 200 200 0 1 0 200 0 A 200 200 0 1 0 -200 0 Z";
const TICK = "M -95 5 L -30 70 L 105 -70";

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
  const col: string = p.color ?? C.green;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "pulse";
  let sc = 1, dy = 0;
  if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * sc})`}>
      <Sticker d={DISC} col={col} />
      <path d={TICK} fill="none" stroke="#FFFFFF" strokeWidth={62} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
