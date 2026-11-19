import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Elephant: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = #9aa0a8, A = #6b717b. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#9aa0a8", A: "#6b717b" };
const STAND = [
  "....................................",
  "....................................",
  "....................................",
  "..........................aaaa......",
  "....................AAAAaaaaaaaa....",
  "...................AAAAAAaaaaaaaa...",
  ".............aaaaaAAAAAAAAaaaaaaa...",
  "..........aaaaaaaaAAAAAAAAakaaaaaa..",
  "........aaaaaaaaaaAAAAAAAAaaaaaaaa..",
  "....AA.aaaaaaaaaaaAAAAAAAAaaaaaaaa..",
  "....AAaaaaaaaaaaaaAAAAAAAAaaaAAaaa..",
  "....AAaaaaaaaaaaaaAAAAAAAAaaAAAAa...",
  "....AAaaaaaaaaaaaaAAAAAAAAaaAAaAa...",
  "....AAaaaaaaaaaaaaAAAAAAAAaaaAaAA...",
  "....AAaaaaaaaaaaaaaAAAAAAaaaaAAAAA..",
  "...AAAaaaaaaaaaaaaaaAAAAaaawaaAAA...",
  "...AA..aaaaaaaaaaaaaaaaaaaawa.AaAA..",
  "........aaaaaaaaaaaaaaaaaaaa..AAAA..",
  ".......aaaaAAAAAAAAAAAAAAaaaa.AAAA..",
  ".......aaaaAAAAAAAAAAAAAAaaaa..aA...",
  ".......aaaaAAAAAAAAAAAAAAaaaa.AAAA..",
  ".......aaaa.AAA......AAA.aaaa.AAA...",
  ".......aaaa.AAA......AAA.aaaaAAAA...",
  ".......aaaa.AAA......AAA.aaaaAAAA...",
  ".......aaaa.AAA......AAA.aaaaAAA....",
  ".......aaaa.AAA......AAA.aaaa.......",
];
const STEP = [
  "....................................",
  "....................................",
  "....................................",
  "..........................aaaa......",
  "....................AAAAaaaaaaaa....",
  "...................AAAAAAaaaaaaaa...",
  ".............aaaaaAAAAAAAAaaaaaaa...",
  "..........aaaaaaaaAAAAAAAAakaaaaaa..",
  "........aaaaaaaaaaAAAAAAAAaaaaaaaa..",
  "....AA.aaaaaaaaaaaAAAAAAAAaaaaaaaa..",
  "....AAaaaaaaaaaaaaAAAAAAAAaaaAAaaa..",
  "....AAaaaaaaaaaaaaAAAAAAAAaaAAAAa...",
  "....AAaaaaaaaaaaaaAAAAAAAAaaAAaAa...",
  "....AAaaaaaaaaaaaaAAAAAAAAaaaAaAA...",
  "....AAaaaaaaaaaaaaaAAAAAAaaaaAAAAA..",
  "...AAAaaaaaaaaaaaaaaAAAAaaawaaAAA...",
  "...AA..aaaaaaaaaaaaaaaaaaaawa.AaAA..",
  "........aaaaaaaaaaaaaaaaaaaa..AAAA..",
  ".......AAAAaaaaAAAAAAAaaaaAAA.AAAA..",
  ".......AAAAaaaaAAAAAAAaaaaAAA..aA...",
  ".......AAAAaaaaAAAAAAAaaaaAAA.AAAA..",
  ".......AAA.aaaa.......aaaaAAA.AAA...",
  ".......AAA.aaaa.......aaaaAAAAAAA...",
  ".......AAA.aaaa.......aaaaAAAAAAA...",
  ".......AAA.aaaa.......aaaaAAAAAA....",
  ".......AAA.aaaa.......aaaaAAA.......",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const frames = walk ? [STAND, STEP] : [STAND];
  const fps = anim === "run" ? 4 : p.fps ?? 8;
  const motion = walk ? (anim === "run" ? "bob" : "none") : anim;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={frames} fps={fps} anim={motion}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
