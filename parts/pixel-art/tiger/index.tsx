import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Tiger: pixel-art sprite, side view facing right, standing on y.
// Role chars: a = orange coat (char a); A = black stripes (char A); z = white belly. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#e8892e", A: "#1b1b2e", z: "#f5f1e8" };
const BODY = [
  "..............AA...AA..",
  ".............aaaaaaaaa.",
  "............aakaaaaaaa.",
  "...........aaaaaaaaaaaa",
  "..aaaaaaaAaaaaaaaaaaaaa",
  ".aaaAaaaaAaaaaaaaaaaaa.",
  "aAaaaAaaaAaaaazzzzzzaa.",
  "aaAaaaAaaaAzzzzzzzzzzaa",
  "AzzzzzzzzzzzzzzzzzzzzzA",
  "AAAAAAAAAAAAAAAAAAAAAA.",
];
const LEG_A = [
  "...AA..AA.....AA.......",
  "...AA..AA.....AA.......",
  "...AA..AA.....AA.......",
];
const LEG_B = [
  "....AA.AA.....AA.......",
  "...AA..AA.....AA.......",
  "...AA...AA...AA........",
];
const STAND = [...BODY, ...LEG_A];
const STEP = [...BODY, ...LEG_B];

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
