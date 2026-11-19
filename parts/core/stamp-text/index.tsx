import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, fitSize } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Stamp text: a rubber-stamp word in a rough box that slams down rotated, leaving ink speckle on impact.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const word = String(p.text ?? "").toUpperCase();
  const sz = fitSize(word, Number(p.size ?? 150), 900, 0.78);
  const uid = String(p.seed ?? "stamp").replace(/[^a-zA-Z0-9]/g, "") || "stamp";
  const W = word.length * sz * 0.78 + sz * 0.6;
  const H = sz * 1.6;
  const impact = 8;
  const t = Math.min(1, lf / impact);
  const sc = t < 1 ? 1 + 1.4 * (1 - t) * (1 - t) : 1;
  const op = Math.min(1, lf / 3);
  // Rough border: four sides with a little deterministic wobble.
  const side = (x1: number, y1: number, x2: number, y2: number, id: string) => {
    const pts: string[] = [];
    const horiz = y1 === y2;
    for (let k = 0; k <= 6; k++) {
      const q = k / 6;
      const j = (random(`${uid}-${id}-${k}`) - 0.5) * sz * 0.06;
      pts.push(`${(x1 + (x2 - x1) * q + (horiz ? 0 : j)).toFixed(1)} ${(y1 + (y2 - y1) * q + (horiz ? j : 0)).toFixed(1)}`);
    }
    return pts;
  };
  const pts = [
    ...side(-W / 2, -H / 2, W / 2, -H / 2, "t"),
    ...side(W / 2, -H / 2, W / 2, H / 2, "r"),
    ...side(W / 2, H / 2, -W / 2, H / 2, "b"),
    ...side(-W / 2, H / 2, -W / 2, -H / 2, "l"),
  ];
  const d = "M" + pts.join(" L") + " Z";
  const speck = lf >= impact ? Array.from({ length: 18 }, (_, i) => {
    const cx = (random(`${uid}-sx-${i}`) - 0.5) * W * 0.95;
    const cy = (random(`${uid}-sy-${i}`) - 0.5) * H * 0.95;
    const r = sz * (0.015 + random(`${uid}-sr-${i}`) * 0.035);
    return <circle key={i} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r={r.toFixed(1)} fill={u.white} opacity={0.85} />;
  }) : null;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1}) rotate(-7) scale(${sc.toFixed(3)})`} opacity={op}>
      <path d={d} fill="none" stroke={u.accent} strokeWidth={sz * 0.07} strokeLinejoin="round" strokeLinecap="round" />
      <text x={0} y={sz * 0.35} textAnchor="middle" fontFamily={u.font} fontWeight={900} fontSize={sz} letterSpacing={sz * 0.04}
        fill={u.accent} fillOpacity={0.94}>{word}</text>
      {speck}
    </g>
  );
}
