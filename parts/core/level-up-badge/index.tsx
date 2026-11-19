import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Game-style "LEVEL UP!" shield with the new level number, rays behind it and twinkling sparkles.
// x, y = centre.
const SHIELD = "M-230 -280 L230 -280 L230 20 Q230 190 0 290 Q-230 190 -230 20 Z";
const star4 = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r} Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const title = String(p.title ?? "LEVEL UP!");
  const level = String(p.level ?? 8);
  const k = popIn(p.f, at, 12);
  const eRays = enter(p.f, at, 20);
  const eSpark = enter(p.f, at + 8, 14);
  const rot = (p.f - at) * 0.6;

  // rays: alternating wedges turning slowly
  const N = 16, R = 560;
  const wedges: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    const a0 = ((Math.PI * 2 * i) / N) * 1 + (rot * Math.PI) / 180;
    const a1 = a0 + Math.PI / N;
    wedges.push(
      <path
        key={i}
        d={`M0 0 L${(Math.cos(a0) * R).toFixed(1)} ${(Math.sin(a0) * R).toFixed(1)} L${(Math.cos(a1) * R).toFixed(1)} ${(Math.sin(a1) * R).toFixed(1)} Z`}
        fill={i % 2 ? u.white : u.warn}
        opacity={0.3 * eRays}
      />,
    );
  }

  const sparks: [number, number][] = [[-300, -200], [300, -200], [-340, 60], [340, 60], [-150, 330], [150, 330]];
  const nSize = fitSize(level, 250, 270);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g>{wedges}</g>
      <g>
        <path d={SHIELD} fill={u.accent} stroke={u.ink} strokeWidth={12} strokeLinejoin="round" />
        <g transform="scale(0.86)">
          <path d={SHIELD} fill={u.card} stroke={u.ink} strokeWidth={8} strokeLinejoin="round" />
        </g>
        <Txt x={0} y={-110} u={u} size={58} weight={900} fill={u.accent} ls={10}>LV</Txt>
        <Txt x={0} y={130} u={u} size={nSize} weight={900}>{level}</Txt>
      </g>
      <Txt x={0} y={-330} u={u} size={112} weight={900} fill={u.white} stroke={u.ink} sw={14} maxW={940}>{title}</Txt>
      {sparks.map(([x, y], i) => {
        const sc = eSpark * Math.max(0.15, Math.sin((p.f + i * 9) * 0.22)) * 1.0;
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${sc.toFixed(3)})`}>
            <path d={star4(0, 0, 46)} fill={u.white} stroke={u.ink} strokeWidth={4 / Math.max(0.2, sc)} />
          </g>
        );
      })}
    </g>
  );
}
