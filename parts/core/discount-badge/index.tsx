import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Round starburst seal, e.g. "-30%" with a "SALE" tag. The starburst spins in and then turns slowly.
// The text stays upright. x, y = centre.
const starPath = (R: number, N: number, inner: number) => {
  const pts: string[] = [];
  for (let i = 0; i < N * 2; i++) {
    const r = i % 2 ? R * inner : R;
    const a = (Math.PI * i) / N - Math.PI / 2;
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const text = String(p.text ?? "-30%");
  const label = String(p.label ?? "SALE").toUpperCase();
  const R = 300;
  const k = popIn(p.f, at, 14);
  const eSpin = enter(p.f, at, 30);
  const idle = Math.max(0, p.f - at - 30) * 0.3;
  const rot = (1 - eSpin) * -420 + idle;
  const vSize = fitSize(text, 150, 300);
  const eLabel = enter(p.f, at + 14, 12);

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g transform={`rotate(${rot.toFixed(2)})`}>
        <path d={starPath(R, 18, 0.88)} fill={u.accent} stroke={u.ink} strokeWidth={10} strokeLinejoin="round" />
      </g>
      <circle r={R * 0.8} fill="none" stroke={u.white} strokeWidth={6} strokeDasharray="18 14" opacity={0.9} />
      <circle r={R * 0.7} fill={u.card} stroke={u.ink} strokeWidth={6} />
      <Txt x={0} y={26} u={u} size={vSize} weight={900} fill={u.accent}>{text}</Txt>
      <g opacity={eLabel}>
        <rect x={-110} y={58} width={220} height={66} rx={33} fill={u.ink} />
        <Txt x={0} y={104} u={u} size={46} weight={900} fill={u.white} ls={8}>{label}</Txt>
      </g>
    </g>
  );
}
