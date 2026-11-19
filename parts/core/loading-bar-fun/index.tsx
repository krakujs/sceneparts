import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, fitSize, Txt } from "../stat-card/index";

// Loading bar fun: a chunky striped bar with moving diagonal stripes, a percentage that counts up and a playful label that changes.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const labels = String(p.labels ?? "loading brain...|warming up the snacks|almost there")
    .split("|").map((s) => s.trim()).filter(Boolean);
  const W = p.w ?? 880, H = 120;
  const len = Number(p.len ?? 90);
  const t = Math.max(0, p.f - at);
  const prog = Math.min(1, t / len);
  const pct = Math.round(prog * 100);
  const li = Math.min(labels.length - 1, Math.floor(prog * labels.length));
  const label = labels[Math.max(0, li)] ?? "";
  const e = enter(p.f, at, 10);
  const pid = `lbf-${Math.round(p.x ?? 540)}-${Math.round(p.y ?? 960)}`;
  const inner = { x: -W / 2 + 10, y: -H / 2 + 10, h: H - 20 };
  const fillW = Math.max(0, (W - 20) * prog);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * (0.9 + 0.1 * e)})`} opacity={e}>
      <defs>
        <pattern id={pid} patternUnits="userSpaceOnUse" width={56} height={56} patternTransform={`translate(${(t * 3) % 56} 0) rotate(-45)`}>
          <rect x={0} y={0} width={28} height={56} fill="rgba(255,255,255,0.32)" />
        </pattern>
      </defs>
      <Txt x={0} y={-H / 2 - 40} u={u} size={72} weight={900}>{pct + "%"}</Txt>
      <rect x={-W / 2 + 6} y={-H / 2 + 12} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.soft} stroke={u.ink} strokeWidth={6} />
      <rect x={inner.x} y={inner.y} width={fillW} height={inner.h} rx={inner.h / 2} fill={p.color ?? u.accent} />
      <rect x={inner.x} y={inner.y} width={fillW} height={inner.h} rx={inner.h / 2} fill={`url(#${pid})`} />
      <Txt x={0} y={H / 2 + 90} u={u} size={fitSize(label, 50, W)} weight={800}>{label}</Txt>
    </g>
  );
}
