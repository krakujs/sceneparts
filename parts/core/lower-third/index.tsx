import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, fitSize, Card, Txt } from "../stat-card/index";

// Broadcast name strap. x = left edge, y = top edge. The accent bar wipes down,
// then a card grows out of it and the name and role slide in.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const H = 150, BAR = 24;
  const name = String(p.name ?? "Alex Morgan");
  const role = String(p.role ?? "Correspondent");
  const nameSize = fitSize(name, 66, 800);
  const roleSize = fitSize(role, 36, 800);
  const W = Math.round(Math.min(860, Math.max(360, Math.max(name.length * nameSize * 0.6, role.length * roleSize * 0.6) + 84)));
  const eBar = enter(p.f, at, 12);
  const eCard = enter(p.f, at + 10, 18);
  const eText = enter(p.f, at + 20, 16);
  const shift = (1 - eText) * -30;
  return (
    <g transform={`translate(${p.x ?? 60} ${p.y ?? 1500}) scale(${p.s ?? 1})`}>
      <Card x={BAR} y={0} w={Math.max(1, W * eCard)} h={H} u={u} r={16} sw={5} />
      <rect x={0} y={H * (1 - eBar)} width={BAR} height={Math.max(0.01, H * eBar)} fill={u.accent} />
      <g opacity={eText}>
        <Txt x={BAR + 40 + shift} y={80} u={u} size={nameSize} weight={900} anchor="start" maxW={W - 70}>{name}</Txt>
        <Txt x={BAR + 40 + shift} y={124} u={u} size={roleSize} weight={700} anchor="start" fill={u.accent} maxW={W - 70}>{role}</Txt>
      </g>
    </g>
  );
}
