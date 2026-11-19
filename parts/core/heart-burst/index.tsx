import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn } from "../stat-card/index";

// Heart burst: a big heart pops in at (x, y), then bursts into a spray of small hearts that drift outward,
// spin a little and fade. The burst is closed-form with drag, so any frame renders alone.

const HEART = "M0 40 C-60 -5 -55 -60 0 -22 C55 -60 60 -5 0 40 Z";

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "heart");
  const size = Math.max(60, Number(p.size ?? 260));
  const k = size / 120;
  const BURST = Number(p.burstAt ?? 12);
  const n = Math.round(clamp(Number(p.count ?? 20), 4, 40));
  const pop = popIn(lf, 0, 10);
  const bigOp = 1 - clamp((lf - BURST) / 8);
  const bt = lf - BURST;
  const TAU = 16;
  const decay = 1 - Math.exp(-Math.max(0, bt) / TAU);
  const colours = [u.accent, u.series[7], "#FF8FB1", "#FFB3C7"];
  const hearts = Array.from({ length: n }, (_, i) => {
    const q = (k2: number) => random(`${sd}-${i}-${k2}`);
    const a = q(0) * Math.PI * 2;
    const v = 10 + q(1) * 12;
    const t = Math.max(0, bt);
    const sc = (0.18 + q(2) * 0.22) * k * ease01(clamp(t / 6));
    return {
      dx: Math.cos(a) * v * TAU * decay,
      dy: Math.sin(a) * v * TAU * decay + 0.05 * t * t,
      sc,
      rot: q(3) * 60 - 30 + t * (q(4) - 0.5) * 4,
      c: colours[i % colours.length],
      op: bt < 0 ? 0 : 1 - clamp((bt - 36) / 30),
    };
  });
  const ring = clamp(bt / 12);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {bt >= 0 && ring < 1 ? (
        <circle cx={0} cy={0} r={(60 + 200 * ring).toFixed(1)} fill="none" stroke={u.accent} strokeWidth={10} opacity={(0.5 * (1 - ring)).toFixed(3)} />
      ) : null}
      {lf < BURST + 8 ? (
        <g transform={`scale(${(pop * (1 + 0.1 * Math.sin(lf * 0.8))).toFixed(3)})`} opacity={bigOp.toFixed(3)}>
          <g transform={`scale(${k.toFixed(3)})`}>
            <path d={HEART} fill={u.accent} stroke={u.ink} strokeWidth={9 / k} strokeLinejoin="round" />
          </g>
        </g>
      ) : null}
      {hearts.map((h, i) => (
        <g key={i} transform={`translate(${h.dx.toFixed(1)} ${h.dy.toFixed(1)}) rotate(${h.rot.toFixed(1)}) scale(${h.sc.toFixed(3)})`} opacity={h.op.toFixed(3)}>
          <path d={HEART} fill={h.c} stroke={u.ink} strokeWidth={3 / Math.max(h.sc, 0.01)} strokeLinejoin="round" />
        </g>
      ))}
    </g>
  );
}

function ease01(t: number) {
  return 1 - Math.pow(1 - clamp(t), 3);
}
