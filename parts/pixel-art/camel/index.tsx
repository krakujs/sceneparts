import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Camel: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = tan fur, A = shade (legs, hump edge, belly, lip), z = light patch. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#d4a06a", A: "#8e5f35", z: "#f0e0c0" };
const STAND = [
  ".....................AA.....",
  "......aaaa............aaaa..",
  ".....aaaaaa.........aaakaa..",
  "....aaaaaaaa.......aaaaaaa..",
  "....aaaaaaaa......aaaAaaa.A.",
  "....aaaaaaaa......aaaA...A..",
  ".....aaaaaaaaaaa.aaaaA......",
  ".A..aaaaaaaaaaaaaaaa.A......",
  ".A.aaaaaaaaaaaaaaaaa........",
  ".A.aaaaaaaaaaaaaaaa.........",
  "AA.aaaaaaaaaaaaaaaa.........",
  "A..aaaaaaaaaaaaaaaa.........",
  "A...aaAAAAAAAAAAaa..........",
  "....AAAAAAAAAAAAAA..........",
  "....aa.AAAAAAA.AA.aa........",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  "....AAAAAA.....AAAAAA.......",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  ".....d..d.......d..d........",
  "............................",
];
const STEP = [
  ".....................AA.....",
  "......aaaa............aaaa..",
  ".....aaaaaa.........aaakaa..",
  "....aaaaaaaa.......aaaaaaa..",
  "....aaaaaaaa......aaaAaaa.A.",
  "....aaaaaaaa......aaaA...A..",
  ".....aaaaaaaaaaa.aaaaA......",
  ".A..aaaaaaaaaaaaaaaa.A......",
  ".A.aaaaaaaaaaaaaaaaa........",
  ".A.aaaaaaaaaaaaaaaa.........",
  "AA.aaaaaaaaaaaaaaaa.........",
  "A..aaaaaaaaaaaaaaaa.........",
  "A...aaAAAAAAAAAAaa..........",
  "....AAAAAAAAAAAAAA..........",
  "....aa.AAAAAAA.AA.aa........",
  "....aa.AA......AA.aa........",
  "....aa.AA......AA.aa........",
  "....a...A......A...a........",
  "....AAAAAA.....AAAAAA.......",
  "...aa...AA....AA...aa.......",
  "...aa...AA....AA...aa.......",
  "...aa...AA....AA...aa.......",
  "...a.....A....A.....a.......",
  "...a.....A....A.....a.......",
  "....d....d.....d....d.......",
  "............................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
