import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// Classroom: a blank chalkboard with a few chalk strokes, teacher desk, rows of student desks, a clock and windows.

const StudentDesk = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x} y={y} width={144} height={24} fill="#c9874f" />
    <rect x={x} y={y + 24} width={144} height={12} fill="#7a4a2b" />
    <rect x={x + 12} y={y + 36} width={12} height={72} fill="#5a6170" />
    <rect x={x + 120} y={y + 36} width={12} height={72} fill="#5a6170" />
    <rect x={x + 36} y={y - 96} width={72} height={72} fill="#4a7fb8" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "tick") === "tick";
  const tick = on ? Math.floor(p.f / 30) % 2 : 0;
  const win = (x: number) => (
    <g key={x}>
      <rect x={x - 12} y={fy - 912} width={204} height={300} fill="#f5f1e8" />
      <rect x={x} y={fy - 900} width={180} height={276} fill="#8fd0f8" />
      <rect x={x + 84} y={fy - 900} width={12} height={276} fill="#f5f1e8" />
    </g>
  );
  return (
    <g>
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} cell={12} pal={{ S: "#e7e2d0", T: "#b8b09a" }} />
      {win(60)}
      {win(816)}
      {/* chalkboard */}
      <rect x={240} y={fy - 800} width={600} height={360} fill="#8a6038" />
      <rect x={252} y={fy - 788} width={576} height={336} fill="#2f4a3e" />
      <rect x={300} y={fy - 740} width={120} height={12} fill="#f5f1e8" opacity={0.7} />
      <rect x={300} y={fy - 700} width={72} height={12} fill="#f5f1e8" opacity={0.7} />
      <rect x={660} y={fy - 620} width={96} height={12} fill="#f5f1e8" opacity={0.5} />
      <rect x={252} y={fy - 452} width={576} height={24} fill="#c9874f" />
      <rect x={252} y={fy - 440} width={576} height={12} fill="#8a6038" />
      {/* clock */}
      <circle cx={540} cy={fy - 880} r={48} fill="#1b1b2e" />
      <circle cx={540} cy={fy - 880} r={38} fill="#f5f1e8" />
      <rect x={534} y={fy - 920} width={12} height={36} fill="#1b1b2e" />
      <rect x={540} y={fy - 886} width={tick ? 24 : 12} height={12} fill="#c9523f" />
      {/* teacher desk, front-left */}
      <rect x={24} y={fy - 360} width={216} height={36} fill="#a06c44" />
      <rect x={36} y={fy - 324} width={24} height={324} fill="#7a4a2b" />
      <rect x={204} y={fy - 324} width={24} height={324} fill="#7a4a2b" />
      <rect x={60} y={fy - 384} width={84} height={24} fill="#5a6170" />
      {/* student desks in rows */}
      <StudentDesk x={900} y={fy - 240} />
      <StudentDesk x={900} y={fy - 480} />
      <StudentDesk x={24} y={fy - 120} />
      {/* floor */}
      <TileRect tile="wood" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ P: "#c9874f", Q: "#a06c44" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#5a3a22" />
    </g>
  );
}
