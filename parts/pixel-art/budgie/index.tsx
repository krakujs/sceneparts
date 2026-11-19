import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Budgie: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #9bd14b, A = #5f9a2a, z = #f7d154. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#9bd14b", A: "#5f9a2a", z: "#f7d154" };
const STAND = [
  "...........",
  ".....zzzz..",
  ".....zzzko.",
  "..aaAzzzzo.",
  "..AkAzzoz..",
  ".aAAAAkaa..",
  "AAAAkAAa...",
  "AAaaAaaa...",
  "AA..d.d....",
  "....d.d....",
];
const STEP = [
  "...........",
  ".....zzzz..",
  ".....zzzko.",
  "..aaAzzzzo.",
  "..AkAzzoz..",
  ".aAAAAkaa..",
  "AAAAkAAa...",
  "AAaaAaaa...",
  "AA.d.......",
  "...d..d....",
];
const FLY_UP = [
  "...AAA.....",
  "..AAAAAzz..",
  "..AAAAAzko.",
  "..aaAzzzzo.",
  "..AkAzzoz..",
  ".aAAAAkaa..",
  "AAAAkAAa...",
  "AAaaAaaa...",
  "AA.........",
  "...........",
];
const FLY_DOWN = [
  "...........",
  ".....zzzz..",
  ".....zzzko.",
  "..aaAzzzzo.",
  "..AkAzzoz..",
  ".aAAAAkaa..",
  "AAAAkAAa...",
  "AAAAAAAa...",
  "AAAAAAA....",
  "...AAA.....",
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
