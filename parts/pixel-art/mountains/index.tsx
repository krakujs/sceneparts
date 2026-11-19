import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, GroundBand, PixSky, PixTree, Tint, asTime, snap } from "../backdrop/index";

// Mountains: a big snow-capped mountain range behind foothills and pines, with a dirt path across the ground.
// The centre stage is kept open for sprites. anim "drift" moves the clouds from p.f.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 5;
  const drift = (p.anim ?? "drift") === "drift";
  return (
    <g>
      <PixSky time={time} to={gy} f={drift ? p.f : 0} clouds={4} seed={seed} drift={drift} />
      <Far kind="mountains" base={gy - 180} time={time} seed={seed} maxH={640} />
      <Far kind="mountains" base={gy - 40} time={time} seed={seed + 4} maxH={400} tint={time === "day" ? "#5f6a8c" : undefined} />
      <Far kind="hills" base={gy} time={time} seed={seed + 8} maxH={170} />
      <PixTree x={70} y={gy + 12} cell={22} kind="pine" />
      <PixTree x={180} y={gy - 4} cell={14} kind="pine" />
      <PixTree x={960} y={gy + 12} cell={22} kind="pine" />
      <PixTree x={860} y={gy - 4} cell={14} kind="pine" />
      <GroundBand y={gy} top="path" body="path" f={p.f} />
      <Tint time={time} y={gy - 600} />
    </g>
  );
}
