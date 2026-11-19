import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Throne room: royal hall with a throne on a dais at the back, a red carpet, pillars and purple banners.

const BANNER = ["rrrrrrrr", "rrrrrrrr", "rrYYYYrr", "rrrYrrrr", "rrYYYYrr", "rrrrrrrr", "rrrrrrrr", "rrrrrrrr", "..rrrr..", "...rr..."];
const PAL_BAN = { r: "#7a4bb5", Y: "#f7d154" };

const Pillar = ({ x, fy }: { x: number; fy: number }) => (
  <g>
    <rect x={x} y={0} width={96} height={fy} fill="#8d93a0" />
    <rect x={x + 72} y={0} width={24} height={fy} fill="#5f6574" />
    <rect x={x - 12} y={fy - 72} width={120} height={72} fill="#c9a64a" />
    <rect x={x - 12} y={0} width={120} height={36} fill="#c9a64a" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "glow") === "glow";
  const glow = on ? 0.18 + 0.06 * (Math.floor(p.f / 12) % 2) : 0.2;
  const banner = (x: number) => (
    <g key={x}>
      <rect x={x - 12} y={0} width={216} height={24} fill="#c9a64a" />
      <Pixels grid={gridOf(BANNER)} px={24} pal={PAL_BAN} x={x} y={24} />
    </g>
  );
  return (
    <g>
      <TileRect tile="stone" x={0} y={0} w={1080} h={fy} cell={12} pal={{ U: "#7d8394", S: "#636a7c", T: "#454b5c" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#0d1030" opacity={0.1} />
      {/* royal glow behind the throne */}
      <circle cx={540} cy={fy - 420} r={300} fill="#f7d154" opacity={glow} />
      <Pillar x={60} fy={fy} />
      <Pillar x={924} fy={fy} />
      {banner(240)}
      {banner(624)}
      {/* floor, carpet down the middle */}
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ U: "#8a8fa0", S: "#6b7083", T: "#3d4250" }} />
      <TileRect tile="carpet" x={420} y={fy - 72} w={240} h={1920 - fy + 72} cell={12} />
      <rect x={408} y={fy - 72} width={12} height={1920 - fy + 72} fill="#f7d154" />
      <rect x={660} y={fy - 72} width={12} height={1920 - fy + 72} fill="#f7d154" />
      {/* dais */}
      <rect x={240} y={fy - 72} width={600} height={72} fill="#7d8394" />
      <rect x={240} y={fy - 72} width={600} height={12} fill="#c9a64a" />
      <rect x={300} y={fy - 200} width={480} height={128} fill="#8d93a0" />
      <rect x={300} y={fy - 200} width={480} height={12} fill="#c9a64a" />
      {/* throne: tall back, seat and arms */}
      <rect x={480} y={fy - 660} width={24} height={12} fill="#c9a64a" />
      <rect x={528} y={fy - 672} width={24} height={24} fill="#c9a64a" />
      <rect x={576} y={fy - 660} width={24} height={12} fill="#c9a64a" />
      <rect x={456} y={fy - 648} width={168} height={388} fill="#c9a64a" />
      <rect x={480} y={fy - 624} width={120} height={336} fill="#b5523b" />
      <rect x={504} y={fy - 600} width={72} height={288} fill="#7f3426" />
      <rect x={432} y={fy - 300} width={36} height={100} fill="#c9a64a" />
      <rect x={600} y={fy - 300} width={36} height={100} fill="#c9a64a" />
      <rect x={456} y={fy - 260} width={168} height={60} fill="#b5523b" />
      <rect x={456} y={fy - 260} width={168} height={12} fill="#c9a64a" />
      <rect x={456} y={fy - 200} width={168} height={12} fill="#7f3426" />
      <Pixels grid={outlined(gridOf(["..y..", ".yyy.", "yyyyy"]))} px={12} x={522} y={fy - 610} />
    </g>
  );
}
