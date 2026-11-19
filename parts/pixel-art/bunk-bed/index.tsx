import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Bunk bed: a pixel-art/sprite item preset (game-inventory style). Sits on y (bottom centre); centre = true for HUD use.
// Role chars: a = main colour, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#c9874f", A: "#7a4a2b", z: "#e0303a" };
const MAP = [
  "aAaaaaaaaaaaaaaaaaaaaaaA",
  "aA..a....a....a....a..aA",
  "aA..a....a....a....a..aA",
  "aAwwwww...............aA",
  "aAwwwww...............aA",
  "aAzzzzzzzzzzzzzzzzzzzzaA",
  "aAzzzzzzzzzzzzzzzzzzzzaA",
  "aAwwwwwwwwwwwwwwwwwwwwaA",
  "aAggggggggggggggggggggaA",
  "aAaaaaaaaaaaaaaaaaaaaaaA",
  "aAAAAAAAAAAAAAAAAAAAAAaA",
  "aA...............A..A.aA",
  "aA...............AaaA.aA",
  "aA...............A..A.aA",
  "aA...............AaaA.aA",
  "aA...............A..A.aA",
  "aA...............AaaA.aA",
  "aA...............A..A.aA",
  "aA...............AaaA.aA",
  "aA...............A..A.aA",
  "aAwwwww...............aA",
  "aAwwwww...............aA",
  "aAzzzzzzzzzzzzzzzzzzzzaA",
  "aAzzzzzzzzzzzzzzzzzzzzaA",
  "aAzzzzzzzzzzzzzzzzzzzzaA",
  "aAwwwwwwwwwwwwwwwwwwwwaA",
  "aAggggggggggggggggggggaA",
  "aAaaaaaaaaaaaaaaaaaaaaaA",
  "aAAAAAAAAAAAAAAAAAAAAAaA",
  "aA....................aA"
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
