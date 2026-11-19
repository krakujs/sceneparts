import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Blueberries: a pixel-art/sprite item preset (game-inventory style). Sits on y (bottom centre); centre = true for HUD use.
// Role chars: a = main colour, A = shade, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#3f6fd6", A: "#2a4a9a", z: "#23305e" };
const MAP = [
  ".......n.........",
  "......bwbn.......",
  ".....bbbbn.......",
  ".....bbbnn.......",
  "......nnn........",
  ".................",
  "....n.....n......",
  "...bwbn..bwbn....",
  "..bbbbn.bbbbn....",
  "..bbbnn.bbbnn....",
  "...nnn...nnn.....",
  ".................",
  "..n.....n.....n..",
  ".bwbn..bwbn..bwbn",
  "bbbbn.bbbbn.bbbbn",
  "bbbnn.bbbnn.bbbnn",
  ".nnn...nnn...nnn.",
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
