import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, font, shade } from "../style/index";

// Flat vector stop sign: a red rounded octagon with a white inner ring and STOP lettering, on a white die-cut
// edge with shadow and one darker shade. No pole. Pulses from p.f only. Centre (x, y), about 490 px wide at s = 1.

const poly = (R: number, t: number) => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 8 + (i * Math.PI) / 4;
    pts.push([Math.cos(a) * R, Math.sin(a) * R]);
  }
  const n = pts.length;
  let d = "";
  pts.forEach((P, i) => {
    const A = pts[(i + n - 1) % n], B = pts[(i + 1) % n];
    const a = [P[0] + (A[0] - P[0]) * t, P[1] + (A[1] - P[1]) * t];
    const b = [P[0] + (B[0] - P[0]) * t, P[1] + (B[1] - P[1]) * t];
    d += `${i ? "L" : "M"} ${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${P[0].toFixed(1)} ${P[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `;
  });
  return d + "Z";
};
const OUTER = poly(235, 0.12), RING = poly(200, 0.12), INNER = poly(184, 0.12);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.red;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "pulse";
  let sc = 1, dx = 0;
  if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  else if (anim === "shake") dx = Math.sin(f * 1.2) * 4;
  return (
    <g transform={`translate(${x + dx * s} ${y}) scale(${s * k * sc})`}>
      <path d={OUTER} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
      <path d={OUTER} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
      <path d={OUTER} transform="translate(0 14)" fill={shade(col, 0.18)} />
      <path d={OUTER} fill={col} />
      <path d={RING} fill="#FFFFFF" />
      <path d={INNER} fill={col} />
      <text x={0} y={6} textAnchor="middle" dominantBaseline="central" fontFamily={font} fontWeight={900} fontSize={104} letterSpacing={4} fill="#FFFFFF">STOP</text>
    </g>
  );
}
