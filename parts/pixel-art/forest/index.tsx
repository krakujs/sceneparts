import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, Far, GroundBand, PixTree, Tile, Tint, asTime, snap } from "../backdrop/index";

// Forest: pixel-art background preset (reference for outdoor scenes). Sky + far tree line + tiled grass ground,
// with trees framing the left and right edges so the centre stage (x 220-860) stays clear for sprites.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const sway = (p.anim ?? "sway") === "sway";
  const k = (i: number) => (sway ? (Math.floor((p.f + i * 9) / 20) % 2) * 12 : 0);
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={2} seed={p.seed ?? 2} drift={sway} />
      <Far kind="trees" base={gy - 120} time={time} seed={(p.seed ?? 2) + 1} maxH={420} />
      <Far kind="trees" base={gy} time={time} seed={(p.seed ?? 2) + 5} maxH={300} tint={time === "day" ? "#3c8a4a" : undefined} />
      <GroundBand y={gy} top="grass" body="dirt" f={p.f} />
      <g transform={`translate(${k(1)} 0)`}><PixTree x={110} y={gy + 24} cell={30} kind="pine" /></g>
      <g transform={`translate(${-k(2)} 0)`}><PixTree x={260} y={gy + 12} cell={20} kind="round" /></g>
      <g transform={`translate(${k(3)} 0)`}><PixTree x={960} y={gy + 24} cell={30} kind="round" /></g>
      <g transform={`translate(${-k(4)} 0)`}><PixTree x={800} y={gy + 12} cell={20} kind="pine" /></g>
      <Tile tile="bush" x={360} y={gy - 84} cell={12} />
      <Tile tile="bush" x={640} y={gy - 84} cell={12} />
      <Tint time={time === "space" ? "night" : time} y={gy - 600} />
    </g>
  );
}
