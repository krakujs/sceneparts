import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bunny ears headband: a costume band with two tall fluffy ears with pink inners.
// Origin = the centre of the band (it sits on the head at y, so pass the head's top as y).
// About 380 px wide and 400 px tall at s = 1. anim "wiggle": the ears wobble from their bases.
const f1 = (v: number) => v.toFixed(1);

// A fluffy ear built from a chain of circles that tapers toward the tip, with a soft outline so the
// white fur reads against pale backgrounds.
const Ear = ({ bx, tx, fur, inner, rot }: { bx: number; tx: number; fur: string; inner: string; rot: number }) => {
  const pts = Array.from({ length: 6 }, (_, k) => {
    const t = k / 5;
    return { x: bx + (tx - bx) * t, y: -10 - 320 * t, r: 66 - 18 * t };
  });
  return (
    <g transform={`rotate(${f1(rot)} ${bx} -10)`}>
      {pts.map((c, k) => <circle key={`o${k}`} cx={f1(c.x)} cy={f1(c.y)} r={c.r + 7} fill={shade(fur, 0.22)} />)}
      {pts.map((c, k) => <circle key={`f${k}`} cx={f1(c.x)} cy={f1(c.y)} r={c.r} fill={fur} />)}
      {pts.map((c, k) => <circle key={`i${k}`} cx={f1(c.x + 4)} cy={f1(c.y + 8)} r={c.r * 0.6} fill={inner} />)}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 700;
  const band = p.color && p.color !== "none" ? p.color : C.purple;
  const fur = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const inner = p.color3 && p.color3 !== "none" ? p.color3 : C.pink;
  const anim: string = p.anim ?? "none";
  const w1 = anim === "wiggle" ? Math.sin((f * 2 * Math.PI) / 36) * 7 : 0;
  const w2 = anim === "wiggle" ? Math.sin((f * 2 * Math.PI) / 36 + 1.2) * 7 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Ear bx={-70} tx={-104} fur={fur} inner={inner} rot={w1} />
      <Ear bx={70} tx={104} fur={fur} inner={inner} rot={w2} />
      <path d="M -180 6 Q 0 -44 180 6" fill="none" stroke={band} strokeWidth={30} strokeLinecap="round" />
      <path d="M -180 -4 Q 0 -50 180 -4" fill="none" stroke={shade(band, 0.2)} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
    </g>
  );
}
