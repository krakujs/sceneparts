import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector anger mark: the comic "popping vein" symbol, four thick red curves bowing towards the centre,
// with a white die-cut edge, soft shadow and one darker shade. Throbs from p.f only. Centre (x, y), about 340 px wide at s = 1.
// Place it beside a character's head to show annoyance.

const D = "M -40 -160 Q -40 -40 -160 -40 M 40 -160 Q 40 -40 160 -40 M -40 160 Q -40 40 -160 40 M 40 160 Q 40 40 160 40";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.red;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "throb";
  let sc = 1, dx = 0;
  if (anim === "throb") sc = 1 + Math.pow(Math.abs(Math.sin(f * 0.3)), 3) * 0.12;
  else if (anim === "shake") dx = Math.sin(f * 1.1) * 6;
  const st = (c: string, w: number, dy = 0) => <path d={D} transform={`translate(0 ${dy})`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  return (
    <g transform={`translate(${x + dx * s} ${y}) scale(${s * k * sc})`}>
      {st(C.shadow, 90, 16)}
      {st("#FFFFFF", 90)}
      {st(shade(col, 0.18), 52, 8)}
      {st(col, 52)}
      <path d="M -52 -140 Q -54 -70 -100 -56" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.6} />
    </g>
  );
}
