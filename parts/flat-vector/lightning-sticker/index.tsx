import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector lightning sticker: a zigzag yellow bolt with a white die-cut edge, shadow and one darker shade,
// with occasional flashes of white light from p.f only. Centre (x, y), about 360 px wide at s = 1.

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
const BOLT = starless([[40, -240], [-130, 30], [-10, 30], [-70, 240], [130, -40], [10, -40]], 0.08);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "flash";
  let dx = 0, flash = 0;
  if (anim === "flash") flash = Math.pow(Math.max(0, Math.sin(f * 0.5)), 12) * 0.75;
  else if (anim === "shake") dx = Math.sin(f * 1.3) * 6;
  return (
    <g transform={`translate(${x + dx * s} ${y}) scale(${s * k})`}>
      <path d={BOLT} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
      <path d={BOLT} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
      <path d={BOLT} transform="translate(0 14)" fill={shade(col, 0.18)} />
      <path d={BOLT} fill={col} />
      <path d={BOLT} fill="#FFFFFF" opacity={flash} />
    </g>
  );
}
