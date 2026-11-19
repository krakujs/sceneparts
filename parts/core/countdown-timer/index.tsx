import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Txt } from "../stat-card/index";

// Big countdown inside a ring that empties: counts from `from` seconds to 0 over the shot (or over `len` frames).
// The last 3 seconds turn red and pulse. x,y = centre.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  if (p.f < at) return <g />;
  const s = p.s ?? 1;
  const dur = Math.max(1, Number(p.len ?? p.d - at));
  const from = Math.max(1, Number(p.from ?? 10));
  const t = clamp((p.f - at) / dur);
  const rem = from * (1 - t);
  const n = Math.max(0, Math.ceil(rem - 1e-6));
  const hot = rem <= 3 && rem > 0;
  const pulse = hot ? 1 + 0.06 * (0.5 + 0.5 * Math.sin(p.f * 0.9)) : 1;
  const R = 200, C = 2 * Math.PI * R;
  const frac = rem / from;
  const digits = String(n);
  const size = fitSize(digits, 300, 300);
  const k = popIn(p.f, at, 12);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s * k})`}>
      <circle cx={0} cy={0} r={R + 17} fill="none" stroke={u.ink} strokeWidth={6} />
      <circle cx={0} cy={0} r={R} fill={u.card} />
      <circle cx={0} cy={0} r={R} fill="none" stroke={u.soft} strokeWidth={34} />
      <circle cx={0} cy={0} r={R} fill="none" stroke={hot ? u.bad : u.accent} strokeWidth={34}
        strokeDasharray={`${C * frac} ${C}`} transform="rotate(-90)" />
      <g transform={`scale(${pulse})`}>
        <Txt x={0} y={size * 0.36} u={u} size={size} weight={900} fill={hot ? u.bad : u.ink}>{digits}</Txt>
        <Txt x={0} y={150} u={u} size={36} weight={700} fill={u.muted}>{String(p.label ?? "seconds")}</Txt>
      </g>
    </g>
  );
}
