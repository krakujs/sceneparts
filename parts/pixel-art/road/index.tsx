import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PixSky, Far, TileRect, PixTree, Tint, TP, asTime, snap } from "../backdrop/index";

// Road: pixel-art country road in perspective. A straight asphalt road running from the horizon to the bottom
// edge, dashed centre lane markings and trees on the verges that scroll towards the viewer from p.f.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 15;
  const scroll = (p.anim ?? "scroll") !== "none";
  const f = scroll ? p.f ?? 0 : 0;
  const hz = gy - 600;
  const half = (y: number) => 26 + ((y - hz) / (1920 - hz)) * 470;
  const at = (k: number, n: number) => {
    const t = (((k / n + f / 240) % 1) + 1) % 1;
    return { t, y: hz + (1920 - hz) * t * t };
  };
  const dashes = Array.from({ length: 10 }).map((_, k) => {
    const { t, y } = at(k, 10);
    const w = 6 + 22 * t, h = 20 + 120 * t;
    return <rect key={"d" + k} x={540 - w / 2} y={snap(y)} width={w} height={h} fill="#f7d154" />;
  });
  const trees = Array.from({ length: 10 }).map((_, k) => {
    const { t, y } = at(k, 5);
    const side = k % 2 ? 1 : -1;
    const cell = 2 + Math.round(12 * t);
    const x = 540 + side * (half(y) + 60 + 40 * t);
    return <PixTree key={"t" + k} x={snap(x)} y={snap(y)} cell={cell} kind={k % 3 === 0 ? "pine" : "round"} />;
  });
  const roadPts = `${540 - half(hz)},${hz} ${540 + half(hz)},${hz} ${540 + half(1920)},1920 ${540 - half(1920)},1920`;
  return (
    <g>
      <PixSky time={time} to={hz} f={f} clouds={2} seed={seed} drift={scroll} />
      <Far kind="hills" base={hz + 40} time={time} seed={seed} maxH={200} />
      <Far kind="trees" base={hz + 60} time={time} seed={seed + 1} maxH={120} />
      <TileRect tile="grass" x={0} y={hz} w={1080} h={1920 - hz} f={f} />
      <polygon points={roadPts} fill="#4a4f5c" shapeRendering="crispEdges" />
      <polygon points={`${540 - half(hz) + 6},${hz} ${540 - half(hz)},${hz} ${540 - half(1920)},1920 ${540 - half(1920) + 18},1920`} fill="#f5f1e8" />
      <polygon points={`${540 + half(hz) - 6},${hz} ${540 + half(hz)},${hz} ${540 + half(1920)},1920 ${540 + half(1920) - 18},1920`} fill="#f5f1e8" />
      {dashes}
      {trees}
      <Tint time={time} y={0} />
    </g>
  );
}
