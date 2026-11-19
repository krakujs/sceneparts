import React from "react";
import { clamp, ease, type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, Txt } from "../stat-card/index";

// Small pill "NEW" badge: pops in, then a shine sweeps across it every few seconds. x, y = centre.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const text = String(p.text ?? "NEW").toUpperCase();
  const H = 84, SIZE = 46;
  const W = Math.round(Math.max(200, text.length * SIZE * 0.66 + 80));
  const k = popIn(p.f, at, 10);
  const clipId = `new-badge-clip-${W}`;

  // shine: 26 frames of sweep, then a pause of about 54 frames, repeated
  const PERIOD = 80, SWEEP = 26;
  const rel = p.f - at - 14;
  const phase = ((rel % PERIOD) + PERIOD) % PERIOD;
  const sx = -W / 2 - 60 + (W + 120) * ease(clamp(phase / SWEEP));
  const shineOn = phase < SWEEP;

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} />
        </clipPath>
      </defs>
      <rect x={-W / 2 + 6} y={-H / 2 + 10} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.2)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.accent} stroke={u.ink} strokeWidth={6} />
      <g clipPath={`url(#${clipId})`}>
        {shineOn ? (
          <polygon
            points={`${sx},${-H / 2 - 10} ${sx + 34},${-H / 2 - 10} ${sx + 64},${H / 2 + 10} ${sx + 30},${H / 2 + 10}`}
            fill={u.white}
            opacity={0.6}
          />
        ) : null}
      </g>
      <Txt x={0} y={SIZE * 0.36} u={u} size={SIZE} weight={900} fill={u.white} ls={3}>{text}</Txt>
    </g>
  );
}
