import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Pixel-art dark scoreboard with two score panels on legs.
// Role chars: a = main colour, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#23305e", A: "#12182f", z: "#f7d154" };
const MAP = [
  "dddddddddddddddddddddddddddd",
  "dwwwaaaaaaaaaaaaaaaaaaaaaaad",
  "daaaaaaaaaaaaaaaaaaaaaaaaaad",
  "daakkkkkkkkkkaakkkkkkkkkkaad",
  "daakkzkkzzzkkaakzzzkzzzkkaad",
  "daakzzkkkkzkkaakzkzkkkzkkaad",
  "daakkzkkzzzkkaakzkzkzzzkkaad",
  "daakkzkkzkkkkaakzkzkkkzkkaad",
  "daakzzzkzzzkkaakzzzkzzzkkaad",
  "daakkkkkkkkkkaakkkkkkkkkkaad",
  "daaaaaaaaaaaaaaaaaaaaaaaaaad",
  "daaaaaaaaaaaaaaaaaaaaaaaaaad",
  "dAAAAAAAAAAAAAAAAAAAAAAAAAAd",
  "dAAAAAAAAAAAAAAAAAAAAAAAAAAd",
  ".....dd..............dd.....",
  ".....dd..............dd.....",
  ".....dd..............dd.....",
  "...AAAAAAAAAAAAAAAAAAAAAA...",
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
