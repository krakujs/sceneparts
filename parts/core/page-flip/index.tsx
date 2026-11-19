import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Page flip: a paper page hinged on the left edge sweeps across the frame like a book page turning.
// Its free edge bows outward (a curl) and soft shadows fall along the fold.
// mode "in": the page turns in from the left and covers the frame. mode "out": it starts covering and turns away.

const join = (pts: [number, number][], dx = 0) => pts.map(([x, y]) => `${(x + dx).toFixed(1)} ${y}`).join(" L");

export default function Part(p: PartProps<any>) {
  const u = ui(p.style);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(8, Number(p.len ?? 30));
  const prog = ease(clamp(lf / len));
  const xe = out ? lerp(1080, 0, prog) : lerp(0, 1080, prog);
  if (xe <= 2) return null;
  const pts: [number, number][] = [];
  for (let y = -40; y <= 1960; y += 80) pts.push([xe + 48 * Math.sin((Math.PI * (y + 40)) / 2000), y]);
  const pageD = `M-40 -40 L${join(pts)} L-40 1960 Z`;
  const back = [...pts].reverse();
  const strip = (w: number) => `M${join(pts)} L${join(back, w)} Z`;
  const lines: React.ReactElement[] = [];
  if (xe > 200) {
    const w = Math.min(880, xe - 160);
    for (let i = 0; i < 18; i++) {
      lines.push(<rect key={i} x={110} y={180 + i * 90} width={w * (i % 5 === 4 ? 0.6 : 1)} height={6} rx={3} fill={u.ink} opacity={0.12} />);
    }
  }
  return (
    <g>
      <path d={strip(120)} fill={u.ink} opacity={0.1} />
      <path d={strip(52)} fill={u.ink} opacity={0.14} />
      <path d={pageD} fill={u.card} />
      {lines}
      <path d={`M${join(pts)}`} fill="none" stroke="#ffffff" strokeWidth={3} opacity={0.7} />
    </g>
  );
}
