import React from "react";
import { interpolate, random, type PartProps } from "@sceneparts/core";

// Horizontal meter with a label and a value box: odds, danger, anger, health, progress. Animate `level` with [from, to];
// it shakes and flashes when it falls. Colour runs red (0) -> orange -> yellow -> green (1), or set `color`.
const STOPS: [number, string][] = [[0, "#E5383B"], [0.35, "#F08A24"], [0.7, "#F2B544"], [1, "#3CCB7F"]];
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (v: number) => {
  let i = 1;
  while (i < STOPS.length - 1 && v > STOPS[i][0]) i++;
  const [a, ca] = STOPS[i - 1], [b, cb] = STOPS[i];
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  const [r1, g1, b1] = hex(ca), [r2, g2, b2] = hex(cb);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const lv = Math.max(0, Math.min(1, p.level));
  const prevRaw = typeof p.from === "number" ? p.from : lv;
  const falling = p.shakeOnFall !== false && lv < prevRaw - 0.01 && p.t < 0.6;
  const shake = falling ? (random(`m${p.f}`) - 0.5) * 14 : 0;
  const color = p.color ?? (p.invert ? mix(1 - lv) : mix(lv));
  const W = p.w, ink = p.style.ink;
  const fill = Math.max(0.02, lv) * (W - 16);
  const flash = falling ? interpolate(p.f % 18, [0, 4, 18], [0, 1, 0]) : 0;
  const lines = String(p.label ?? "").split("\n");
  return (
    <g transform={`translate(${p.x + shake} ${p.y})`}>
      {lines.map((l, i) => (
        <text key={i} x={0} y={-6 + (i - (lines.length - 1) / 2) * 34 + 12} fontFamily={p.style.font} fontWeight={900} fontSize={34} fill="#F4EAD5" stroke={ink} strokeWidth={6} paintOrder="stroke" letterSpacing={2}>{l}</text>
      ))}
      <g transform="translate(120 -33)">
        <rect x={-4} y={-4} width={W + 8} height={74} rx={37} fill="#F4EAD5" />
        <rect x={0} y={0} width={W} height={66} rx={33} fill="rgba(18,26,44,0.88)" stroke={ink} strokeWidth={5} />
        <rect x={8} y={8} width={fill} height={50} rx={25} fill={color} />
        {[0.25, 0.5, 0.75].map((q) => <rect key={q} x={8 + q * (W - 16)} y={8} width={4} height={50} fill="rgba(255,255,255,0.18)" />)}
        <rect x={0} y={0} width={W} height={66} rx={33} fill="#E5383B" opacity={flash * 0.45} />
      </g>
      {p.value !== undefined && p.value !== "" ? (
        <g transform={`translate(${120 + W + 22} -38)`}>
          <rect x={0} y={0} width={Math.max(120, String(p.value).length * 32 + 34)} height={76} rx={18} fill={p.value === "?" ? "#F4EAD5" : color} stroke={ink} strokeWidth={5} />
          <text x={Math.max(120, String(p.value).length * 32 + 34) / 2} y={55} textAnchor="middle" fontFamily={p.style.font} fontSize={50} fill={ink}>{p.value}</text>
        </g>
      ) : null}
    </g>
  );
}
