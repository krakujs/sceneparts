import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Org chart: one top box, 1-3 middle boxes and 1-4 bottom boxes joined by elbow lines. Each box has an avatar circle and a title.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const top = String(p.top ?? "CEO");
  const mids: string[] = (p.middle ?? []).slice(0, 3);
  const bots: string[] = (p.bottom ?? []).slice(0, 4);
  const m = Math.min(3, Math.max(1, mids.length));
  const b = Math.min(4, Math.max(1, bots.length));
  const TW = 300, MW = 260, BW = 220, BOX_H = 170;
  const yTop = -600, yBus1 = -390, yMid = -350, yBus2 = -115, yBot = -60;
  const mx = (j: number) => (j - (m - 1) / 2) * (MW + 60);
  const bx = (i: number) => (i - (b - 1) / 2) * (BW + 36);
  const parent = (i: number) => Math.min(m - 1, Math.floor((i * m) / b));

  // top -> middle bus
  const d1 = [`M0 ${yTop + BOX_H} V${yBus1}`, `M${mx(0)} ${yBus1} H${mx(m - 1)}`];
  for (let j = 0; j < m; j++) d1.push(`M${mx(j)} ${yBus1} V${yMid}`);
  // middle -> bottom buses, one per parent
  const d2: string[] = [];
  for (let j = 0; j < m; j++) {
    const kids = Array.from({ length: b }, (_, i) => i).filter((i) => parent(i) === j);
    if (!kids.length) continue;
    const xs = [mx(j), ...kids.map(bx)];
    d2.push(`M${mx(j)} ${yMid + BOX_H} V${yBus2}`, `M${Math.min(...xs)} ${yBus2} H${Math.max(...xs)}`);
    kids.forEach((i) => d2.push(`M${bx(i)} ${yBus2} V${yBot}`));
  }

  const box = (cx: number, ty: number, w: number, fill: string, tc: string, avatarFill: string, label: string, e: number, key: string) => (
    <g key={key} opacity={e} transform={`translate(0 ${(1 - e) * 14})`}>
      <rect x={cx - w / 2} y={ty} width={w} height={BOX_H} rx={24} fill={fill} stroke={u.ink} strokeWidth={5} />
      <circle cx={cx} cy={ty + 50} r={34} fill={avatarFill} stroke={u.ink} strokeWidth={4} />
      <Txt x={cx} y={ty + BOX_H - 34} u={u} size={36} weight={800} fill={tc} maxW={w - 28}>{label}</Txt>
    </g>
  );

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <g transform="translate(0 245)">
        <path d={d1.join(" ")} fill="none" stroke={u.ink} strokeWidth={6} strokeLinejoin="round" opacity={enter(p.f, f0 + 6, 10)} />
        <path d={d2.join(" ")} fill="none" stroke={u.ink} strokeWidth={6} strokeLinejoin="round" opacity={enter(p.f, f0 + 22, 10)} />
        {box(0, yTop, TW, u.accent, u.white, u.white, top, enter(p.f, f0, 10), "top")}
        {Array.from({ length: m }, (_, j) =>
          box(mx(j), yMid, MW, u.card, u.ink, u.soft, mids[j] ?? "", enter(p.f, f0 + 12 + j * 5, 10), `m${j}`)
        )}
        {Array.from({ length: b }, (_, i) =>
          box(bx(i), yBot, BW, u.card, u.ink, u.soft, bots[i] ?? "", enter(p.f, f0 + 26 + i * 2, 10), `b${i}`)
        )}
      </g>
    </g>
  );
}
