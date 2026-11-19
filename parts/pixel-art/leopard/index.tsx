import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Leopard: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = gold fur, A = dark ear backs, paws and shade, z = black rosette spots. k = eye and nose. Others = palette.
const COLS = { a: "#e3a84f", A: "#6e4a22", z: "#1b1b2e" };
const STAND = [
  "................A...A...",
  "................aAaaaA..",
  "................aaakaaa.",
  "z...............aaaaaak.",
  "a...............aaaaaa..",
  "a...............aaaaa...",
  "aaaaaazaaaaaazaaaaaa....",
  "aaaaazazaaaazazaaaaa....",
  "aaaaaazaazaaazaaazaa....",
  "aaaaaaaazazaaaaazaz.....",
  "..aaaaaaaaaaaaaaa.......",
  "...aa.........aa........",
  "...aA.........aA........",
  "...Aa.........Aa........",
  "...AA.........AA........",
  "..AAA.........AAA.......",
];
const STEP = [
  "................A...A...",
  "................aAaaaA..",
  "................aaakaaa.",
  "z...............aaaaaak.",
  "a...............aaaaaa..",
  "a...............aaaaa...",
  "aaaaaazaaaaaazaaaaaa....",
  "aaaaazazaaaazazaaaaa....",
  "aaaaaazaazaaazaaazaa....",
  "aaaaaaaazazaaaaazaz.....",
  "..aaaaaaaaaaaaaaa.......",
  "..aa.............aa.....",
  "..aA.............aA.....",
  ".Aa..............Aa.....",
  ".AA..............AA.....",
  ".AAA.............AAA....",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.spots ? { z: p.spots } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
