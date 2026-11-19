import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Wipe right: a solid panel sweeps across the frame from left to right, with a soft leading edge and a thin accent line.
// Same geometry as core/wipe-left, mirrored across the frame's centre line.
// mode "in": the panel enters from the left and covers the frame. mode "out": it starts covering and leaves to the right.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");

export default function Part(p: PartProps<any>) {
  const base = ui(p.style);
  const c = String(p.color || base.ink);
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(4, Number(p.len ?? 20));
  const prog = ease(clamp(lf / len));
  const cov = out ? 1 - prog : prog;
  if (cov <= 0.001) return null;
  if (cov >= 0.999) return <rect x={-40} y={-40} width={1160} height={2000} fill={c} />;
  const soft = 90;
  const id = `wr-${uid(c)}-${out ? "o" : "i"}`;
  if (!out) {
    const xe = lerp(1140, -40, cov);
    return (
      <g transform="translate(1080 0) scale(-1 1)">
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={c} stopOpacity={0} />
            <stop offset="1" stopColor={c} stopOpacity={1} />
          </linearGradient>
        </defs>
        <rect x={xe + soft} y={-40} width={1200 - xe} height={2000} fill={c} />
        <rect x={xe} y={-40} width={soft} height={2000} fill={`url(#${id})`} />
        <rect x={xe + soft} y={-40} width={6} height={2000} fill={base.accent} />
        <rect x={xe + soft + 18} y={-40} width={2} height={2000} fill={base.accent} opacity={0.7} />
      </g>
    );
  }
  const xr = lerp(1140, -40, 1 - cov);
  return (
    <g transform="translate(1080 0) scale(-1 1)">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={c} stopOpacity={1} />
          <stop offset="1" stopColor={c} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={-40} y={-40} width={xr - soft + 40} height={2000} fill={c} />
      <rect x={xr - soft} y={-40} width={soft} height={2000} fill={`url(#${id})`} />
      <rect x={xr - 6} y={-40} width={6} height={2000} fill={base.accent} />
    </g>
  );
}
