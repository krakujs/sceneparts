import React from "react";
import { clamp, ease, lerp, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Shine sweep: a diagonal white light band that sweeps across a w x h box centred on (x, y), then waits.
// It repeats every `every` frames. The clip path is clipped to the box and its id is built from x, y and seed.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const W = Math.max(20, Number(p.w ?? 600)), H = Math.max(20, Number(p.h ?? 400));
  const every = Math.max(12, Number(p.every ?? 48));
  const dur = clamp(Number(p.dur ?? 36), 6, every);
  const delay = Math.max(0, Number(p.delay ?? 6));
  const k = lf - delay;
  if (k < 0) return null;
  const ph = k % every;
  if (ph > dur) return null;
  const t = ease(ph / dur);
  const bw = W * 0.22;
  const cx = lerp(-W * 0.85, W * 0.85, t);
  const id = uid(`${x}_${y}_${p.seed ?? "a"}`);
  const clipId = `shine-clip-${id}`, gradId = `shine-grad-${id}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={18} />
        </clipPath>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={u.white} stopOpacity={0} />
          <stop offset="0.5" stopColor={u.white} stopOpacity={0.85} />
          <stop offset="1" stopColor={u.white} stopOpacity={0} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g transform="rotate(-18)">
          <rect x={cx - bw / 2} y={-H * 1.6} width={bw} height={H * 3.2} fill={`url(#${gradId})`} />
        </g>
      </g>
    </g>
  );
}
