import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Glitch text: cyan and magenta offset copies (RGB split) plus horizontal slices that jump sideways in flickering bursts.
// Slices are hard-edged gradient bands on the copies (no clipPath).

const seg = (p0: number, p1: number): [number, number][] => {
  const a = Math.min(1, Math.max(0, p0)), b = Math.min(1, Math.max(0, p1));
  if (b <= a) return [[0, 0], [1, 0]];
  return [[0, 0], [a, 0], [Math.min(1, a + 0.0001), 1], [b, 1], [Math.min(1, b + 0.0001), 0], [1, 0]];
};
const vramp = (id: string, color: string, a: number, b: number) => (
  <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={0} y1={a} x2={0} y2={b}>
    {[[0, 0], [0.0001, 1], [1, 1], [1, 0]].map(([o, op], i) => <stop key={i} offset={o} stopColor={color} stopOpacity={op} />)}
  </linearGradient>
);

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const text = String(p.text ?? "");
  const sz = fitSize(text, Number(p.size ?? 140), 960, 0.8);
  const uid = String(p.seed ?? "glitch").replace(/[^a-zA-Z0-9]/g, "") || "glitch";
  const g = Math.floor(lf / 3);
  const hot = lf < 8 || random(`${uid}-hot-${g}`) > 0.7;
  const off = (hot ? 0.09 : 0.025) * sz;
  const bands = hot ? [0, 1, 2] : [];
  const base = sz * 0.35;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <text x={-off} y={base} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} fill="#00E5FF" opacity={0.9}>{text}</text>
      <text x={off} y={base} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} fill="#FF2D95" opacity={0.9}>{text}</text>
      <text x={0} y={base} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} fill={u.accent} stroke={u.ink}
        strokeWidth={sz * 0.05} paintOrder="stroke" strokeLinejoin="round">{text}</text>
      {bands.map((k) => {
        const by = -sz * 0.45 + random(`${uid}-b${k}-${g}`) * sz * 0.9;
        const h = sz * 0.2;
        const dx = (random(`${uid}-d${k}-${g}`) - 0.5) * sz * 0.9;
        return (
          <g key={k}>
            <defs>
              {vramp(`${uid}-bf${k}`, u.white, by, by + h)}
              {vramp(`${uid}-bs${k}`, u.ink, by, by + h)}
            </defs>
            <text x={dx} y={base} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz}
              fill={`url(#${uid}-bf${k})`} stroke={`url(#${uid}-bs${k})`} strokeWidth={sz * 0.05} paintOrder="stroke">{text}</text>
          </g>
        );
      })}
    </g>
  );
}
