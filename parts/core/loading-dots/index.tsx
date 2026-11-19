import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, enter, Txt } from "../stat-card/index";

// Loading indicator: n dots (default 3) that pop in one after another and bounce in sequence, with an optional label.
// x, y = centre of the dot row.
const GAP = 84, R = 30, PERIOD = 36;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const n = Math.max(1, Math.min(8, Math.round(Number(p.n ?? 3))));
  const label = p.label === undefined ? "Loading" : String(p.label);
  const eLabel = enter(p.f, at + 12, 14);

  const dots: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const x = (i - (n - 1) / 2) * GAP;
    const phase = ((p.f - at) * Math.PI * 2) / PERIOD - i * 0.7;
    const wave = Math.max(0, Math.sin(phase));
    const bounce = -wave * 30;
    const scale = popIn(p.f, at + i * 4, 10) * (1 + 0.12 * wave);
    dots.push(
      <circle key={i} cx={x} cy={bounce} r={R * scale} fill={u.accent} stroke={u.ink} strokeWidth={5} />,
    );
  }

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {dots}
      {label ? (
        <g opacity={eLabel}>
          <Txt x={0} y={118} u={u} size={40} weight={800} fill={u.ink} ls={2}>{label}</Txt>
        </g>
      ) : null}
    </g>
  );
}
