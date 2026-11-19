import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector broken heart sticker: a red heart split by a zigzag crack, the two halves drift apart and back.
// Motion only from p.f. Centre (x, y), about 490 px wide at s = 1.

const HEART = "M 0 170 C -200 40 -230 -90 -150 -150 C -100 -190 -20 -150 0 -90 C 20 -150 100 -190 150 -150 C 230 -90 200 40 0 170 Z";
const LEFT = "M 0 170 C -200 40 -230 -90 -150 -150 C -100 -190 -20 -150 0 -90 L -24 -60 L 12 -25 L -16 10 L 14 45 L -10 85 L 10 120 Z";
const RIGHT = "M 0 -90 C 20 -150 100 -190 150 -150 C 230 -90 200 40 0 170 L 10 120 L -10 85 L 14 45 L -16 10 L 12 -25 L -24 -60 Z";

function Half({ d, col, tf }: { d: string; col: string; tf: string }) {
  return (
    <g transform={tf}>
      <path d={d} transform="translate(0 12)" fill={shade(col, 0.18)} />
      <path d={d} fill={col} />
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.red;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "split";
  let sep = 6, dx = 0;
  if (anim === "split") sep = 6 + (16 * (1 + Math.sin(f * 0.08))) / 2;
  else if (anim === "shake") dx = Math.sin(f * 1.4) * 5;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <path d={HEART} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
      <path d={HEART} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
      <Half d={LEFT} col={col} tf={`translate(${dx - sep} ${sep * 0.3}) rotate(${-sep * 0.5})`} />
      <Half d={RIGHT} col={col} tf={`translate(${dx + sep} ${sep * 0.3}) rotate(${sep * 0.5})`} />
    </g>
  );
}
