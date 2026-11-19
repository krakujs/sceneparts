import React from "react";
import { clamp, ease, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Rotate spin: a spiral-wedge transition. A coloured sector sweeps round the pivot like a clock hand until the
// frame is covered (mode in) or cleared (mode out). A second sector trails 22 degrees behind in the accent
// colour, which gives the spiral look. Sectors are exact SVG arcs, so the geometry is reliable.

const R = 1600;

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const c = String(p.color || base.ink);
  const cx = Number(p.x ?? 540), cy = Number(p.y ?? 960);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(8, Number(p.len ?? 28));
  const prog = ease(clamp(lf / len));
  const k = out ? 1 - prog : prog;
  const sweep = 400 * k;          // total sweep in degrees, clockwise from 12 o'clock
  if (sweep <= 0.5) return null;
  if (sweep >= 360) return <rect x={-40} y={-40} width={1160} height={2000} fill={c} />;
  const sector = (deg: number) => {
    const a = (deg - 90) * (Math.PI / 180);
    const x1 = cx + R * Math.cos(-Math.PI / 2), y1 = cy + R * Math.sin(-Math.PI / 2);
    const x2 = cx + R * Math.cos(a), y2 = cy + R * Math.sin(a);
    const large = deg > 180 ? 1 : 0;
    return `M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
  };
  const trail = Math.max(0, sweep - 22);
  return (
    <g>
      <path d={sector(sweep)} fill={base.accent} />
      {trail > 0.5 ? <path d={sector(trail)} fill={c} /> : null}
    </g>
  );
}
