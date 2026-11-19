import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Stork: pixel-art/sprite preset. White stork, black wing edges, long red beak and legs.
// Role chars: a = white feathers, A = black wing edge, z = accent. k w g d r o y e f c b n p m u x = palette.
const COLS = {"a":"#f5f1e8","A":"#24202a","z":"#d2403f"};
const STAND = [
  "..........aaa.........",
  ".........aakaa........",
  ".........aaaarrrrrr...",
  "........aaaaa.........",
  ".......aaaa...........",
  ".......aaa............",
  "......aaaa............",
  "...aaaaaaaa...........",
  "..aaaaaaaaaaaaa.......",
  ".zzzaaaaaaaaaaaaa.....",
  "zzzzaaaaaaaaaaaaa.....",
  ".zzzzzzaaaaaaaaaa.....",
  "..zzzzzzzzzzzzz.......",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "....rrr...............",
  "......................",
];
const STEP = [
  "..........aaa.........",
  ".........aakaa........",
  ".........aaaarrrrrr...",
  "........aaaaa.........",
  ".......aaaa...........",
  ".......aaa............",
  "......aaaa............",
  "...aaaaaaaa...........",
  "..aaaaaaaaaaaaa.......",
  ".zzzaaaaaaaaaaaaa.....",
  "zzzzaaaaaaaaaaaaa.....",
  ".zzzzzzaaaaaaaaaa.....",
  "..zzzzzzzzzzzzz.......",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "....r.r...............",
  "...rr.................",
  "......................",
];
const FLY_UP = [
  "..........aaa.........",
  ".........aakaa........",
  ".........aaaarrrrrr...",
  "........aaaaa.........",
  ".......aaaa...........",
  ".......aaa............",
  "......aaaa............",
  "...aaaaaaaa...........",
  "zzzzzaaaaaaaaaa.......",
  "zzzzaaaaaaaaaaaaa.....",
  "zzaaaaaaaaaaaaaaa.....",
  ".zzzzzzaaaaaaaaaa.....",
  "..zzzzzzzzzzzzz.......",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "....rrr...............",
  "......................",
];
const FLY_DOWN = [
  "..........aaa.........",
  ".........aakaa........",
  ".........aaaarrrrrr...",
  "........aaaaa.........",
  ".......aaaa...........",
  ".......aaa............",
  "......aaaa............",
  "...aaaaaaaa...........",
  "..aaaaaaaaaaaaa.......",
  ".aaaaaaaaaaaaaaaa.....",
  "zzzaaaaaaaaaaaaaa.....",
  "zzzzzzaaaaaaaaaa......",
  "..zzzzzzzzzzzzz.......",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "......r...............",
  "....rrr...............",
  "......................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const fly = anim === "fly";
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={fly ? [FLY_UP, FLY_DOWN] : walk ? [STAND, STEP] : [STAND]}
      fps={anim === "run" ? 4 : p.fps ?? 8} anim={walk ? (anim === "run" ? "bob" : "none") : fly ? "bob" : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
