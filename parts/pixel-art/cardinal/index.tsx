import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Cardinal (bird): pixel-art/sprite preset, side view facing right, perched on y. Walk cels step the feet, fly cels flap the wing. Role chars: a = red body, A = darker wing. Palette as usual.
const COLS = { a: "#d2403f", A: "#9c2a2f", z: "#9c2a2f" };
const STAND = [
  "..........a.........",
  ".........aa.........",
  "........aaa.........",
  ".......aaaaa........",
  ".......aaaaaaa......",
  ".......aakkkkoo.....",
  ".......aakwkkooo....",
  "......aaakkkkoo.....",
  ".....aaaaakka.......",
  "....aaaaaaaaa.......",
  "...aAAAAaaaaa.......",
  "..aAAAAAAaaaa.......",
  ".aaAAAAAAaaa........",
  "aaaa.AAAAaa.........",
  "aaa.....aa..........",
  "aa.....d..d.........",
];
const STEP = [
  "..........a.........",
  ".........aa.........",
  "........aaa.........",
  ".......aaaaa........",
  ".......aaaaaaa......",
  ".......aakkkkoo.....",
  ".......aakwkkooo....",
  "......aaakkkkoo.....",
  ".....aaaaakka.......",
  "....aaaaaaaaa.......",
  "...aAAAAaaaaa.......",
  "..aAAAAAAaaaa.......",
  ".aaAAAAAAaaa........",
  "aaaa.AAAAaa.........",
  "aaa.....aa..........",
  "......d....d........",
];
const FLYUP = [
  "..........a.........",
  ".........aa.........",
  "........aaa.........",
  ".......aaaaa........",
  ".......aaaaaaa......",
  ".......aakkkkoo.....",
  "....AAAAakwkkooo....",
  "..AAAAAAakkkkoo.....",
  ".AAAAAaaaakka.......",
  "AAAAaaaaaaaaa.......",
  "...aAAAAaaaaa.......",
  "..aAAAAAAaaaa.......",
  ".aaAAAAAAaaa........",
  "aaaa.AAAAaa.........",
  "aaa.....aa..........",
  "aa.....d..d.........",
];
const FLYDN = [
  "..........a.........",
  ".........aa.........",
  "........aaa.........",
  ".......aaaaa........",
  ".......aaaaaaa......",
  ".......aakkkkoo.....",
  ".......aakwkkooo....",
  "......aaakkkkoo.....",
  ".....aaaaakka.......",
  "....aaaaaaaaa.......",
  "...aAAAAaaaaa.......",
  "..aAAAAAAaaaa.......",
  ".aaAAAAAAaaa........",
  "aaaa.AAAAaa.........",
  "aaa..AAAAA..........",
  "aa....AAAAd.........",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : fly ? [FLYUP, FLYDN] : [STAND]}
      fps={fly ? p.fps ?? 6 : anim === "run" ? 4 : p.fps ?? 8}
      anim={walk || fly ? (anim === "run" ? "bob" : "none") : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
