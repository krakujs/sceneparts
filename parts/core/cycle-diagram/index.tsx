import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { popIn, ui, startFrame, enter, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Cycle diagram: 3-6 nodes on a circle joined by curved arrows that run round the loop. The arrows sway slowly once drawn.
const wrap = (t: string, size: number, maxW: number) => {
  const per = Math.max(4, Math.floor(maxW / (size * 0.56)));
  const out: string[] = [];
  let cur = "";
  for (const w of String(t ?? "").split(/\s+/).filter(Boolean)) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > per && cur) { out.push(cur); cur = w; } else cur = next;
  }
  if (cur) out.push(cur);
  return out.length ? out : [""];
};

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const nodes: string[] = (p.nodes ?? []).slice(0, 6);
  const n = clamp(nodes.length, 3, 6);
  const R = 300, NR = 96;
  const ang = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const P = (a: number, r = R) => [r * Math.cos(a), r * Math.sin(a)];
  const half = Math.asin(Math.min(0.9, (NR + 14) / R));
  // gentle sway of the arrow ring (+-4 degrees), so the arrows stay attached to the nodes
  const sway = f0 < p.f ? Math.sin(((p.f - f0) / 40) * Math.PI) * 4 : 0;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <g transform={`rotate(${sway})`}>
        {Array.from({ length: n }, (_, i) => {
          const a0 = ang(i) + half + 0.04;
          const a1 = ang(i + 1) - half - 0.04;
          const [x0, y0] = P(a0), [x1, y1] = P(a1);
          const large = a1 - a0 > Math.PI ? 1 : 0;
          const dr = enter(p.f, f0 + 10 + i * 4, 10);
          // arrowhead at the end of the arc, pointing along the direction of travel
          const tx = -Math.sin(a1), ty = Math.cos(a1), nx = Math.cos(a1), ny = Math.sin(a1);
          const tipX = x1 + tx * 18, tipY = y1 + ty * 18;
          return (
            <g key={i} opacity={Math.max(0.001, dr)}>
              <DrawPath d={`M${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1}`} fill="none" stroke={u.ink} strokeWidth={9}
                strokeLinecap="round" k={dr} />
              <path d={`M${x1 + nx * 14} ${y1 + ny * 14} L${x1 - nx * 14} ${y1 - ny * 14} L${tipX} ${tipY} Z`} fill={u.ink} />
            </g>
          );
        })}
      </g>
      {nodes.slice(0, n).map((label, i) => {
        const [x, y] = P(ang(i));
        const lines = wrap(label, 38, NR * 1.6);
        const L = lines.length;
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${popIn(p.f, f0 + 3 + i * 4, 8)})`}>
            <circle r={NR} fill={u.series[i % u.series.length]} stroke={u.ink} strokeWidth={6} />
            {lines.map((l, j) => (
              <Txt key={j} x={0} y={(j - (L - 1) / 2) * 44 + 14} u={u} size={38} weight={900} fill={u.white} stroke={u.ink} sw={6} maxW={NR * 1.6}>{l}</Txt>
            ))}
          </g>
        );
      })}
      <Txt x={0} y={14} u={u} size={50} weight={900} maxW={260} opacity={enter(p.f, f0 + 6, 12)} fill={u.ink}>{p.center ?? "Repeat"}</Txt>
    </g>
  );
}
