import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, makeGrid, fill, outlined, gridOf } from "../style/index";
import type { Grid } from "../style/index";
import { PixSky, Far, TileRect, PixTree, TP, snap } from "../backdrop/index";

// Haunted house: pixel-art crooked mansion on a dark hill at night. Two towers with tilted roofs, dark windows,
// one window that flickers, bats that flap across the sky and dead trees. The lower centre stays open.

const mansion = (): Grid => {
  const M = makeGrid(40, 30);
  fill(M, 8, 12, 24, 18, "T");
  fill(M, 0, 4, 8, 26, "S");
  fill(M, 32, 8, 8, 22, "S");
  for (let r = 0; r < 4; r++) fill(M, Math.round(19.5 - (4 + 4 * r) / 2) + (r > 1 ? 1 : 0), 8 + r, 4 + 4 * r, 1, "K");
  for (let r = 0; r < 4; r++) fill(M, 2 + Math.floor(r / 2), r, 2 + 2 * r, 1, "K");
  for (let r = 0; r < 4; r++) fill(M, 34 - Math.floor(r / 2), 4 + r, 2 + 2 * r, 1, "K");
  for (const c of [11, 15, 24, 28]) for (const r of [14, 19]) fill(M, c, r, 2, 3, "k");
  fill(M, 2, 9, 2, 3, "k");
  fill(M, 3, 14, 2, 3, "k");
  fill(M, 35, 12, 2, 3, "k");
  fill(M, 35, 18, 2, 3, "k");
  fill(M, 17, 24, 6, 6, "k");
  fill(M, 18, 23, 4, 1, "k");
  fill(M, 15, 19, 1, 3, "S");
  return M;
};

const BAT_A = ["K.....K", "KK.K.KK", "KKKKKKK", ".KK.KK."];
const BAT_B = [".K.K.K.", "KKKKKKK", ".KKKKK.", "K..K..K"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 9;
  const animOn = (p.anim ?? "flicker") !== "none";
  const f = animOn ? p.f ?? 0 : 0;
  const base = gy - 200;
  const mx = 60, px = 24;
  const flick = animOn ? (Math.floor(f / 5) * 7) % 5 !== 0 : true;
  const bats = [0, 1, 2].map((i) => {
    const x = ((animOn ? f * 2 : 0) + i * 420) % 1280 - 100;
    const y = 240 + i * 110 + (animOn ? Math.round(Math.sin((f + i * 20) / 12) * 1) * 12 : 0);
    const frame = animOn ? (Math.floor(f / 6) + i) % 2 : 0;
    return <Pixels key={"bat" + i} grid={outlined(gridOf(frame ? BAT_B : BAT_A))} px={18} pal={TP} x={x} y={y} />;
  });
  return (
    <g>
      <PixSky time="night" to={base} f={f} clouds={0} seed={seed} drift={false} />
      <Far kind="hills" base={base + 20} time="night" seed={seed} maxH={320} tint="#1b1d3a" />
      <TileRect tile="grass" x={0} y={base + 20} w={1080} h={1920 - base - 20} pal={{ G: "#2c3a3a", e: "#1f2e2e", f: "#15202a", D: "#22233a", E: "#191a2e" }} />
      <Pixels grid={outlined(mansion())} px={px} pal={TP} x={mx - px} y={base - 30 * px - px} />
      <rect x={mx + 15 * px} y={base - 30 * px + 14 * px} width={2 * px} height={3 * px} fill="#f7d154" opacity={flick ? 0.9 : 0.15} />
      <rect x={mx + 11 * px} y={base - 30 * px + 19 * px} width={2 * px} height={3 * px} fill="#f7d154" opacity={0.25} />
      <rect x={mx + 3 * px} y={base - 30 * px + 9 * px} width={2 * px} height={3 * px} fill="#f7d154" opacity={0.15 + 0.1 * (Math.floor(f / 9) % 2)} />
      <PixTree x={70} y={gy - 90} cell={20} kind="dead" />
      <PixTree x={1010} y={gy - 80} cell={22} kind="dead" />
      {bats}
      <TileRect tile="grass" x={0} y={gy} w={1080} h={1920 - gy} f={0} pal={{ G: "#2c3a3a", e: "#1f2e2e", f: "#15202a", D: "#22233a", E: "#191a2e" }} />
    </g>
  );
}
