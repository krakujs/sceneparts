import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined } from "../style/index";
import { Panel } from "../backdrop/index";

// Minimap: pixel-art level map (reference for HUD maps). A 14 by 14 grid of tiny terrain cells (grass, forest, water,
// rock, path) in a panel, a blinking red player dot and a star marking the goal. Transparent around the panel.

const MAP = [
  "ffeeeeeeeeeeff",
  "feexxxeeeeeeef",
  "eeexeeeeecceee",
  "eeexeeeeccceee",
  "eeexxxxeeeeeee",
  "eeeeeeexeeddee",
  "eeeeeeexeeddee",
  "eecccceexeeeee",
  "eecccceexxxxee",
  "eeeeeeeeexeeee",
  "eefeeeeeexeeee",
  "feeeeeeeexxxxe",
  "ffeeeddeeeeeex",
  "ffeeeddeeeeeee",
];
const STAR = ["..y..", "yyyyy", ".yyy.", "yy.yy", "y...y"];
const CELL = 12;
const SIZE = 14 * CELL;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  if (p.f < (p.at ?? 0)) return <g />;
  const blink = (p.anim ?? "blink") === "blink" ? Math.floor(p.f / 10) % 2 === 0 : true;
  const left = -SIZE / 2, top = -SIZE / 2;
  const playerX = 2, playerY = 9;
  return (
    <g transform={`translate(${p.x ?? 900} ${p.y ?? 240}) scale(${p.s ?? 1})`}>
      <Panel x={left - 24} y={top - 24} w={SIZE + 48} h={SIZE + 48} />
      <Pixels grid={gridOf(MAP)} px={CELL} pal={{ ...PAL, d: "#5a6170" }} x={left} y={top} />
      <Pixels grid={outlined(gridOf(STAR))} px={6} pal={{ y: PAL.y }} x={left + 11 * CELL - 6} y={top + 1 * CELL - 6} />
      {blink && <rect x={left + playerX * CELL + 2} y={top + playerY * CELL + 2} width={CELL - 4} height={CELL - 4} fill={PAL.r} />}
    </g>
  );
}
