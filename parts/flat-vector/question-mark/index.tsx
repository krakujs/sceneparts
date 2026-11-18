import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector question mark: a chunky blue hook and dot with a white die-cut edge, shadow and one darker shade.
// Tilts gently from p.f only. Centre (x, y), about 310 px wide at s = 1.

const HOOK = "M -105 -95 C -105 -235 105 -235 105 -75 C 105 -10 10 -25 10 70";
const DOT = "M -46 200 A 46 46 0 1 0 46 200 A 46 46 0 1 0 -46 200 Z";

/** A stroked glyph with a white die-cut edge, shadow and one darker shade. */
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
  const col: string = p.color ?? C.blue;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "wobble";
  let rot = 0, dy = 0;
  if (anim === "wobble") rot = Math.sin(f * 0.12) * 5;
  else if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k}) rotate(${rot})`}>
      <StrokeSticker d={HOOK} w={84} col={col} />
      <Sticker d={DOT} col={col} />
    </g>
  );
}
