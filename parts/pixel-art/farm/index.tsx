import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, GroundBand, PixSky, TileRect, Tint, asTime, snap } from "../backdrop/index";
import { Pixels, PAL, gridOf, outlined } from "../style/index";

// Farm: a red barn with a grey roof, a round silo, a wooden fence along both edges, crop rows at the field edges
// and a sun in the sky, on a grass ground. The centre stage stays open for sprites. anim "drift" moves clouds.

const ROOF = gridOf(
  Array.from({ length: 8 }, (_, r) => {
    const row = Array.from({ length: 21 }, () => ".");
    for (let c = 10 - r; c <= 10 + r; c++) if (c >= 0 && c < 21) row[c] = r === 7 || c === 10 - r || c === 10 + r ? "k" : "d";
    return row.join("");
  }),
);
const SILO_TOP = gridOf(["..kkkkkk..", ".kwwwwwwk.", "kwwwwwwwwk", "kkkkkkkkkk"]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const time = asTime(p.time);
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 10;
  const drift = (p.anim ?? "drift") === "drift";
  const fenceX = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <g>
      <PixSky time={time} to={gy} f={drift ? p.f : 0} clouds={2} seed={seed} drift={drift} />
      <Far kind="hills" base={gy - 90} time={time} seed={seed + 1} maxH={300} />
      <Far kind="trees" base={gy - 40} time={time} seed={seed + 3} maxH={180} />
      <TileRect tile="crops" x={0} y={gy - 230} w={220} h={96} cell={12} />
      <TileRect tile="dirt" x={0} y={gy - 134} w={220} h={24} cell={12} />
      <TileRect tile="crops" x={0} y={gy - 110} w={220} h={48} cell={12} />
      <TileRect tile="crops" x={860} y={gy - 230} w={220} h={96} cell={12} />
      <TileRect tile="dirt" x={860} y={gy - 134} w={220} h={24} cell={12} />
      <TileRect tile="crops" x={860} y={gy - 110} w={220} h={48} cell={12} />
      <GroundBand y={gy} top="grass" body="dirt" />
      <rect x={752} y={gy - 300} width={240} height={300} fill="#8a3a2c" />
      <TileRect tile="wood" x={752} y={gy - 300} w={240} h={300} cell={12} pal={{ P: "#b53a2c", Q: "#6b2118" }} />
      <Pixels grid={ROOF} px={12} pal={{ ...PAL, d: "#5a6170", k: "#2a2a40" }} x={716} y={gy - 300 - 8 * 12} />
      <rect x={840} y={gy - 180} width={60} height={180} fill="#2a1a14" />
      <rect x={840} y={gy - 180} width={60} height={12} fill="#f5f1e8" />
      <rect x={868} y={gy - 180} width={4} height={180} fill="#f5f1e8" />
      <rect x={770} y={gy - 240} width={36} height={36} fill="#f5f1e8" />
      <rect x={940} y={gy - 240} width={36} height={36} fill="#f5f1e8" />
      <rect x={60} y={gy - 420} width={120} height={420} fill="#c9cdd6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={"rib" + i} x={60} y={gy - 420 + i * 84} width={120} height={12} fill="#8d93a0" />
      ))}
      <Pixels grid={outlined(SILO_TOP)} px={12} pal={{ ...PAL, w: "#e8eef6" }} x={48} y={gy - 420 - 60} />
      {fenceX.map((i) => (
        <g key={"fence" + i}>
          <rect x={i * 144 - 12} y={gy - 110} width={24} height={110} fill="#b08050" />
          <rect x={i * 144 - 12} y={gy - 90} width={144} height={12} fill="#c9874f" opacity={i > 1 && i < 6 ? 0 : 1} />
        </g>
      ))}
      <Tint time={time} y={gy - 600} />
    </g>
  );
}
