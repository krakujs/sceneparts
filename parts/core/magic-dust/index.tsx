import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Magic dust: pastel glitter motes that spiral upward from (x, y) and fade out near the top.
// Each mote loops on its own timer, so the cloud keeps going without running dry. Pure function of the frame.

const PASTEL = ["#FF5FA2", "#38B6F5", "#9B6BFF", "#FFC21A", "#2FD18A", "#FF8A3D"];
const star = (R: number) => `M0 ${-R} Q0 0 ${R} 0 Q0 0 0 ${R} Q0 0 ${-R} 0 Q0 0 0 ${-R} Z`;

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "magic");
  const n = Math.round(clamp(Number(p.count ?? 46), 8, 80));
  const H = Number(p.height ?? 620);
  const spread = Number(p.r ?? 240);
  const master = clamp(lf / 12);
  const motes = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const L = 70 + q(0) * 50;
    const age = (lf + q(1) * L) % L;
    const ph = age / L;
    const a0 = q(2) * Math.PI * 2;
    const dir = q(3) < 0.5 ? -1 : 1;
    const ang = a0 + dir * ph * Math.PI * 3;
    const rad = spread * (0.25 + 0.75 * ph) * (0.5 + 0.5 * q(4));
    return {
      px: Math.cos(ang) * rad,
      py: -ph * H * (0.4 + 0.6 * q(5)),
      op: Math.sin(Math.PI * ph) * 0.95,
      size: 10 + q(6) * 14,
      c: PASTEL[i % PASTEL.length],
      spark: q(7) < 0.5,
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={master}>
      {motes.map((m, i) =>
        m.spark ? (
          <g key={i} transform={`translate(${m.px.toFixed(1)} ${m.py.toFixed(1)}) scale(${(m.size / 12).toFixed(3)})`} opacity={m.op.toFixed(3)}>
            <path d={star(12)} fill={m.c} stroke="#FFFFFF" strokeWidth={2.5} />
            <path d={star(4)} fill="#FFFFFF" />
          </g>
        ) : (
          <g key={i} opacity={m.op.toFixed(3)}>
            <circle cx={m.px.toFixed(1)} cy={m.py.toFixed(1)} r={m.size.toFixed(1)} fill={m.c} stroke="#FFFFFF" strokeWidth={2} />
            <circle cx={(m.px - m.size * 0.3).toFixed(1)} cy={(m.py - m.size * 0.3).toFixed(1)} r={(m.size * 0.3).toFixed(1)} fill="#FFFFFF" opacity={0.8} />
          </g>
        ),
      )}
    </g>
  );
}
