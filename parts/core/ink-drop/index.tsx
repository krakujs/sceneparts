import React from "react";
import { clamp, ease, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Ink drop: a drop of ink falls from above (x, y), hits after 14 frames and blooms into a soft ink cloud,
// with rings spreading across the surface. The fall is gravity-accurate; the bloom is closed-form.

const T = 14; // frames to fall

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const sd = String(p.seed ?? "ink");
  const ink = p.color ?? u.ink;
  const gid = `ink-blur-${sd.replace(/[^a-zA-Z0-9]/g, "")}`;
  const D = Math.max(100, Number(p.drop ?? 620));
  const g = (2 * D) / (T * T);
  const fallT = Math.min(lf, T);
  const dropY = -D + 0.5 * g * fallT * fallT;
  const t = lf - T;
  const cloudOp = 1 - 0.3 * clamp((t - 40) / 40);
  const blobs = Array.from({ length: 9 }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const a = q(0) * Math.PI * 2;
    const dist = 110 * (0.5 + q(1)) * ease(clamp(t / 22));
    const r = (60 + q(2) * 90) * ease(clamp(t / 30));
    return { cx: Math.cos(a) * dist, cy: Math.sin(a) * dist, r };
  });
  const rings = [0, 1, 2].map((i) => {
    const tt = t - i * 5;
    const prog = clamp(tt / 45);
    return { rx: 30 + 340 * ease(prog), op: tt > 0 ? (1 - prog) * 0.7 : 0, sw: 6 * (1 - prog) + 2 };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <filter id={gid} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      {rings.map((r, i) => (
        <ellipse key={i} cx={0} cy={0} rx={r.rx.toFixed(1)} ry={(r.rx * 0.32).toFixed(1)} fill="none" stroke={ink} strokeWidth={r.sw.toFixed(1)} opacity={r.op.toFixed(3)} />
      ))}
      {t >= 0 ? (
        <g opacity={cloudOp.toFixed(3)}>
          <g filter={`url(#${gid})`} fill={ink}>
            {blobs.map((b, i) => <circle key={i} cx={b.cx.toFixed(1)} cy={b.cy.toFixed(1)} r={b.r.toFixed(1)} />)}
          </g>
          <circle cx={0} cy={0} r={(90 * ease(clamp(t / 14))).toFixed(1)} fill={ink} />
        </g>
      ) : null}
      {lf < T ? (
        <g transform={`translate(0 ${(dropY - 0).toFixed(1)}) scale(1 ${(1 + 0.25 * fallT / T).toFixed(3)})`}>
          <path d="M0 -60 C10 -36 28 -20 28 0 A28 28 0 0 1 -28 0 C-28 -20 -10 -36 0 -60 Z" fill={ink} />
        </g>
      ) : null}
    </g>
  );
}
