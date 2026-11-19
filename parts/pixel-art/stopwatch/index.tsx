import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pixel-art silver stopwatch with a crown button and red hand.
// Role chars: a = main colour, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#a8b0bd", A: "#5a6170", z: "#d2403f" };
const MAP = [
  "......AA......",
  "......AA......",
  "....aaaaaa....",
  "...aaaaaaaa...",
  "...aaaaaaaa...",
  "..aawwwwwwaA..",
  ".aawwwwwwwwaA.",
  ".aawwwrwwwwaA.",
  ".aawwwrwwwwaA.",
  ".aawwwrwwwwaA.",
  ".aawwwkkwwwaA.",
  ".aawwwwwwwwaA.",
  ".aawwwwwwwwaA.",
  "..aawwwwwwaA..",
  "...aaaaaaaa...",
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
