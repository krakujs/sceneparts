import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, popIn, fitSize, Card, Txt } from "../stat-card/index";

// Top five countdown: a huge "#5 ... #1" card that counts down over the shot; each number punches in with its title.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const t = p.f - at;
  if (t < 0) return null;
  const N = Math.min(10, Math.max(5, Math.round(Number(p.from ?? 5))));
  const step = Number(p.step ?? 40);
  const titles = String(p.items ?? "Weirdest|Strangest|Scariest|Funniest|Best").split("|").map((s) => s.trim());
  const j = Math.min(N - 1, Math.floor(t / step));
  const k = N - j;
  const lt = t - j * step;
  const sc = popIn(lt, 0, 10);
  const label = "#" + k;
  const fs = fitSize(label, 380, 800, 0.62);
  const title = titles[j] || "Number " + k;
  const tfs = fitSize(title, 66, 800);
  const W = 900, H = 760;
  const eT = Math.min(1, Math.max(0, (lt - 6) / 10));
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Card x={-W / 2} y={-H / 2} w={W} h={H} u={u} r={44} fill={p.color ?? u.accent} />
      <Txt x={0} y={-H / 2 + 92} u={u} size={52} weight={900} fill={u.white} ls={4}>{"TOP " + N}</Txt>
      <g transform={`translate(0 -20) scale(${sc})`}>
        <Txt x={0} y={fs * 0.36} u={u} size={fs} weight={900} fill={u.white} stroke={u.ink} sw={14}>{label}</Txt>
      </g>
      <g opacity={eT}>
        <Txt x={0} y={250} u={u} size={tfs} weight={800} fill={u.white} maxW={800}>{title}</Txt>
      </g>
    </g>
  );
}
