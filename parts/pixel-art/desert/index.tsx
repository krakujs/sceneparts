import React from "react";
import type { PartProps } from "@sceneparts/core";
import { GroundBand, PixSky, TileRect, Tint, asTime, rnd, snap } from "../backdrop/index";
import { Pixels, PAL, gridOf, outlined } from "../style/index";

// Desert: a hot sun over layered sand dunes, cacti, a rock, a small bone and a sand ground. The centre stage
// stays open for sprites. anim "heat" slides pale heat-haze bars across the dunes from p.f.

const CACTUS = outlined(
  gridOf([
    "....ee....",
    "...eGef...",
    "...eGef...",
    "e..eGef...",
    "e..eGef..e",
    "ef.eGef..e",
    "efeeGef.ef",
    ".eeeGefeef",
    "...eGeeee.",
    "...eGef...",
    "...eGef...",
    "...eGef...",
    "...eGef...",
    "...eGef...",
    "...eGef...",
  ]),
);
const CACTUS_PAL = { ...PAL, e: "#4caf50", G: "#7ed36b", f: "#2e6b45" };
const SUN = gridOf(["..yyyy..", ".yyyyyy.", "yyyyyyyy", "yyyyyyyy", "yyyyyyyy", "yyyyyyyy", ".yyyyyy.", "..yyyy.."]);
const BONE = outlined(gridOf(["w.....w", "ww...ww", ".wwwww.", ".wwwww.", "ww...ww", "w.....w"]));

const dunes = (base: number, maxH: number, seed: number, body: string, cap: string) =>
  Array.from({ length: 46 }, (_, i) => {
    const t = i / 45;
    const h = snap(maxH * (0.5 + 0.3 * Math.sin(t * 6 + seed) + 0.2 * Math.sin(t * 15 + seed * 2)), 12);
    return (
      <g key={"d" + base + "-" + i}>
        <rect x={i * 24} y={base - h} width={25} height={h} fill={body} />
        <rect x={i * 24} y={base - h} width={25} height={12} fill={cap} />
      </g>
    );
  });

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 4;
  const heat = (p.anim ?? "heat") === "heat";
  const dusk = time === "dusk";
  const bars = Array.from({ length: 6 }, (_, i) => ({
    x: snap(((p.f * 2 + i * 200) % 1400) - 200),
    y: snap(gy - 260 + rnd(seed, i) * 240),
  }));
  return (
    <g>
      <PixSky time={time} to={gy} f={0} clouds={0} seed={seed} drift={false} body={false} />
      <circle cx={840} cy={260} r={220} fill="#ffd23f" opacity={0.16} />
      <Pixels grid={outlined(SUN)} px={24} pal={{ ...PAL, y: dusk ? "#ffb347" : "#ffd23f", o: "#f08a3c" }} x={760} y={150} />
      {dunes(gy - 140, 380, seed, dusk ? "#b77a5a" : "#d9a55b", dusk ? "#d69070" : "#f0c77f")}
      {dunes(gy - 30, 200, seed + 2, dusk ? "#c98a64" : "#e8b86d", dusk ? "#e0a078" : "#f7d08f")}
      <Pixels grid={CACTUS} px={14} pal={CACTUS_PAL} x={300} y={gy - 150 - CACTUS.length * 14} />
      <GroundBand y={gy} top="sand" body="sand" />
      <Pixels grid={CACTUS} px={22} pal={CACTUS_PAL} x={40} y={gy + 12 - CACTUS.length * 22} />
      <Pixels grid={CACTUS} px={26} pal={CACTUS_PAL} x={790} y={gy + 12 - CACTUS.length * 26} />
      <TileRect tile="rock" x={960} y={gy - 96} w={120} h={96} cell={12} />
      <Pixels grid={BONE} px={10} x={330} y={gy - 70} />
      {heat &&
        bars.map((b, i) => (
          <rect key={"h" + i} x={b.x} y={b.y} width={180} height={12} fill="#fff3c4" opacity={0.18} />
        ))}
      <Tint time={time} y={gy - 500} />
    </g>
  );
}
