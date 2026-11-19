import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, Pixels, gridOf, outlined } from "../style/index";
import { ICONS, PixText } from "../backdrop/index";

// Coin counter: pixel-art coin HUD (reference for collectible counters). A coin that spins by swapping a full frame
// for a narrow one, and a number that counts up from `from` to `to` at `speed` coins per frame, starting at `at`.

const COIN_NARROW = [
  "..yyyy..",
  "..yyyy..",
  "..yyyy..",
  "..yyyy..",
  "..yyyy..",
  "..yyyy..",
  "..oooo..",
  "........",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  if (p.f < (p.at ?? 0)) return <g />;
  const from = p.from ?? 0, to = p.to ?? 42;
  const t = Math.max(0, p.f - (p.at ?? 0));
  const value = Math.min(Math.max(from, to), Math.round(from + t * (p.speed ?? 0.5)));
  const shown = String(Math.max(0, value)).padStart(3, "0");
  const spin = (p.anim ?? "spin") === "spin";
  const narrow = spin && Math.floor(p.f / 6) % 2 === 1;
  const coin = narrow ? outlined(gridOf(COIN_NARROW)) : outlined(gridOf(ICONS.coin));
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Pixels grid={coin} px={12} x={-200} y={-60} />
      <PixText x={-20} y={28} text={`x ${shown}`} size={80} anchor="start" fill={PAL.w} />
    </g>
  );
}
