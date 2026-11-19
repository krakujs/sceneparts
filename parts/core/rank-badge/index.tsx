import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Medal badge with a rank number (#1), a short label and simple laurel leaves. tier = gold, silver or bronze.
// x, y = centre.
const METALS: Record<string, string> = { gold: "#E8B730", silver: "#C0C6CF", bronze: "#C98A4B" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const metal = METALS[String(p.tier ?? "gold")] ?? METALS.gold;
  const rank = `#${Math.max(0, Math.round(Number(p.rank ?? 1)))}`;
  const label = String(p.label ?? "TOP").toUpperCase();
  const RL = 262;
  const k = popIn(p.f, at, 12);
  const eTails = enter(p.f, at + 4, 14);
  const eLabel = enter(p.f, at + 14, 12);
  const nSize = fitSize(rank, 150, 270);

  // laurel: leaves along an arc on the left, mirrored for the right
  const leaves: React.ReactNode[] = [];
  for (let i = 0; i < 6; i++) {
    const th = 120 + i * 22;
    const rad = (th * Math.PI) / 180;
    const cx = RL * Math.cos(rad), cy = RL * Math.sin(rad);
    const e = popIn(p.f, at + 6 + i * 3, 10);
    leaves.push(
      <g key={i} transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${th + 90 + 25}) scale(${e})`}>
        <ellipse rx={36} ry={15} fill={u.good} stroke={u.ink} strokeWidth={4} />
      </g>,
    );
  }

  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${(p.s ?? 1) * k})`}>
      <g opacity={eTails} transform={`translate(0 ${(1 - eTails) * -40})`}>
        <path d="M-120 120 L-30 120 L-52 318 L-86 282 L-120 318 Z" fill={u.accent} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M120 120 L30 120 L52 318 L86 282 L120 318 Z" fill={u.accent} stroke={u.ink} strokeWidth={6} strokeLinejoin="round" />
      </g>
      <g>{leaves}</g>
      <g transform="scale(-1 1)">{leaves}</g>
      <circle r={204} fill={metal} stroke={u.ink} strokeWidth={8} />
      <circle r={160} fill={u.card} stroke={u.ink} strokeWidth={6} />
      <g opacity={eLabel}>
        <Txt x={0} y={-62} u={u} size={36} weight={900} fill={u.accent} ls={6}>{label}</Txt>
      </g>
      <Txt x={0} y={58} u={u} size={nSize} weight={900}>{rank}</Txt>
    </g>
  );
}
