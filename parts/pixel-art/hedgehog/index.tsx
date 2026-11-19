import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Hedgehog: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = spines, A = spine tips and legs, z = pale face. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#7a4a2b", A: "#4a2a16", z: "#e8c39a" };
const STAND = [
  "....A.A.A.A..........",
  "..A.A.A.A.A.A........",
  ".AaAaAaAaAaAaA.......",
  "AaAaAaAaAaAaAaA......",
  "AaaaaaaaaaaaaaaaA....",
  "AaaaaaaaaaaaaaaaaAzz.",
  ".Aaaaaaaaaaaaaaaaakzz",
  "..AaaaaaaaaaaaaaaaaZ.",
  "...AAAAAAAAAAAAAAA...",
  "....AA.....AA........",
  "....AA.....AA........",
  "...AAA.....AAA.......",
];
const STEP = [
  "....A.A.A.A..........",
  "..A.A.A.A.A.A........",
  ".AaAaAaAaAaAaA.......",
  "AaAaAaAaAaAaAaA......",
  "AaaaaaaaaaaaaaaaA....",
  "AaaaaaaaaaaaaaaaaAzz.",
  ".Aaaaaaaaaaaaaaaaakzz",
  "..AaaaaaaaaaaaaaaaaZ.",
  "...AAAAAAAAAAAAAAA...",
  "...AA......AA........",
  "..AA.........AA......",
  "..AAA.......AAA......",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
