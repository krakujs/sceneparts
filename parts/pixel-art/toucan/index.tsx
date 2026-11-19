import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Toucan (bird): pixel-art/sprite preset, side view facing right, perched on y. Walk cels step the feet, fly cels flap the wing. Role chars: a = black plumage, A = red under-tail. Palette as usual.
const COLS = { a: "#2e3142", A: "#d2403f", z: "#2e3142" };
const STAND = [
  ".........aaaa............",
  "........aaaaaa...........",
  ".......aacckaaoyyyyyyy...",
  ".......aaccccaoyyyyyyyyy.",
  ".......aawwwwaoyyyyyyyyyy",
  ".......awwwwwwrooooooooor",
  "......aawwwwwww..........",
  ".....aaawwwwwwa..........",
  "....aaaaayyywaa..........",
  "...aaaaaaaaaaaa..........",
  "..aaaaaaaaaaaa...........",
  "..aaaaaaaaaaa............",
  ".aaaaraaaaaa.............",
  ".aaa..rrraa..............",
  "aaa......d.d.............",
  "aa.......d.d.............",
];
const STEP = [
  ".........aaaa............",
  "........aaaaaa...........",
  ".......aacckaaoyyyyyyy...",
  ".......aaccccaoyyyyyyyyy.",
  ".......aawwwwaoyyyyyyyyyy",
  ".......awwwwwwrooooooooor",
  "......aawwwwwww..........",
  ".....aaawwwwwwa..........",
  "....aaaaayyywaa..........",
  "...aaaaaaaaaaaa..........",
  "..aaaaaaaaaaaa...........",
  "..aaaaaaaaaaa............",
  ".aaaaraaaaaa.............",
  ".aaa..rrraa..............",
  "aaa......d.d.............",
  ".......d...d.............",
];
const FLYUP = [
  ".........aaaa............",
  "........aaaaaa...........",
  ".......aacckaaoyyyyyyy...",
  ".......aaccccaoyyyyyyyyy.",
  ".......aawwwwaoyyyyyyyyyy",
  ".......awwwwwwrooooooooor",
  "...aaaaawwwwwww..........",
  ".aaa.aaawwwwwwa..........",
  "aaa.aaaaayyywaa..........",
  "...aaaaaaaaaaaa..........",
  "..aaaaaaaaaaaa...........",
  "..aaaaaaaaaaa............",
  ".aaaaraaaaaa.............",
  ".aaa..rrraa..............",
  "aaa......d.d.............",
  "aa.......d.d.............",
];
const FLYDN = [
  ".........aaaa............",
  "........aaaaaa...........",
  ".......aacckaaoyyyyyyy...",
  ".......aaccccaoyyyyyyyyy.",
  ".......aawwwwaoyyyyyyyyyy",
  ".......awwwwwwrooooooooor",
  "......aawwwwwww..........",
  ".....aaawwwwwwa..........",
  "....aaaaayyywaa..........",
  "...aaaaaaaaaaaa..........",
  "..aaaaaaaaaaaa...........",
  "..aaaaaaaaaaa............",
  ".aaaaaaaaaaa.............",
  ".aaaaaaaraa..............",
  "aaa..aaa.d.d.............",
  "aa.......d.d.............",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "none";
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
