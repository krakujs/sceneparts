import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pixel-art golden trophy with handles and a stepped base.
// Role chars: a = main colour, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#f7d154", A: "#d9a43a", z: "#7a4a2b" };
const MAP = [
  "...aaaaaaaaaa...",
  ".aaawaaaaaaaAaa.",
  "a..awaaaaaaaA..a",
  "a..awaaaaaaaA..a",
  "a...aaaaaaaA...a",
  ".aa.aaaaaaA..aa.",
  ".....aaaaaA.....",
  "......aaaA......",
  "......aaA.......",
  ".......aA.......",
  ".......aA.......",
  "..awaaaaaaaaaA..",
  ".aaaaaaaaaaaaaA.",
  "zzzzzzzzzzzzzzzz",
  "AAAAAAAAAAAAAAAA",
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
