import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector star sticker: chunky five-point star with rounded corners, white die-cut edge, shadow and one
// darker shade. Rocks gently from p.f only. Centre (x, y), about 470 px wide at s = 1.

const starPts = (R: number, r: number, n = 5): [number, number][] => {
  const o: [number, number][] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n, rr = i % 2 ? r : R;
    o.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  return o;
};
/** Polygon with every corner cut back by t and rounded through the corner point. */
const rounded = (pts: [number, number][], t: number) => {
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
const STAR = rounded(starPts(230, 118), 0.2);

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
  if (anim === "wobble") rot = Math.sin(f * 0.12) * 6;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.04;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k * sc})`}>
      <g transform={`rotate(${rot})`}>
        <Sticker d={STAR} col={col} />
        <ellipse cx={-100} cy={-70} rx={26} ry={12} transform="rotate(-35 -100 -70)" fill="#FFFFFF" opacity={0.8} />
      </g>
    </g>
  );
}
