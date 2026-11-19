import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Cheetah: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = tawny fur, A = shade and ears, z = solid black spots, k = eye, nose and tear line. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#e8b25a", A: "#b7833a", z: "#1b1b2e" };
const STAND = [
  "z.......................",
  "z..................Aa...",
  "a..................AaA..",
  "az................aaaa..",
  ".a...............aaaaka.",
  ".aa...zaaaaazaaaaaakka.k",
  "..azaaaaazaaaaaaaakaa...",
  "...aaaaaaaaaaaazaaka....",
  ".z..aaaaaaazaaaaaz......",
  "....z.AzAAAAAAAA........",
  "....a.a.......za.a......",
  "....a.a........a.a......",
  "....a.a........a.a......",
  "....a.a........a.a......",
  "....AAAA.......AAAA.....",
  "........................",
];
const STEP = [
  "z.......................",
  "z..................Aa...",
  "a..................AaA..",
  "az................aaaa..",
  ".a...............aaaaka.",
  ".aa...zaaaaazaaaaaakka.k",
  "..azaaaaazaaaaaaaakaa...",
  "...aaaaaaaaaaaazaaka....",
  ".z..aaaaaaazaaaaaz......",
  "....z.AzAAAAAAAA........",
  "....aaa.......zaaa......",
  "....aa.........aa.......",
  "....aa.........aa.......",
  "....aa.........aa.......",
  "....AAA........AAA......",
  "........................",
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
