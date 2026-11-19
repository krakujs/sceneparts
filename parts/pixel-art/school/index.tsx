import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// School: corridor with a row of lockers at each side, a cork notice board, tall windows, a wall clock and tiled floor.
// The clock hand is static; the anim param is kept for the blink option.

const LOCKER = ["#4a7fb8", "#c9523f", "#4a7fb8", "#4caf50"];

const Locker = ({ x, y, h, c }: { x: number; y: number; h: number; c: string }) => (
  <g>
    <rect x={x} y={y} width={96} height={h} fill={c} />
    <rect x={x} y={y} width={96} height={12} fill="#2a3a52" />
    <rect x={x + 44} y={y + 12} width={8} height={h - 12} fill="#2a3a52" />
    {[0, 1, 2].map((i) => <rect key={i} x={x + 12} y={y + 96 + i * 24} width={24} height={6} fill="#2a3a52" />)}
    <rect x={x + 60} y={y + 120} width={12} height={36} fill="#d8dbe2" />
    <rect x={x + 60} y={y + 300} width={12} height={36} fill="#d8dbe2" />
    <rect x={x} y={y + h - 12} width={96} height={12} fill="#2a3a52" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const win = (x: number) => (
    <g key={x}>
      <rect x={x - 12} y={fy - 912} width={204} height={300} fill="#f5f1e8" />
      <rect x={x} y={fy - 900} width={180} height={276} fill="#8fd0f8" />
      <rect x={x + 84} y={fy - 900} width={12} height={276} fill="#f5f1e8" />
      <rect x={x} y={fy - 672} width={180} height={12} fill="#f5f1e8" />
    </g>
  );
  const on = (p.anim ?? "blink") === "blink";
  const blink = on ? Math.floor(p.f / 30) % 2 : 0;
  const clockX = 528, clockY = fy - 840;
  return (
    <g>
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} cell={12} pal={{ S: "#e7e2d0", T: "#b8b09a" }} />
      {/* teal wainscot */}
      <rect x={0} y={fy - 300} width={1080} height={300} fill="#3f8a7a" />
      <rect x={0} y={fy - 300} width={1080} height={12} fill="#2a6a5c" />
      {/* windows */}
      {win(228)}
      {win(672)}
      {/* cork notice board */}
      <rect x={420} y={fy - 720} width={240} height={252} fill="#5a3a22" />
      <TileRect tile="wood" x={432} y={fy - 708} w={216} h={228} cell={12} pal={{ P: "#c9a06a", Q: "#8a6038" }} />
      <rect x={456} y={fy - 672} width={60} height={48} fill="#f5f1e8" />
      <rect x={540} y={fy - 660} width={48} height={60} fill="#f7d154" />
      <rect x={468} y={fy - 588} width={72} height={36} fill="#f5f1e8" />
      <rect x={564} y={fy - 564} width={60} height={48} fill="#ef8fb4" />
      <rect x={456} y={fy - 540} width={36} height={24} fill="#f7d154" />
      {/* clock */}
      <circle cx={clockX} cy={clockY} r={72} fill="#1b1b2e" />
      <circle cx={clockX} cy={clockY} r={60} fill="#f5f1e8" />
      <rect x={clockX - 6} y={clockY - 48} width={12} height={54} fill="#1b1b2e" />
      {blink === 1 && <circle cx={clockX} cy={clockY} r={12} fill="#c9523f" />}
      <rect x={clockX} y={clockY - 6} width={36} height={12} fill="#c9523f" />
      {/* lockers at both sides */}
      <Locker x={12} y={fy - 640} h={640} c={LOCKER[0]} />
      <Locker x={108} y={fy - 640} h={640} c={LOCKER[1]} />
      <Locker x={864} y={fy - 640} h={640} c={LOCKER[2]} />
      <Locker x={960} y={fy - 640} h={640} c={LOCKER[3]} />
      {/* tiled floor */}
      <TileRect tile="tiles" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ w: "#e8ecef", g: "#8d93a0" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#5a6170" />
    </g>
  );
}
