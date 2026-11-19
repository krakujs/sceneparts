import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid } from "../style/index";
import type { Grid } from "../style/index";
import { TileRect, TP, snap, rnd } from "../backdrop/index";

// Planet surface: pixel-art alien ground. Rock tiles recoloured to rust, craters, odd glowing crystals, and a big
// planet in a dark star sky. Ground starts at groundY; the sky above it stays open for sprites.

const CRYSTAL = gridOf(["..c..", ".cIc.", "cIccb", "cccbb", ".cbb.", "..b.."]);
const CRYSTAL2 = gridOf(["..m..", ".mIm.", "mImmp", "mmpp.", ".pp.."]);

/** Circular crater: dark floor ringed by a lighter rim, drawn at cell size. */
const crater = (R: number): Grid => {
  const S = 2 * R + 1;
  const g = makeGrid(S, S);
  for (let r = 0; r < S; r++)
    for (let q = 0; q < S; q++) {
      const d = Math.hypot(q - R, r - R);
      if (d <= R + 0.2) g[r][q] = d > R - 1 ? (r > R ? "R" : "B") : "k";
    }
  return g;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 6;
  const pulse = (p.anim ?? "crystals") !== "none";
  const f = pulse ? p.f ?? 0 : 0;
  const stars = Array.from({ length: 60 }).map((_, i) => {
    const on = !pulse || Math.floor((f + i * 11) / 18) % 4 !== 0;
    return <rect key={"s" + i} x={snap(rnd(seed, i) * 1068)} y={snap(rnd(seed, i + 200) * (gy - 300))} width={i % 7 === 0 ? 12 : 6} height={i % 7 === 0 ? 12 : 6} fill={i % 4 === 0 ? "#f7d154" : "#f5f1e8"} opacity={on ? 1 : 0.3} />;
  });
  const bands = ["#1a0f2e", "#21133a", "#2a1846", "#341d52", "#3e2160"];
  const bandH = snap(gy / bands.length, 24);
  const planet = (cx: number, cy: number, R: number) => {
    const cells: React.ReactNode[] = [];
    for (let r = -R; r <= R; r++) {
      const hw = Math.round(Math.sqrt(R * R - r * r));
      if (hw === 0) continue;
      cells.push(<rect key={"p" + r} x={cx - hw * 24} y={cy + r * 24} width={hw * 48} height={24} fill="#c4704a" />);
      cells.push(<rect key={"q" + r} x={cx - hw * 24} y={cy + r * 24} width={hw * 24} height={24} fill="#e08e5c" opacity={r < -2 ? 0.9 : 0.0} />);
      if (r % 4 === 0) cells.push(<rect key={"b" + r} x={cx - hw * 24} y={cy + r * 24} width={hw * 48} height={12} fill="#9c4a33" />);
    }
    return <g shapeRendering="crispEdges">{cells}</g>;
  };
  const cr = (key: string, x: number, y: number, R: number) => <Pixels key={key} grid={crater(R)} px={18} pal={TP} x={x} y={y} />;
  const glow = pulse ? 0.16 + 0.08 * (Math.floor(f / 10) % 2) : 0.2;
  const crystal = (key: string, x: number, y: number, map: Grid, px: number) => (
    <g key={key}>
      <circle cx={x + (map[0].length * px) / 2} cy={y + (map.length * px) / 2} r={px * 4} fill="#5ab4f0" opacity={glow} />
      <Pixels grid={outlined(map)} px={px} pal={TP} x={x - px} y={y - px} />
    </g>
  );
  return (
    <g>
      {bands.map((c, i) => <rect key={"sky" + i} x={0} y={i * bandH} width={1080} height={bandH + 2} fill={c} />)}
      {stars}
      {planet(800, 480, 9)}
      <rect x={0} y={gy - 180} width={1080} height={200} fill="#2a1846" opacity={0.6} />
      <TileRect tile="rock" x={0} y={gy} w={1080} h={1920 - gy} pal={{ d: "#a0563a", T: "#7a3b2a", k: "#3a1d18" }} />
      <rect x={0} y={gy} width={1080} height={24} fill="#c4704a" />
      {cr("c1", 110, gy - 230, 3)}
      {cr("c2", 700, gy - 250, 4)}
      {cr("c3", 920, gy - 120, 2)}
      {crystal("k1", 30, gy - 330, CRYSTAL, 24)}
      {crystal("k2", 900, gy - 380, CRYSTAL2, 24)}
      {crystal("k3", 250, gy - 80, CRYSTAL2, 18)}
    </g>
  );
}
