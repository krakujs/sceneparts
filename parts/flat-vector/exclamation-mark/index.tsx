import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector exclamation mark: a chunky red bar and dot with a white die-cut edge, shadow and one darker shade.
// Hops from p.f only. Centre (x, y), about 240 px wide and 500 px tall at s = 1.

const BAR = "M 0 -140 L 0 30";
const DOT = "M -80 200 A 80 80 0 1 0 80 200 A 80 80 0 1 0 -80 200 Z";

function StrokeSticker({ d, w, col }: { d: string; w: number; col: string }) {
  const st = (c: string, ww: number, dy: number) => (
    <path d={d} transform={`translate(0 ${dy})`} fill="none" stroke={c} strokeWidth={ww} strokeLinecap="round" strokeLinejoin="round" />
  );
  return (
    <g>
      {st(C.shadow, w + 34, 16)}
      {st("#FFFFFF", w + 34, 0)}
      {st(shade(col, 0.18), w, 12)}
      {st(col, w, 0)}
    </g>
  );
}

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
  const anim: string = p.anim ?? "bounce";
  let dy = 0, sc = 1;
  if (anim === "bounce") dy = -Math.abs(Math.sin(f * 0.15)) * 30;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * sc})`}>
      <StrokeSticker d={BAR} w={150} col={col} />
      <Sticker d={DOT} col={col} />
    </g>
  );
}
