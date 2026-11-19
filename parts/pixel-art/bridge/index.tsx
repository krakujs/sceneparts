import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, PixSky, TileRect, Tint, asTime, snap } from "../backdrop/index";
import { PAL } from "../style/index";

// Bridge: a wooden plank rope bridge across a gorge with a river far below and sky above. Characters stand on
// the deck at groundY (the top of the planks). Rope rails sit at the edges so the centre stage stays open.
// anim "sway" moves the ropes and the rope hangers up and down and flows the river from p.f.

const DECK_H = 96;
const RIVER_Y = 1520;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1200, 12);
  const seed = p.seed ?? 9;
  const sway = (p.anim ?? "sway") === "sway";
  const wob = sway ? snap(Math.sin(p.f / 20) * 12) : 0;
  const ropeY = (x: number) => {
    const t = Math.min(1, Math.abs(x - 540) / 540);
    return gy - 216 + (1 - t) * 96 + wob * (1 - t);
  };
  const ropes = [0, 1];
  const hangers = [0, 1, 2, 3, 4, 5].map((i) => {
    const x = i < 3 ? 36 + i * 96 : 1044 - (i - 3) * 96;
    return { x, y: snap(ropeY(x)) };
  });
  return (
    <g>
      <PixSky time={time} to={gy} f={sway ? p.f : 0} clouds={3} seed={seed} drift={sway} />
      <Far kind="mountains" base={gy + 40} time={time} seed={seed + 2} maxH={520} />
      <TileRect tile="rock" x={0} y={gy + DECK_H} w={150} h={1920 - gy - DECK_H} cell={12} />
      <TileRect tile="rock" x={930} y={gy + DECK_H} w={150} h={1920 - gy - DECK_H} cell={12} />
      <rect x={150} y={gy + DECK_H} width={780} height={RIVER_Y - gy - DECK_H} fill={PAL.k} opacity={0.35} />
      <TileRect tile="water" x={150} y={RIVER_Y} w={780} h={1920 - RIVER_Y} cell={12} f={sway ? p.f : 0} />
      <TileRect tile="waterTop" x={150} y={RIVER_Y} w={780} h={48} cell={12} f={sway ? p.f : 0} />
      <rect x={0} y={gy + DECK_H - 12} width={1080} height={12} fill={PAL.k} opacity={0.5} />
      <TileRect tile="wood" x={0} y={gy} w={1080} h={DECK_H} cell={12} />
      <rect x={0} y={gy} width={1080} height={12} fill={PAL.k} />
      {[120, 360, 720, 960].map((x) => (
        <rect key={"pl" + x} x={x} y={gy + DECK_H} width={36} height={RIVER_Y - gy - DECK_H - 60} fill="#5a3a22" />
      ))}
      {ropes.map((side) => {
        const posts = side === 0 ? 36 : 1044;
        return (
          <rect key={"post" + side} x={posts - 12} y={gy - 240} width={24} height={240} fill="#7a4a2b" />
        );
      })}
      {ropes.map((side) => (
        <g key={"rope" + side}>
          {Array.from({ length: 30 }, (_, i) => {
            const t = i / 29;
            const x = side === 0 ? 36 + t * 204 : 1044 - t * 204;
            return <rect key={i} x={snap(x)} y={snap(ropeY(x))} width={12} height={12} fill="#c9874f" />;
          })}
        </g>
      ))}
      {hangers.map((h, i) => (
        <rect key={"h" + i} x={h.x - 6} y={h.y + 12} width={12} height={gy - h.y - 12} fill="#7a4a2b" />
      ))}
      <Tint time={time} y={gy - 600} />
    </g>
  );
}
