import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid, fill } from "../style/index";
import { PixSky, TileRect, Tint, TP, asTime, snap, rnd } from "../backdrop/index";

// Racetrack: pixel-art race circuit in perspective. Asphalt track with red and white kerbs that scroll from p.f,
// a checkered finish line, a grandstand with coloured spectators and flags on poles along the far side.

const CHECK = (() => {
  const g = makeGrid(20, 2);
  for (let r = 0; r < 2; r++) for (let q = 0; q < 20; q++) g[r][q] = (q + r) % 2 ? "k" : "w";
  return g;
})();

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 16;
  const animOn = (p.anim ?? "flags") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const hz = gy - 600;
  const half = (y: number) => 40 + ((y - hz) / (1920 - hz)) * 460;
  const kerbs = Array.from({ length: 16 }).map((_, k) => {
    const t = (((k / 16 + f / 300) % 1) + 1) % 1;
    const y = hz + (1920 - hz) * t * t;
    const w = 8 + 30 * t, h = 10 + 60 * t;
    const colour = k % 2 ? "#e8eef6" : "#d2403f";
    return (
      <g key={"k" + k}>
        <rect x={540 - half(y) - w} y={snap(y)} width={w} height={h} fill={colour} />
        <rect x={540 + half(y)} y={snap(y)} width={w} height={h} fill={k % 2 ? "#d2403f" : "#e8eef6"} />
      </g>
    );
  });
  const stands = Array.from({ length: 6 }).map((_, r) =>
    Array.from({ length: 46 }).map((__, c) => {
      if (rnd(seed, r * 60 + c) < 0.2) return null;
      const colours = ["#d2403f", "#2f5fb8", "#f7d154", "#f5f1e8", "#ef8fb4", "#f08a3c", "#4caf50"];
      const wave = animOn ? Math.round(Math.sin((f + c * 9 + r * 20) / 14)) * 12 : 0;
      return <rect key={`${r}-${c}`} x={c * 24} y={snap(hz - 240 + r * 36 + wave)} width={12} height={12} fill={colours[Math.floor(rnd(seed, c * 13 + r) * colours.length)]} />;
    }),
  );
  const flags = [120, 420, 660, 960].map((x, i) => {
    const off = animOn ? Math.round(Math.sin((f + i * 30) / 9)) * 12 : 0;
    return (
      <g key={"fl" + i}>
        <rect x={x} y={hz - 300} width={8} height={300} fill={TP.d} />
        <rect x={x + 8} y={hz - 300 + off * 0} width={60 + off} height={36} fill={i % 2 ? "#2f5fb8" : "#f7d154"} />
      </g>
    );
  });
  const finish = snap(1400, 24);
  const fw = Math.round((2 * half(finish)) / 24) * 24;
  const fx = 540 - fw / 2;
  return (
    <g>
      <PixSky time={time} to={hz} f={f} clouds={2} seed={seed} drift={animOn} />
      <rect x={0} y={hz - 260} width={1080} height={260} fill="#3a3f52" />
      {stands}
      {flags}
      <TileRect tile="grass" x={0} y={hz} w={1080} h={1920 - hz} f={f} />
      <polygon points={`${540 - half(hz)},${hz} ${540 + half(hz)},${hz} ${540 + half(1920)},1920 ${540 - half(1920)},1920`} fill="#4c525f" shapeRendering="crispEdges" />
      {kerbs}
      <g transform={`translate(${fx} ${finish})`}>
        <Pixels grid={CHECK} px={24} pal={TP} x={0} y={0} />
      </g>
      <rect x={fx} y={finish - 6} width={fw} height={6} fill="#f5f1e8" />
      <Tint time={time} y={0} />
    </g>
  );
}
