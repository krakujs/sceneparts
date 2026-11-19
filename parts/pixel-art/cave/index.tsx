import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap, rnd } from "../backdrop/index";

// Cave: dark rock cave with stalactites, glowing crystals, a puddle and a bright opening at the back.

const CRYSTAL = ["...c..", "..ccc.", ".cwccb", ".ccbbb", "..bb..", "......"];
const CRYSTAL_P = ["..m.", ".mmp", "mpp.", ".pp.", "...."];
const ROCK_PAL = { d: "#3a3f52", T: "#2a2e3e", k: "#15161f" };
const FLOOR_PAL = { d: "#5a6170", T: "#3d4250", k: "#23252f" };

// Stalactite drawn as stepped rows (cell 12) hanging from y = 0.
const Stal = ({ x, len, w, c }: { x: number; len: number; w: number; c: string }) => {
  const steps = w / 12;
  return (
    <g>
      {Array.from({ length: len }).map((_, i) => {
        const cells = Math.max(1, steps - Math.floor((i * steps) / len));
        const off = Math.floor((steps - cells) / 2);
        return <rect key={i} x={x + off * 12} y={i * 12} width={cells * 12} height={12} fill={c} />;
      })}
    </g>
  );
};

// Pixel ellipse made of rows; rx/ry in cells, cx/cy in px (multiples of cell).
const Blob = ({ cx, cy, rx, ry, cell, fill }: { cx: number; cy: number; rx: number; ry: number; cell: number; fill: string }) => {
  const rows: React.ReactNode[] = [];
  for (let r = -ry; r <= ry; r++) {
    const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (r * r) / (ry * ry + 0.0001))));
    rows.push(<rect key={r} x={cx - hw * cell} y={cy + r * cell} width={hw * 2 * cell} height={cell} fill={fill} />);
  }
  return <g>{rows}</g>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "glow") === "glow";
  const phase = Math.floor(p.f / 10) % 3;
  const pulse = on ? 0.22 + 0.1 * phase : 0.3;
  const spark = on ? Math.floor(p.f / 8) % 4 : 0;
  const stals = Array.from({ length: 16 }).map((_, i) => ({
    x: snap(i * 70 + rnd(7, i) * 30),
    len: 4 + Math.floor(rnd(7, i + 50) * 8),
    w: rnd(7, i + 90) > 0.5 ? 24 : 36,
  }));
  const crystal = (x: number, y: number, mirror: boolean, big: boolean) => (
    <g key={`${x}-${y}`}>
      <circle cx={x + 60} cy={y + 60} r={big ? 170 : 120} fill="#7ef0ff" opacity={pulse} />
      <Pixels grid={outlined(gridOf(mirror ? CRYSTAL_P : CRYSTAL))} px={big ? 36 : 24} x={x} y={y} />
    </g>
  );
  return (
    <g>
      <TileRect tile="rock" x={0} y={0} w={1080} h={fy} cell={12} pal={ROCK_PAL} />
      {stals.map((s, i) => <Stal key={i} x={s.x} len={s.len} w={s.w} c="#4a4f66" />)}
      {/* opening of light at the back */}
      <circle cx={540} cy={560} r={330} fill="#f7d154" opacity={pulse * 0.8} />
      <Blob cx={540} cy={560} rx={9} ry={7} cell={24} fill="#f7d154" />
      <Blob cx={540} cy={560} rx={6} ry={5} cell={24} fill="#fff3b0" />
      <Blob cx={540} cy={560} rx={3} ry={3} cell={24} fill="#ffffff" />
      {/* crystals on the sides */}
      {crystal(72, fy - 300, false, true)}
      {crystal(900, fy - 200, true, false)}
      {crystal(120, fy - 90, true, false)}
      {crystal(860, fy - 420, false, false)}
      {/* floor and puddle */}
      <TileRect tile="rock" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={FLOOR_PAL} />
      <rect x={0} y={fy} width={1080} height={12} fill="#15161f" />
      <Blob cx={540} cy={snap(fy + 60)} rx={28} ry={4} cell={12} fill="#2f5fb8" />
      <Blob cx={540} cy={snap(fy + 60) - 12} rx={18} ry={2} cell={12} fill="#5ab4f0" />
      <rect x={300 + spark * 48} y={snap(fy + 60) - 12} width={24} height={12} fill="#f5f1e8" opacity={on ? 0.9 : 0.5} />
    </g>
  );
}
