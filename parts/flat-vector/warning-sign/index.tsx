import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector warning sign: a yellow rounded triangle with a dark exclamation mark, white die-cut edge,
// shadow and one darker shade. Rocks gently from p.f only. Centre (x, y), about 500 px wide at s = 1.

const starless = (pts: [number, number][], t: number) => {
  const n = pts.length;
  let d = "";
  pts.forEach((P, i) => {
    const A = pts[(i + n - 1) % n], B = pts[(i + 1) % n];
    const a = [P[0] + (A[0] - P[0]) * t, P[1] + (A[1] - P[1]) * t];
    const b = [P[0] + (B[0] - P[0]) * t, P[1] + (B[1] - P[1]) * t];
    d += `${i ? "L" : "M"} ${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${P[0]} ${P[1]} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `;
  });
  return d + "Z";
};
const TRI = starless([[0, -235], [235, 190], [-235, 190]], 0.16);

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
  const col: string = p.color ?? C.yellow;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "wobble";
  let rot = 0, sc = 1;
  if (anim === "wobble") rot = Math.sin(f * 0.12) * 4;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * sc}) rotate(${rot})`}>
      <Sticker d={TRI} col={col} />
      <path d="M 0 -120 L 0 55" stroke={C.ink} strokeWidth={56} strokeLinecap="round" fill="none" />
      <circle cx={0} cy={135} r={32} fill={C.ink} />
    </g>
  );
}
