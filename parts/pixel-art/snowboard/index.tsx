import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Snowboard: a pixel-art/sprite item preset (game-inventory style), drawn by the orchestrator. Sits on y (bottom centre);
// centre = true for HUD use. Role chars: a = main colour, A = shade, z = accent; other chars index the style palette.
const COLS = {"a": "#7a4bb5", "A": "#4a2d75", "z": "#f7d154"};
const MAP = [
  "....aaaaaaaaaaaaaa....",
  "..aaaaaaaaaaaaaaaaaa..",
  ".azaaaaakkdkaakdkkaza.",
  "azazaaaakddkaakddkazaz",
  "azazaaaakddkaakddkazaz",
  ".azaaaaakkdkaakdkkaza.",
  "..aAAAAAAAAAAAAAAAAA..",
  "....AAAAAAAAAAAAAA....",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const pal = { ...COLS, ...(p.colour ? { a: p.colour } : {}), ...(p.colour2 ? { A: p.colour2 } : {}), ...(p.pal ?? {}) };
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      map={MAP} anim={p.anim ?? "none"} centre={!!p.centre} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
