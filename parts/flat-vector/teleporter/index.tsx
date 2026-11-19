import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Teleporter: a round floor pad with glowing rings, a tall light column and particles that rise from the pad.
// anim "beam": the column pulses and the particles keep rising. Scenery: origin = floor centre; column ~1000 px tall.
const METAL = "#4A5268", METAL_L = "#9AA3B5";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, color = "#6EF2E0", anim = "beam" } = p as any;
  const on = anim === "beam";
  const pulse = on ? 0.75 + 0.25 * Math.sin(f / 7) : 0.9;
  const particles = Array.from({ length: 28 }, (_, i) => {
    const prog = on ? (f * 0.012 + i / 28) % 1 : i / 28;
    const yy = -20 - prog * 960;
    const xx = Math.sin(i * 2.7) * (100 - 45 * prog);
    const r = 3 + (i % 3) * 1.6;
    const op = Math.sin(Math.PI * prog) * 0.9;
    return <circle key={i} cx={xx} cy={yy} r={r} fill={i % 4 === 0 ? C.white : color} opacity={op} />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <linearGradient id="teleporter-column" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={color} stopOpacity={0.8} />
          <stop offset="0.6" stopColor={color} stopOpacity={0.3} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* pad */}
      <ellipse cx={0} cy={6} rx={340} ry={70} fill={C.shadow} />
      <ellipse cx={0} cy={0} rx={330} ry={66} fill={METAL} />
      <ellipse cx={0} cy={-10} rx={310} ry={56} fill={METAL_L} />
      <ellipse cx={0} cy={-10} rx={262} ry={46} fill={shade(METAL_L, 0.3)} />
      {[200, 140, 80].map((r, i) => (
        <ellipse key={r} cx={0} cy={-10} rx={r} ry={r * 0.17} fill="none" stroke={color} strokeWidth={6} opacity={pulse * (1 - i * 0.15)} />
      ))}
      <ellipse cx={0} cy={-10} rx={60} ry={11} fill={color} opacity={0.9 * pulse} />
      {/* light column */}
      <rect x={-130} y={-1000} width={260} height={1000} fill="url(#teleporter-column)" opacity={pulse} />
      <rect x={-36} y={-1000} width={72} height={1000} fill={C.white} opacity={0.35 * pulse} />
      <ellipse cx={0} cy={-1000} rx={130} ry={24} fill={color} opacity={0.3 * pulse} />
      {particles}
    </g>
  );
}
