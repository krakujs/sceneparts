import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Hawk: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #7a4b2a, A = #4f2f1a, z = #f1d7b5. Other chars: k w g d r o y e f c b n p m u x = palette. Extra colours: t = #a0522d.
const COLS = { a: "#7a4b2a", A: "#4f2f1a", z: "#f1d7b5", t: "#a0522d" };
const STAND = [
  "..................",
  "............aa....",
  "...........aaaa...",
  "..........aaaaydd.",
  "....AAAAaaaaaaadd.",
  "..AAAAAAAAaaaaaad.",
  "..AAAAAAAAaaaaa...",
  "..AAAAAAAAzza.....",
  "..AAAAAAAAzzza....",
  "...aAAAAzzzzz.....",
  ".ttaaazzzzAzz.....",
  ".tttaaaAzzzz......",
  "ttt...aayAy.......",
  "ttt.....y.y.......",
  "ttt.....y.y.......",
  "..................",
];
const STEP = [
  "..................",
  "............aa....",
  "...........aaaa...",
  "..........aaaaydd.",
  "....AAAAaaaaaaadd.",
  "..AAAAAAAAaaaaaad.",
  "..AAAAAAAAaaaaa...",
  "..AAAAAAAAzza.....",
  "..AAAAAAAAzzza....",
  "...aAAAAzzzzz.....",
  ".ttaaazzzzAzz.....",
  ".tttaaaAzzzz......",
  "ttt...ayaA........",
  "ttt....y..........",
  "ttt....y..y.......",
  "..................",
];
const FLY_UP = [
  ".......AA.........",
  ".......AAA..aa....",
  "......AAAA.aaaa...",
  ".....AAAA.aaaaydd.",
  "....AAAAaaaaaaadd.",
  "..AAAAAAAAaaaaaad.",
  "..AAAAAAAAaaaaa...",
  "..AAAAAAAAzza.....",
  "..AAAAAAAAzzza....",
  "...aAAAAzzzzz.....",
  ".ttaaazzzzAzz.....",
  ".tttaaaAzzzz......",
  "ttt...aaaA........",
  "ttt...............",
  "ttt...............",
  "..................",
];
const FLY_DOWN = [
  "..................",
  "............aa....",
  "...........aaaa...",
  "..........aaaaydd.",
  "....AAAAaaaaaaadd.",
  "..AAAAAAAAaaaaaad.",
  "..AAAAAAAAaaaaa...",
  "..AAAAAAAAzza.....",
  "..AAAAAAAAzzza....",
  "...aAAAAzzzzz.....",
  ".ttaaAAAAzAzz.....",
  ".tttaAAAAAzz......",
  "ttt...AAAAA.......",
  "ttt....AAA........",
  "ttt....AA.........",
  "..................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  const frames = fly ? [FLY_UP, FLY_DOWN] : walk ? [STAND, STEP] : [STAND];
  const fps = anim === "run" ? 4 : p.fps ?? (fly ? 6 : 8);
  const motion = walk ? (anim === "run" ? "bob" : "none") : fly ? "none" : anim;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={frames} fps={fps} anim={motion}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
