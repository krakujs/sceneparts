import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, outlined, makeGrid, fill } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, TileRect, Tint, TP, asTime, snap, rnd } from "../backdrop/index";

// Town street: pixel-art outdoor background. A row of shop fronts with striped awnings and lit windows behind,
// brick facades above, lamp posts at the edges, a stone pavement and a road below. Centre stage stays open.

const shop = (w: number, awn: [string, string], wall: string, night: boolean): Grid => {
  const g = makeGrid(w, 12);
  for (let r = 0; r < 2; r++) for (let q = 0; q < w; q++) g[r][q] = Math.floor(q / 2) % 2 ? awn[0] : awn[1];
  for (let q = 0; q < w; q++) g[2][q] = q % 2 ? "." : Math.floor(q / 2) % 2 ? awn[0] : awn[1];
  fill(g, 0, 3, w, 1, "n");
  fill(g, 0, 4, w, 8, wall);
  fill(g, 1, 5, 3, 3, night ? "y" : "c");
  fill(g, w - 4, 5, 3, 3, night ? "y" : "c");
  fill(g, Math.floor(w / 2) - 1, 6, 3, 6, "u");
  return g;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 3;
  const animOn = (p.anim ?? "lamps") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const night = time === "night";
  const shopRow = gy - 260; // back shops stand on this line
  const place = (key: string, x: number, base: number, g: Grid, px: number) => (
    <Pixels key={key} grid={outlined(g)} px={px} pal={TP} x={x - px} y={base - g.length * px - px} />
  );
  const awns: [string, string][] = [["r", "w"], ["b", "y"], ["e", "w"], ["o", "w"]];
  const walls = ["M", "N", "I", "x"];
  const backShops = Array.from({ length: 10 }).map((_, i) =>
    place("bs" + i, i * 108, shopRow, shop(9, awns[i % 4], walls[Math.floor(rnd(seed, i) * 4)], night), 12),
  );
  const frontShops = [
    place("fl", 0, gy, shop(9, ["r", "w"], "M", night), 18),
    place("fr", 900, gy, shop(9, ["b", "y"], "N", night), 18),
  ];
  const lamp = (key: string, x: number, glowOn: number) => (
    <g key={key}>
      <circle cx={x + 6} cy={gy - 640} r={180} fill="#f7d154" opacity={glowOn} />
      <rect x={x - 6} y={gy - 660} width={48} height={36} fill={TP.k} />
      <rect x={x} y={gy - 654} width={36} height={24} fill="#f7d154" />
      <rect x={x} y={gy - 630} width={12} height={630} fill={TP.d} />
    </g>
  );
  const glow = animOn ? 0.16 + 0.07 * (Math.floor(f / 8) % 2) : 0.2;
  return (
    <g>
      <PixSky time={time} to={shopRow - 140} f={f} clouds={2} seed={seed} drift={animOn} />
      <TileRect tile="brick" x={0} y={shopRow - 480} w={1080} h={340} f={f} />
      <TileRect tile="wall" x={0} y={shopRow} w={1080} h={gy - shopRow} f={f} pal={{ S: "#7a6f8a", T: "#5a5070" }} />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={"w" + i} x={i * 216 + 60} y={shopRow - 430} width={48} height={60} fill={night || rnd(seed, i + 40) > 0.5 ? "#f7d154" : "#2a2a40"} />
      ))}
      {backShops}
      <TileRect tile="stone" x={0} y={gy} w={1080} h={120} f={f} />
      <TileRect tile="road" x={0} y={gy + 120} w={1080} h={1920 - gy - 120} f={f} />
      {frontShops}
      {lamp("l1", 200, glow)}
      {lamp("l2", 880, glow)}
      <Tint time={time} y={0} />
    </g>
  );
}
