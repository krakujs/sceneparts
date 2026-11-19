import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, gridOf, outlined } from "../style/index";
import { TileRect, snap } from "../backdrop/index";

// Castle interior: stone hall with tall arched windows, hanging banners, a carpet runner and wall torches.

const WIN = [
  "....KKKK....",
  "..KKVVVVKK..",
  ".KVVVVVVVVK.",
  "KVVVVKKVVVVK",
  "KVVVVKKVVVVK",
  "KVVVVKKVVVVK",
  "KKKKKKKKKKKK",
  "KVVVVKKVVVVK",
  "KVVVVKKVVVVK",
  "KVVVVKKVVVVK",
  "KVVVVKKVVVVK",
  "KKKKKKKKKKKK",
];
const BANNER = ["rrrrrrrr", "rrrrrrrr", "rrYYYYrr", "rrrYrrrr", "rrYYYYrr", "rrrrrrrr", "rrrrrrrr", "rrrrrrrr", "..rrrr..", "...rr..."];
const TORCH = [
  ["..y...", ".yoy..", ".oyo..", "oryro.", ".ror..", "..r...", "..u...", ".uuu..", "..u...", "..u..."],
  ["...y..", "..yo..", ".oyyo.", ".oyro.", "..ror.", "..r...", "..u...", ".uuu..", "..u...", "..u..."],
];
const PAL_WIN = { K: "#2a2a40", V: "#8fd0f8", k: "#1b1b2e" };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "flicker") === "flicker";
  const fr = on ? Math.floor(p.f / 6) % 2 : 0;
  const glow = on ? 0.16 + 0.07 * (Math.floor(p.f / 6) % 2) : 0.2;
  const torch = (x: number, y: number, key: string) => (
    <g key={key}>
      <circle cx={x + 60} cy={y + 60} r={190} fill="#f08a3c" opacity={glow} />
      <Pixels grid={outlined(gridOf(TORCH[fr]))} px={20} x={x} y={y} />
    </g>
  );
  const banner = (x: number, key: string) => (
    <g key={key}>
      <rect x={x - 12} y={0} width={216} height={24} fill="#7a4a2b" />
      <Pixels grid={gridOf(BANNER)} px={24} x={x} y={24} />
    </g>
  );
  return (
    <g>
      <TileRect tile="stone" x={0} y={0} w={1080} h={fy} cell={12} pal={{ U: "#7d8394", S: "#636a7c", T: "#454b5c" }} />
      <rect x={0} y={0} width={1080} height={fy} fill="#0d1030" opacity={0.12} />
      {/* tall arched windows */}
      <Pixels grid={gridOf(WIN)} px={24} pal={PAL_WIN} x={96} y={fy - 900} />
      <Pixels grid={gridOf(WIN)} px={24} pal={PAL_WIN} x={720} y={fy - 900} />
      {/* banners */}
      {banner(408, "b1")}
      {banner(456, "b2")}
      {/* torches on the back wall */}
      {torch(340, fy - 600, "t1")}
      {torch(700, fy - 600, "t2")}
      {/* floor */}
      <TileRect tile="stone" x={0} y={fy} w={1080} h={1920 - fy} cell={12} pal={{ U: "#8a8fa0", S: "#6b7083", T: "#3d4250" }} />
      <rect x={0} y={fy} width={1080} height={12} fill="#1b1b2e" />
      {/* carpet runner */}
      <TileRect tile="carpet" x={432} y={fy + 12} w={216} h={1920 - fy - 12} cell={12} />
      <rect x={420} y={fy + 12} width={12} height={1920 - fy - 12} fill="#f7d154" />
      <rect x={648} y={fy + 12} width={12} height={1920 - fy - 12} fill="#f7d154" />
    </g>
  );
}
