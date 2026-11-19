import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { PixSky, Far, TileRect, GroundBand, Tile, snap, rnd } from "../backdrop/index";

// Ruins: pixel-art ancient ruins on a grassy field under a day sky. A crumbling back wall, broken columns at the
// edges, fallen blocks, and vines that sway from p.f. The centre field stays clear for sprites.

const VINE = gridOf(["e", "e", "f", "e", "f", "e"]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 11;
  const sway = (p.anim ?? "sway") !== "none";
  const f = sway ? p.f ?? 0 : 0;
  const wallTop = gy - 380;
  // Back wall: blocks of varying height, leaving broken gaps.
  const wall = Array.from({ length: 12 }).map((_, i) => {
    const h = 180 + snap(rnd(seed, i) * 240);
    return <TileRect key={"w" + i} tile="stone" x={i * 96} y={gy - h} w={96} h={h - 0} f={f} />;
  });
  const column = (key: string, x: number, height: number) => {
    const segs: React.ReactNode[] = [];
    for (let y = gy - 48 - 96; y > gy - height; y -= 96) segs.push(<TileRect key={key + y} tile="stone" x={x} y={y} w={96} h={96} f={f} />);
    return (
      <g key={key}>
        <TileRect tile="block" x={x - 12} y={gy - 48} w={120} h={48} f={f} />
        {segs}
        <TileRect tile="block" x={x - 12} y={gy - height - 24} w={120} h={24} f={f} />
      </g>
    );
  };
  const vines = [120, 430, 640, 960].map((x, i) => {
    const len = 4 + (i % 2) * 3;
    const off = sway ? Math.round(Math.sin((f + i * 23) / 18)) * 12 : 0;
    return Array.from({ length: len }).map((_, j) => (
      <Pixels key={`v${i}-${j}`} grid={VINE} px={12} x={x + (j > 1 ? off : 0)} y={wallTop + 24 + j * 12 * 3} />
    ));
  });
  return (
    <g>
      <PixSky time="day" to={gy} f={f} clouds={3} seed={seed} drift={sway} />
      <Far kind="hills" base={gy - 140} time="day" seed={seed} maxH={260} />
      {wall}
      {vines}
      <GroundBand y={gy} top="grass" body="dirt" f={f} />
      {column("c1", 40, 620)}
      {column("c2", 900, 460)}
      <TileRect tile="stone" x={180} y={gy + 80} w={96} h={96} f={f} />
      <TileRect tile="stone" x={800} y={gy + 130} w={96} h={96} f={f} />
      <Tile tile="bush" x={520} y={gy + 40} cell={12} />
    </g>
  );
}
