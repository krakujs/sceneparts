import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Broccoli: a pixel-art/sprite item preset (game-inventory style). Sits on y (bottom centre); centre = true for HUD use.
// Role chars: a = main colour, A = shade, z = accent (light-green stalk). k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#3f9a4a", A: "#2e6b45", z: "#9ccc65" };
const MAP = [
  "..aaa.aaa...",
  ".aaaaaaaaa..",
  "aaawaaaaaaA.",
  ".aaaaaaaaAA.",
  "aaaaaaaaaAA.",
  "..aaaaaaaAA.",
  "...aaaaaAA..",
  "....zzzzz...",
  "....zzzzz...",
  "....zzAzz...",
  "....zzzzz...",
  "...zzzzzzz..",
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
