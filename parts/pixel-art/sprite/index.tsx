import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL, PX, Pixels, gridOf, outlined, rowsOf, type PixelMap } from "../style/index";

// Pixel sprite generator: draw any small game sprite from pixel-map strings (one char per cell, "." empty) and the
// pixel-art palette. 1-4 frames cycle every `fps` video frames. A dark one-cell outline is added automatically.
// Origin = bottom centre on (x, y) (or the centre when centre = true). Presets reuse it through the named export Sprite.

export type SpriteSpec = {
  map?: PixelMap; frames?: PixelMap[]; pal?: Record<string, string>; px?: number; fps?: number; outline?: boolean;
  anim?: "none" | "bob" | "bounce" | "float" | "shake" | "pulse"; centre?: boolean; flip?: boolean;
};

const DEMO = [
  "....yyyy....",
  "...yyyyyy...",
  "..yyywwyyy..",
  "..yyywkyyy..",
  "..yyyyyyyy..",
  "..yyyyoooo..",
  "...yyyyyy...",
  "....yyyy....",
];

export const Sprite: React.FC<SpriteSpec & { x: number; y: number; s?: number; f: number }> = (q) => {
  const { x, y, s = 1, f, flip, map, frames, pal, px = PX, fps = 8, outline = true, anim = "none", centre = false } = q;
  const list: PixelMap[] = frames && frames.length ? frames : [map ?? DEMO];
  const cur = list[Math.floor(f / Math.max(1, fps)) % list.length];
  const g0 = gridOf(rowsOf(cur));
  const g = outline ? outlined(g0) : g0;
  const w = (g[0]?.length ?? 0) * px, h = g.length * px;
  const P = { ...PAL, ...(pal ?? {}) };
  const step = px;
  let dy = 0, dx = 0, sc = 1;
  if (anim === "bob") dy = Math.floor(f / 10) % 2 ? -step : 0;
  if (anim === "bounce") dy = -Math.round(Math.abs(Math.sin((f * Math.PI) / 24)) * 4) * step;
  if (anim === "float") dy = Math.round(Math.sin((f * 2 * Math.PI) / 60) * 2) * step;
  if (anim === "shake") dx = (Math.floor(f / 2) % 2 ? 1 : -1) * Math.round(step / 2);
  if (anim === "pulse") sc = Math.floor(f / 12) % 2 ? 1.08 : 1;
  const oy = centre ? -h / 2 : -h;
  return (
    <g transform={`translate(${x + dx} ${y + dy}) scale(${(flip ? -s : s) * sc} ${s * sc})`}>
      <Pixels grid={g} px={px} pal={P} x={-w / 2} y={oy} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Sprite {...p} x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip} />;
}
