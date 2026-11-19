import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Chipmunk: pixel-art/sprite preset, side view facing right, standing on y. Two walk cels. Role chars: a = coat, A = dark stripes, z = cream stripes. Palette as usual.
const COLS = { a: "#b8743a", A: "#4a2c18", z: "#f5e6c8" };
const STAND = [
  "..AA..............",
  ".AaaA.............",
  "AaaaA.............",
  "AaaA........A.....",
  "AaaA.......aaaa...",
  ".AaA......aaakaa..",
  ".Aaa.....aaaaaaak.",
  "..aa....aaawwaa...",
  "..aaa..aaawwwa....",
  "...aaaAzAzAaa.....",
  "...aaazAzAzaaw....",
  "....aaaaaaaaww....",
  ".....aA..aAA......",
];
const STEP = [
  "..AA..............",
  ".AaaA.............",
  "AaaaA.............",
  "AaaA........A.....",
  "AaaA.......aaaa...",
  ".AaA......aaakaa..",
  ".Aaa.....aaaaaaak.",
  "..aa....aaawwaa...",
  "..aaa..aaawwwa....",
  "...aaaAzAzAaa.....",
  "...aaazAzAzaaw....",
  "....aaaaaaaaww....",
  "....aA....aA.aA...",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = false;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]}
      fps={fly ? p.fps ?? 6 : anim === "run" ? 4 : p.fps ?? 8}
      anim={walk || fly ? (anim === "run" ? "bob" : "none") : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
