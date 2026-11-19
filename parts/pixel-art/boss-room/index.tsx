import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined } from "../style/index";
import { TileRect, ICONS, snap } from "../backdrop/index";

// Boss room: dark, red-lit indoor arena (reference for boss fights). Stone block wall with skull plaques, runes
// that glow on the wall, edge pillars, chains and a big open stone floor from floorY down. The floor centre stays empty.

const RUNE_A = ["..y..", ".y.y.", "yy.yy", ".y.y.", "..y.."];
const RUNE_B = ["y...y", ".y.y.", "..y..", ".y.y.", "y...y"];
const CHAIN = ["g.", ".g", "g.", ".g", "g.", ".g", "g.", ".g", "gg", "gg"];

const WALL = { H: "#4a2630", K: "#1a0d13", k: "#120810", g: "#6b3a44" };
const FLOOR = { U: "#4a3a40", S: "#332a30", T: "#1c161b", g: "#5b4a52" };
const PILLAR = { U: "#5a4650", S: "#3e3038", T: "#221a20", g: "#7a6470" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "pulse") === "pulse";
  const beat = on ? Math.floor(p.f / 15) % 2 : 0;
  const glow = on ? (beat ? 0.26 : 0.14) : 0.18;
  const runeCol = on && beat ? "#ffb03c" : "#ff5a2a";
  const skull = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x - 24} y={y - 24} width={144} height={144} fill="#2a1418" />
      <Pixels grid={outlined(gridOf(ICONS.skull))} px={12} pal={{ w: "#d8c9c0", k: PAL.k }} x={x} y={y} />
    </g>
  );
  const rune = (x: number, y: number, g: string[], i: number) => (
    <Pixels key={i} grid={gridOf(g)} px={18} pal={{ y: runeCol }} x={x} y={y} />
  );
  return (
    <g>
      <TileRect tile="dungeon" x={0} y={0} w={1080} h={fy} cell={12} pal={WALL} />
      <rect x={0} y={0} width={1080} height={fy} fill="#ff1f2e" opacity={glow * 0.5} />
      {skull(180, 300)}
      {skull(780, 300)}
      {rune(300, 600, RUNE_A, 1)}
      {rune(708, 600, RUNE_B, 2)}
      {rune(228, 900, RUNE_B, 3)}
      {rune(780, 900, RUNE_A, 4)}
      <Pixels grid={gridOf(CHAIN)} px={12} pal={{ g: "#8a8f9a" }} x={372} y={0} />
      <Pixels grid={gridOf(CHAIN)} px={12} pal={{ g: "#8a8f9a" }} x={672} y={0} />
      <TileRect tile="stone" x={0} y={0} w={96} h={fy} cell={12} pal={PILLAR} />
      <TileRect tile="stone" x={984} y={0} w={96} h={fy} cell={12} pal={PILLAR} />
      <rect x={0} y={fy - 48} width={96} height={48} fill="#17111a" />
      <rect x={984} y={fy - 48} width={96} height={48} fill="#17111a" />
      <circle cx={540} cy={fy + 120} r={320} fill="#ff2a2a" opacity={glow} />
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={FLOOR} />
      <rect x={0} y={fy} width={1080} height={12} fill="#8a1f2a" />
      <rect x={0} y={fy + 12} width={1080} height={12} fill="#2a0c12" />
    </g>
  );
}
