import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Lion: pixel-art sprite, side view facing right, standing on y.
// Role chars: a = golden coat (char a); A = mane, legs and shade (char A); z = tail tuft. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#e0a64a", A: "#8a5a2a", z: "#6a4420" };
const BODY = [
  "..................AAAAAA.......",
  "...............AAAAAAAAAAA.....",
  "..............AAAAaaaaaaAAA....",
  ".............AAAAaaaaaaaaAA....",
  ".............AAAaaaakaaaaAA....",
  ".............AAAaaaaaaaaaAA....",
  "..............AAAaaaaaaaaAA....",
  "...............AAAAAAAAAAA.....",
  "..........aaaaaaaaaaaaAA.......",
  "..aaaaaaaaaaaaaaaaaaaa.........",
  "zaaaaaaaaaaaaaaaaaaaa..........",
  "zzaaaaaaaaaaaaaaaaaaa..........",
  "AaaaaaaaaaaaaaaaaaaaA..........",
  "AAAAAAAAAAAAAAAAAAAA...........",
];
const LEG_A = [
  "..AA....AA.....AAA.............",
  "..AA....AA.....AAA.............",
  "..AA....AA.....AAA.............",
];
const LEG_B = [
  "...AA..AA......AAA.............",
  "..AA....AA.....AAA.............",
  "..AA.....AA....AAA.............",
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
