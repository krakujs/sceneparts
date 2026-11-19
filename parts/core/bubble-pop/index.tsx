import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Bubble pop: a shiny soap bubble drifts up and wobbles more and more, then pops at popAt into a ring and a spray of droplets.
// The bubble is drawn with a radial sheen and a highlight; the droplets follow closed-form gravity arcs.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "bubble");
  const gid = `bubble-grad-${sd.replace(/[^a-zA-Z0-9]/g, "")}`;
  const R = Math.max(40, Number(p.size ?? 110));
  const POP = Number(p.popAt ?? 40);
  const water = "#7EC8F0";
  const bxAt = (t: number) => Math.sin(t * 0.07) * 18;
  const byAt = (t: number) => -t * 0.4;
  const alive = lf < POP;
  const amp = 0.03 + 0.05 * clamp(lf / POP);
  const wob = Math.sin(lf * 0.5) * amp;
  const pt = lf - POP;
  const px = bxAt(POP), py = byAt(POP);
  const ringR = R * 0.9 + 110 * ease(clamp(pt / 16));
  const ringOp = pt >= 0 ? 1 - clamp(pt / 18) : 0;
  const drops = Array.from({ length: 12 }, (_, i) => {
    const q = (k: number) => random(`${sd}-d${i}-${k}`);
    const a = (i / 12) * Math.PI * 2 + q(0) * 0.3;
    const v = 9 + q(1) * 7;
    const t = Math.max(0, pt);
    return {
      dx: Math.cos(a) * v * t,
      dy: Math.sin(a) * v * t - 4 * t + 0.35 * t * t,
      r: 9 + q(2) * 9,
      op: pt < 0 ? 0 : clamp(1 - (pt - 30) / 30),
    };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <radialGradient id={gid} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="35%" stopColor="#CFEFFF" stopOpacity={0.35} />
          <stop offset="100%" stopColor={water} stopOpacity={0.55} />
        </radialGradient>
      </defs>
      {alive ? (
        <g transform={`translate(${bxAt(lf).toFixed(1)} ${byAt(lf).toFixed(1)}) scale(${(1 + wob).toFixed(3)} ${(1 - wob).toFixed(3)})`}>
          <circle cx={0} cy={0} r={R} fill={`url(#${gid})`} stroke={u.ink} strokeWidth={6} />
          <path d={`M${(-R * 0.6).toFixed(1)} ${(-R * 0.1).toFixed(1)} Q${(-R * 0.7).toFixed(1)} ${(-R * 0.6).toFixed(1)} ${(-R * 0.1).toFixed(1)} ${(-R * 0.7).toFixed(1)}`}
            fill="none" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" opacity={0.7} />
          <circle cx={(R * 0.4).toFixed(1)} cy={(-R * 0.5).toFixed(1)} r={(R * 0.07).toFixed(1)} fill="#FFFFFF" />
        </g>
      ) : null}
      {pt >= 0 ? (
        <g transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`}>
          <circle cx={0} cy={0} r={ringR.toFixed(1)} fill="none" stroke={water} strokeWidth={(14 * ringOp + 2).toFixed(1)} opacity={ringOp.toFixed(3)} />
          {drops.map((d, i) => (
            <circle key={i} cx={d.dx.toFixed(1)} cy={d.dy.toFixed(1)} r={d.r.toFixed(1)} fill={water} stroke={u.ink} strokeWidth={3} opacity={d.op.toFixed(3)} />
          ))}
        </g>
      ) : null}
    </g>
  );
}
