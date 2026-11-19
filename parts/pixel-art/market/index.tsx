import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined, makeGrid, fill } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, TileRect, Tint, TP, asTime, snap } from "../backdrop/index";

// Market: pixel-art market square. Striped stall awnings with fruit on the counters, a row of stalls behind,
// stalls at the front edges, hanging lanterns that glow from p.f, and a cobbled square.

const stall = (w: number, c1: string, c2: string): Grid => {
  const g = makeGrid(w, 13);
  for (let r = 0; r < 3; r++) for (let q = 0; q < w; q++) g[r][q] = Math.floor(q / 2) % 2 ? c1 : c2;
  fill(g, 0, 3, w, 1, "u");
  fill(g, 0, 4, 1, 9, "u");
  fill(g, w - 1, 4, 1, 9, "u");
  fill(g, 1, 5, w - 2, 4, "x");
  fill(g, 1, 8, w - 2, 1, "u");
  fill(g, 1, 9, w - 2, 4, "x");
  for (let q = 2; q < w - 2; q += 3) g[7][q] = ["o", "r", "y", "e"][q % 4];
  return g;
};

const LANTERN = gridOf([".kkk.", "kyyyk", "kyoyk", "kyyyk", ".kkk."]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 18;
  const animOn = (p.anim ?? "lanterns") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const hz = gy - 620;
  const backRow = Array.from({ length: 10 }).map((_, i) => {
    const pair: [string, string] = i % 2 ? ["r", "w"] : ["b", "y"];
    return <Pixels key={"bs" + i} grid={outlined(stall(9, pair[0], pair[1]))} px={12} pal={TP} x={i * 108 - 12} y={hz + 80 - 13 * 12 - 12} />;
  });
  const lanterns = [200, 420, 660, 880].map((x, i) => {
    const y = 300 + (i % 2) * 40;
    const glow = animOn ? 0.18 + 0.08 * (Math.floor((f + i * 5) / 8) % 2) : 0.22;
    return (
      <g key={"ln" + i}>
        <rect x={x + 22} y={0} width={4} height={y} fill={TP.k} />
        <circle cx={x + 24} cy={y + 30} r={80} fill="#f7d154" opacity={glow} />
        <Pixels grid={LANTERN} px={12} pal={TP} x={x} y={y} />
      </g>
    );
  });
  return (
    <g>
      <PixSky time={time} to={hz} f={f} clouds={2} seed={seed} drift={animOn} />
      <TileRect tile="brick" x={0} y={hz - 200} w={1080} h={200} f={f} pal={{ B: "#c9874f", R: "#8a5a36", M: "#e8d8b8" }} />
      {backRow}
      <TileRect tile="stone" x={0} y={hz + 80} w={1080} h={1920 - hz - 80} f={f} pal={{ U: "#b8ae9a", S: "#9a9080", T: "#6a6258" }} />
      {lanterns}
      <Pixels grid={outlined(stall(10, "r", "w"))} px={18} pal={TP} x={0 - 18} y={gy + 40 - 13 * 18 - 18} />
      <Pixels grid={outlined(stall(10, "e", "w"))} px={18} pal={TP} x={900 - 18} y={gy + 40 - 13 * 18 - 18} />
      <Tint time={time} y={0} />
    </g>
  );
}
