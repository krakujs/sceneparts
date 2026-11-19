import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pixel-art three-step winners podium with glowing 1, 2 and 3.
// Role chars: a = main colour, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#7a4bb5", A: "#4a2b78", z: "#f7d154" };
const MAP = [
  "..............................",
  "..............................",
  "..............................",
  "..............................",
  "..............................",
  "..............................",
  "..............................",
  "..........wwwwwwwwwA..........",
  "..........waaaaaaaaA..........",
  "..........waaazaaaaA..........",
  "..........waazzaaaaA..........",
  "wwwwwwwwwAwaaazaaaaA..........",
  "waaaaaaaaAwaaazaaaaAwwwwwwwwwA",
  "waazzzaaaAwaazzzaaaAwaaaaaaaaA",
  "waaaazaaaAwaaaaaaaaAwaazzzaaaA",
  "waazzzaaaAwaaaaaaaaAwaaaazaaaA",
  "waazaaaaaAwaaaaaaaaAwaazzzaaaA",
  "waazzzaaaAwaaaaaaaaAwaaaazaaaA",
  "waaaaaaaaAwaaaaaaaaAwaazzzaaaA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
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
