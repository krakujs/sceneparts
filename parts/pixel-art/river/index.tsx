import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, PixSky, PixTree, TileRect, Tint, asTime, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf, outlined } from "../style/index";

// River: a river flowing left to right across the frame, between grassy banks with trees and stones. The water
// band scrolls and white foam streaks slide along it from p.f (anim "flow").

const STONE = outlined(gridOf([".ggg.", "gggdg", "gdddg", ".ddd."]));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const riverY = snap(p.riverY ?? 980, 12);
  const seed = p.seed ?? 8;
  const flow = (p.anim ?? "flow") === "flow";
  const bandH = 300;
  const off = flow ? snap((Math.floor(p.f / 8) * 12) % 96) : 0;
  const streaks = Array.from({ length: 10 }, (_, i) => ({
    x: snap((((i * 180 + (flow ? p.f * 2.4 : 0)) % 1200) + 1200) % 1200 - 60),
    y: riverY + 60 + (i % 5) * 48,
  }));
  const stones = Array.from({ length: 16 }, (_, i) => {
    const top = i % 2 === 0;
    return {
      x: snap(rnd(seed, i) * 1000),
      y: top ? snap(riverY - 90 + rnd(seed, i + 30) * 60) : snap(riverY + bandH + 40 + rnd(seed, i + 60) * 200),
    };
  });
  return (
    <g>
      <PixSky time={time} to={760} clouds={2} seed={seed} drift={flow} f={flow ? p.f : 0} />
      <Far kind="trees" base={780} time={time} seed={seed + 1} maxH={240} />
      <TileRect tile="grass" x={0} y={760} w={1080} h={riverY - 760} cell={12} />
      <PixTree x={120} y={riverY - 70} cell={14} kind="pine" />
      <PixTree x={930} y={riverY - 60} cell={16} kind="round" />
      <TileRect tile="water" x={0} y={riverY} w={1080} h={bandH} cell={12} ox={-off} oy={riverY} />
      <TileRect tile="waterTop" x={0} y={riverY} w={1080} h={36} cell={12} />
      <TileRect tile="waterTop" x={0} y={riverY + bandH - 36} w={1080} h={36} cell={12} />
      {streaks.map((s, i) => (
        <rect key={"s" + i} x={s.x} y={s.y} width={96} height={12} fill="#d8f4ff" opacity={0.6} />
      ))}
      <TileRect tile="grass" x={0} y={riverY + bandH} w={1080} h={1920 - riverY - bandH} cell={12} />
      <PixTree x={150} y={riverY + bandH + 120} cell={16} kind="round" />
      <PixTree x={900} y={riverY + bandH + 150} cell={18} kind="pine" />
      {stones.map((s, i) => (
        <Pixels key={"st" + i} grid={STONE} px={12} x={s.x} y={s.y} />
      ))}
      <Tint time={time} y={riverY - 400} />
    </g>
  );
}
