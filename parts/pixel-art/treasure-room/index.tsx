import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap, ICONS } from "../backdrop/index";

// Treasure room: stone vault with piles of gold coins, open chests, gems and twinkling sparkles.

const Blob = ({ cx, cy, rx, ry, fill }: { cx: number; cy: number; rx: number; ry: number; fill: string }) => {
  const rows: React.ReactNode[] = [];
  for (let r = -ry; r <= ry; r++) {
    const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (r * r) / (ry * ry + 0.0001))));
    rows.push(<rect key={r} x={cx - hw * 12} y={cy + r * 12} width={hw * 24} height={12} fill={fill} />);
  }
  return <g>{rows}</g>;
};

// Coin pile: stacked gold mounds rising from the base line.
const Pile = ({ cx, base, rx, h }: { cx: number; base: number; rx: number; h: number }) => (
  <g>
    <Blob cx={cx} cy={base} rx={rx} ry={1} fill="#b08a2e" />
    {Array.from({ length: h }).map((_, k) => (
      <g key={k}>
        <Blob cx={cx} cy={base - 12 - k * 12} rx={Math.max(2, rx - k)} ry={2} fill={k % 2 ? "#f7d154" : "#e6b93f"} />
        <rect x={cx - Math.max(2, rx - k) * 12 + 12} y={base - 24 - k * 12} width={24} height={12} fill="#fff3b0" />
      </g>
    ))}
  </g>
);

const GEM = ICONS.gem;
const SPARK = ICONS.star;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "sparkle") === "sparkle";
  const sparks: [number, number][] = [[120, 360], [900, 300], [300, 180], [760, 560], [60, 720], [980, 760], [520, 300]];
  const chest = (x: number, y: number, px: number) => <Pixels grid={outlined(gridOf(ICONS.chest))} px={px} x={x} y={y} />;
  return (
    <g>
      <TileRect tile="stone" x={0} y={0} w={1080} h={fy} cell={12} pal={{ U: "#5f6574", S: "#4a4f5e", T: "#2d313d" }} />
      {/* back alcove with gold stash */}
      <rect x={300} y={fy - 480} width={480} height={360} fill="#2d313d" />
      <Pile cx={540} base={fy - 120} rx={11} h={5} />
      {/* piles at the sides */}
      <Pile cx={150} base={fy + 12} rx={8} h={6} />
      <Pile cx={930} base={fy + 12} rx={9} h={7} />
      {/* chests */}
      {chest(24, fy - 252, 24)}
      {chest(840, fy - 228, 24)}
      {/* gems on the piles */}
      <Pixels grid={outlined(gridOf(GEM))} px={18} x={120} y={fy - 150} />
      <Pixels grid={outlined(gridOf(GEM))} px={18} x={890} y={fy - 170} />
      <Pixels grid={outlined(gridOf(GEM))} px={12} x={520} y={fy - 220} />
      {/* sparkles */}
      {sparks.map(([x, y], i) => {
        const vis = on ? (Math.floor(p.f / 8) + i * 3) % 5 < 2 : i % 2 === 0;
        return vis ? <Pixels key={i} grid={gridOf(SPARK)} px={12} pal={{ y: "#fff3b0", o: "#f7d154" }} x={x} y={y} /> : null;
      })}
      {/* floor */}
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ U: "#7d8394", S: "#636a7c", T: "#3d4250" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#2d313d" />
    </g>
  );
}
