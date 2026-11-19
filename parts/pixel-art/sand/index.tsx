import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf, outlined } from "../style/index";

// Sand: a full-frame desert sand texture seen from above, with wind ripples, pebbles and a shell.
// anim "shimmer" drifts pale heat-haze bands up the frame from p.f.

const RIPPLE = gridOf(["OOOO.....", ".OOOOOO..", "....OOOO."]);
const PEBBLE = outlined(gridOf([".dd.", "dgdd", "dddd", ".dd."]));
const SHELL = outlined(gridOf(["..mm..", ".mwmwm", "mmwmwm", ".mmmm.", "..mm.."]));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const seed = p.seed ?? 6;
  const shimmer = (p.anim ?? "shimmer") === "shimmer";
  const ripples = Array.from({ length: 36 }, (_, i) => ({
    x: snap(rnd(seed, i) * 1000),
    y: snap(rnd(seed, i + 50) * 1880),
  }));
  const pebbles = Array.from({ length: 14 }, (_, i) => ({
    x: snap(rnd(seed, i + 120) * 1040),
    y: snap(rnd(seed, i + 160) * 1860),
  }));
  const bands = Array.from({ length: 6 }, (_, i) => snap((i * 340 + p.f * 1.5) % 1920));
  return (
    <g>
      <TileRect tile="sand" x={0} y={0} w={1080} h={1920} cell={12} />
      {ripples.map((r, i) => (
        <Pixels key={"r" + i} grid={RIPPLE} px={12} pal={{ O: "#c79a4f" }} x={r.x} y={r.y} />
      ))}
      {pebbles.map((s, i) => (
        <Pixels key={"p" + i} grid={PEBBLE} px={12} x={s.x} y={s.y} />
      ))}
      <Pixels grid={SHELL} px={12} x={700} y={1300} />
      {shimmer &&
        bands.map((y, i) => <rect key={"b" + i} x={0} y={y} width={1080} height={24} fill="#fff6dc" opacity={0.16} />)}
    </g>
  );
}
