import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined } from "../style/index";
import { PixSky, Far, TileRect, Icon, Tint, asTime, snap } from "../backdrop/index";

// Ladder level: climbing stage (reference for vertical levels). Stone ledges zig-zag up the screen, joined by one
// long pixel ladder in the gap between them; ropes hang from the top of the sky to two ledges; rock floor below.

const LEDGES = [
  { x: 120, y: 1440 },
  { x: 624, y: 1152 },
  { x: 120, y: 864 },
  { x: 624, y: 576 },
  { x: 120, y: 288 },
];
const TOP = 288;
const LADDER_X = 492;

const ladderRows = (n: number) => Array.from({ length: n }, (_, r) => (r % 4 === 3 ? "uxxxxu" : "uu..uu"));
const ropeRows = (n: number) => Array.from({ length: n }, (_, r) => (r % 2 ? "u" : "x"));
const LADDER_PAL = { u: "#7a4a2b", x: PAL.x };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const drift = (p.anim ?? "drift") === "drift";
  const ladderN = Math.floor((gy - TOP) / 12);
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={2} seed={5} drift={drift} />
      <Far kind="mountains" base={gy} time={time} seed={6} maxH={520} />
      {LEDGES.map((l, i) => (
        <g key={i}>
          <TileRect tile="stone" x={l.x} y={l.y} w={336} h={96} cell={12} />
          <rect x={l.x} y={l.y} width={336} height={12} fill={PAL.k} opacity={0.35} />
        </g>
      ))}
      <Icon name="chest" x={228} y={TOP - 108} cell={12} />
      <Pixels grid={outlined(gridOf(ropeRows(TOP / 12)))} px={12} pal={LADDER_PAL} x={132 - 12} y={-12} />
      <Pixels grid={outlined(gridOf(ropeRows(576 / 12)))} px={12} pal={LADDER_PAL} x={936 - 12} y={-12} />
      <Pixels grid={outlined(gridOf(ladderRows(ladderN)))} px={12} pal={LADDER_PAL} x={LADDER_X - 12} y={TOP - 12} />
      <TileRect tile="grass" x={0} y={gy} w={1080} h={96} cell={12} />
      <TileRect tile="rock" x={0} y={gy + 96} w={1080} h={1920 - gy - 96} cell={12} />
      <Tint time={time} y={gy} />
    </g>
  );
}
