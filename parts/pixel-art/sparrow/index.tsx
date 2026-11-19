import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Sparrow: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #8a6a4a, A = #4f3b29. Other chars: k w g d r o y e f c b n p m u x = palette. Extra colours: s = #d9c6a5.
const COLS = { a: "#8a6a4a", A: "#4f3b29", s: "#d9c6a5" };
const STAND = [
  "............",
  "........aa..",
  ".......aaaa.",
  "...aaaAaakad",
  "..AAAAAaaaa.",
  ".aAAAAAsaa..",
  "AAAAAAAsss..",
  "AAAAaasAss..",
  "AAA.........",
  ".....d.d....",
  ".....d.d....",
];
const STEP = [
  "............",
  "........aa..",
  ".......aaaa.",
  "...aaaAaakad",
  "..AAAAAaaaa.",
  ".aAAAAAsaa..",
  "AAAAAAAsss..",
  "AAAAaasAss..",
  "AAA.........",
  "....d.......",
  "....d..d....",
];
const FLY_UP = [
  "...AA.......",
  ".AAAAAA.aa..",
  ".AAAAAAaaaa.",
  "...aaaAaakad",
  "..AAAAAaaaa.",
  ".aAAAAAsaa..",
  "AAAAAAAsss..",
  "AAAAaasAss..",
  "AAA.........",
  "............",
  "............",
];
const FLY_DOWN = [
  "............",
  "........aa..",
  ".......aaaa.",
  "...aaaAaakad",
  "..AAAAAaaaa.",
  ".aAAAAAsaa..",
  "AAAAAAAsss..",
  "AAAAAAsAss..",
  "AAAAAAA.....",
  "..AAAA......",
  "............",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
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
