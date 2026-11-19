import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, GroundBand, PixSky, PixTree, Tint, asTime, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf, outlined } from "../style/index";

// Jungle: dense layered tree lines in greens, palms, hanging vines from the top edge, big leaves at the sides and
// a grass ground. The centre stage stays open for sprites. anim "sway" moves vines, leaves and palms from p.f.

const LEAF = outlined(
  gridOf([
    "......ee..",
    "....eeeee.",
    "..eeeeeee.",
    ".eeeeeeeff",
    "eeeeeeeff.",
    ".eeeeeeff.",
    "..eeeeff..",
    "....ff....",
  ]),
);
const VINE_ROWS = (len: number) =>
  Array.from({ length: Math.max(3, Math.floor(len / 12)) }, (_, r) => (r % 4 === 1 ? "ef." : r % 4 === 3 ? ".fe" : ".f."));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 2;
  const sway = (p.anim ?? "sway") === "sway";
  const k = (i: number) => (sway ? (Math.floor((p.f + i * 9) / 20) % 2) * 12 : 0);
  const day = time === "day";
  const vines = Array.from({ length: 14 }, (_, i) => ({
    x: snap(rnd(seed, i) * 1000),
    len: snap(260 + rnd(seed, i + 40) * 420),
  }));
  return (
    <g>
      <PixSky time={time} to={gy} f={p.f} clouds={1} seed={seed} drift={sway} body={false} />
      <Far kind="trees" base={gy - 260} time={time} seed={seed + 1} maxH={560} tint={day ? "#1d4a31" : undefined} />
      <Far kind="trees" base={gy - 120} time={time} seed={seed + 3} maxH={420} tint={day ? "#2a6b40" : undefined} />
      <Far kind="trees" base={gy} time={time} seed={seed + 5} maxH={280} tint={day ? "#3c8a4a" : undefined} />
      <Tint time={time} y={gy - 600} />
      <GroundBand y={gy} top="grass" body="dirt" f={p.f} />
      <g transform={`translate(${k(1)} 0)`}><PixTree x={140} y={gy + 24} cell={24} kind="palm" /></g>
      <g transform={`translate(${-k(2)} 0)`}><PixTree x={960} y={gy + 24} cell={24} kind="palm" /></g>
      {vines.map((v, i) => (
        <g key={"v" + i} transform={`translate(${v.x + k(i + 3)} 0)`}>
          <Pixels grid={gridOf(VINE_ROWS(v.len))} px={12} x={0} y={0} />
        </g>
      ))}
      <g transform={`translate(${k(4)} 0)`}><Pixels grid={LEAF} px={20} x={-20} y={480} /></g>
      <g transform={`translate(${-k(5)} 0)`}><Pixels grid={LEAF} px={20} x={-20} y={1000} /></g>
      <g transform={`translate(${-k(6)} 0) scale(-1 1) translate(-1080 0)`}><Pixels grid={LEAF} px={20} x={-20} y={560} /></g>
      <g transform={`translate(${k(7)} 0) scale(-1 1) translate(-1080 0)`}><Pixels grid={LEAF} px={20} x={-20} y={1080} /></g>
    </g>
  );
}
