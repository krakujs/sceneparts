import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Horse: a tall brown horse with a long neck, dark mane, dark tail and dark lower legs. Side view facing right.
// Role chars: a = coat (brown), A = mane, tail and lower legs (dark), z = pale muzzle. k = eye.
const COLS = { a: "#8a5a34", A: "#2e1c10", z: "#c9a57a" };
const STAND = [
  "........................AA.....",
  ".......................aaaaaa..",
  "......................AaaakaaA.",
  ".....................AAaaaaaz..",
  "....................AAaaaaaaa..",
  "...................AAaaaaaaa...",
  "..................AAaaaaaaaa...",
  "................AAaaaaaaaaa....",
  "..AAA...........aaaaaaaaaaaaa..",
  "..AAAaaaaaaaaaaaaaaaaaaaa......",
  ".AAAaaaaaaaaaaaaaaaaaaaa.......",
  "AAAAaaaaaaaaaaaaaaaaaaa........",
  "AAA.aaaaaaaaaaaaaaaaaa.........",
  "A...aaaaaaaaaaaaaaaaaa.........",
  "......aa...........aa..........",
  "......aa...........aa..........",
  "......aa...........aa..........",
  "......AA...........AA..........",
  "......AA...........AA..........",
  "......AA...........AA..........",
];
const STEP = [
  "........................AA.....",
  ".......................aaaaaa..",
  "......................AaaakaaA.",
  ".....................AAaaaaaz..",
  "....................AAaaaaaaa..",
  "...................AAaaaaaaa...",
  "..................AAaaaaaaaa...",
  "................AAaaaaaaaaa....",
  "..AAA...........aaaaaaaaaaaaa..",
  "..AAAaaaaaaaaaaaaaaaaaaaa......",
  ".AAAaaaaaaaaaaaaaaaaaaaa.......",
  "AAAAaaaaaaaaaaaaaaaaaaa........",
  "AAA.aaaaaaaaaaaaaaaaaa.........",
  "A...aaaaaaaaaaaaaaaaaa.........",
  "....aa.............aa..........",
  "....aa.............aa..........",
  "....aa.............aa..........",
  "....AA.............AA..........",
  "....AA.............AA..........",
  "....AA.............AA..........",
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
