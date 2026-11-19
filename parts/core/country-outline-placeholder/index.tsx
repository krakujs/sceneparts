import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Generic land-mass placeholder for "insert country here": an irregular blob (not any real country) with a dashed
// border, a fill, a name and a capital star. x,y = centre; s scales it (about 600 px wide at s = 1).
/* eslint-disable @typescript-eslint/no-explicit-any */
type V = [number, number];
const BLOB: V[] = [[-0.85, -0.1], [-0.7, -0.55], [-0.3, -0.62], [0.05, -0.8], [0.5, -0.7], [0.82, -0.35], [0.7, 0.05], [0.9, 0.35], [0.45, 0.55], [0.15, 0.42], [-0.2, 0.72], [-0.6, 0.5], [-0.78, 0.2]];
const R = 340;

const smooth = (P: V[]) => {
  const n = P.length;
  let d = `M${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d + " Z";
};

const STAR: V[] = Array.from({ length: 10 }, (_, i): V => {
  const a = -Math.PI / 2 + (i * Math.PI) / 5;
  const r = i % 2 === 0 ? 36 : 15;
  return [r * Math.cos(a), r * Math.sin(a)];
});

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const k = popIn(p.f, at, 16);
  const name = String(p.name ?? "Country name");
  const capital = String(p.capital ?? "Capital");
  const pulse = 1 + 0.06 * (0.5 + 0.5 * Math.sin((p.f - at) * 0.15));
  const pts = BLOB.map(([x, y]): V => [x * R, y * R]);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      <g transform={`scale(${k})`}>
        <path d={smooth(pts)} fill={u.accent} fillOpacity={0.18} stroke={u.accent} strokeWidth={9} strokeLinejoin="round"
          strokeDasharray="26 18" strokeDashoffset={-(p.f - at) * 0.6} />
        <Txt x={0} y={44} u={u} size={fitSize(name, 72, 460)} weight={900}>{name}</Txt>
        <g transform={`translate(0 -70) scale(${pulse})`}>
          <path d={`M${STAR.map(([x, y]) => `${x} ${y}`).join(" L")} Z`} fill={u.warn} stroke={u.ink} strokeWidth={5} strokeLinejoin="round" />
        </g>
        <Txt x={0} y={-118} u={u} size={36} weight={700} fill={u.muted}>{capital}</Txt>
      </g>
    </g>
  );
}
