import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Tavern: medieval inn with a wooden bar counter, barrels, mugs, a fireplace with a fire, tables and hanging lanterns.

const FIRE = [
  ["...y...", "..yoy..", ".yoroy.", ".oroor.", "orrrro.", "orrrro.", ".ooooo."],
  ["..y....", ".yoy...", "yoroy..", ".oror..", "orrror.", ".orrro.", ".ooooo."],
];

const Lantern = ({ x, y, glow }: { x: number; y: number; glow: number }) => (
  <g>
    <rect x={x + 36} y={0} width={12} height={y} fill="#2a1a0e" />
    <circle cx={x + 42} cy={y + 60} r={150} fill="#f7d154" opacity={glow} />
    <rect x={x} y={y} width={84} height={12} fill="#2a1a0e" />
    <rect x={x + 12} y={y + 12} width={60} height={84} fill="#2a1a0e" />
    <rect x={x + 24} y={y + 24} width={36} height={60} fill="#f7d154" />
    <rect x={x + 12} y={y + 96} width={60} height={12} fill="#2a1a0e" />
  </g>
);

const Barrel = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="#8a5a36" />
    <rect x={x} y={y + 24} width={w} height={12} fill="#3a2514" />
    <rect x={x} y={y + h - 36} width={w} height={12} fill="#3a2514" />
    <rect x={x + 12} y={y + 12} width={12} height={h - 24} fill="#a06c44" />
  </g>
);

const Mug = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x} y={y} width={36} height={36} fill="#c9a64a" />
    <rect x={x} y={y} width={36} height={12} fill="#f5f1e8" />
    <rect x={x + 36} y={y + 12} width={12} height={12} fill="#c9a64a" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "flicker") === "flicker";
  const fr = on ? Math.floor(p.f / 6) % 2 : 0;
  const glow = on ? 0.16 + 0.06 * (Math.floor(p.f / 6) % 2) : 0.2;
  const fx = 780, fyy = fy - 420;
  return (
    <g>
      <TileRect tile="wood" x={0} y={0} w={1080} h={fy} cell={12} pal={{ P: "#6b4a2e", Q: "#4a3018" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#1b1b2e" opacity={0.15} />
      {/* hanging lanterns */}
      <Lantern x={150} y={300} glow={glow} />
      <Lantern x={870} y={300} glow={glow} />
      {/* fireplace */}
      <rect x={720} y={fy - 720} width={300} height={720} fill="#7a7f8c" />
      <rect x={696} y={fy - 744} width={348} height={48} fill="#5f6574" />
      <rect x={768} y={fy - 420} width={204} height={300} fill="#1b1b2e" />
      <circle cx={870} cy={fyy + 120} r={180} fill="#f08a3c" opacity={glow} />
      <Pixels grid={gridOf(FIRE[fr])} px={24} x={828} y={fy - 240} />
      <rect x={744} y={fy - 120} width={252} height={24} fill="#5f6574" />
      {/* bar counter at the back-left */}
      <rect x={24} y={fy - 480} width={456} height={24} fill="#c9874f" />
      <rect x={24} y={fy - 456} width={456} height={216} fill="#7a4a2b" />
      <rect x={24} y={fy - 240} width={456} height={12} fill="#4a2c18" />
      <Mug x={80} y={fy - 516} />
      <Mug x={180} y={fy - 516} />
      <Mug x={300} y={fy - 516} />
      <Mug x={400} y={fy - 516} />
      {/* barrels beside the counter */}
      <Barrel x={24} y={fy - 252} w={120} h={252} />
      <Barrel x={156} y={fy - 216} w={108} h={216} />
      {/* round tables at the right */}
      <rect x={744} y={fy - 216} width={216} height={24} fill="#a06c44" />
      <rect x={846} y={fy - 192} width={24} height={192} fill="#5a3a22" />
      <rect x={780} y={fy - 36} width={156} height={12} fill="#5a3a22" />
      <rect x={744} y={fy - 216} width={216} height={12} fill="#c9874f" />
      <rect x={672} y={fy - 132} width={48} height={24} fill="#7a4a2b" />
      {/* wooden floor */}
      <TileRect tile="wood" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ P: "#7a4a2b", Q: "#4a2c18" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#2a1a0e" />
    </g>
  );
}
