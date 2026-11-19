import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, GroundBand, PixSky, PixTree, TileRect, Tint, asTime, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Lake: a calm lake in the middle distance, ringed by trees, with reeds on the shore, a wooden jetty and a grass
// foreground. anim "ripple" blinks the glints on the water from p.f.

const REED = gridOf([".x.", ".x.", "ex.", "ff.", "fe."]);
const GLINT = gridOf(["w.w", ".w.", "w.w"]);
const SHORE = 660;
const FRONT = 1400;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? FRONT, 12);
  const seed = p.seed ?? 7;
  const ripple = (p.anim ?? "ripple") === "ripple";
  const f = ripple ? p.f : 0;
  const glints = Array.from({ length: 18 }, (_, i) => ({
    x: snap(120 + rnd(seed, i) * 840),
    y: snap(SHORE + 80 + rnd(seed, i + 40) * (gy - SHORE - 160)),
    t: i * 9,
  }));
  const reeds = Array.from({ length: 10 }, (_, i) => ({
    x: i < 5 ? snap(12 + i * 36) : snap(960 + (i - 5) * 24),
    y: snap(gy - 96 - rnd(seed, i + 70) * 48),
  }));
  return (
    <g>
      <PixSky time={time} to={SHORE} f={f} clouds={2} seed={seed} drift={ripple} />
      <Far kind="trees" base={SHORE + 20} time={time} seed={seed + 1} maxH={240} />
      <TileRect tile="water" x={0} y={SHORE} w={1080} h={gy - SHORE} cell={12} f={f} />
      <TileRect tile="waterTop" x={0} y={SHORE} w={1080} h={48} cell={12} f={f} />
      {glints.map((g, i) => {
        if (ripple && Math.floor((p.f + g.t) / 20) % 3 === 0) return null;
        return <Pixels key={"g" + i} grid={GLINT} px={12} pal={{ w: "#dff4ff" }} x={g.x} y={g.y} />;
      })}
      <PixTree x={96} y={SHORE + 40} cell={16} kind="round" />
      <PixTree x={1000} y={SHORE + 40} cell={16} kind="round" />
      <PixTree x={40} y={SHORE + 170} cell={12} kind="pine" />
      <PixTree x={1040} y={SHORE + 170} cell={12} kind="pine" />
      <rect x={720} y={1000} width={300} height={48} fill="#7a4a2b" />
      <TileRect tile="wood" x={720} y={1000} w={300} h={48} cell={12} />
      {[740, 800, 900, 980].map((x) => (
        <rect key={x} x={x} y={1048} width={12} height={72} fill="#5a3a22" />
      ))}
      {reeds.map((r, i) => (
        <Pixels key={"r" + i} grid={REED} px={16} x={r.x} y={r.y} />
      ))}
      <GroundBand y={gy} top="grass" body="dirt" f={f} />
      <Tint time={time} y={SHORE} />
    </g>
  );
}
