import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Vulture: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the feet.
// Role chars: a = #3a3029, A = #241c18. Other chars: k w g d r o y e f c b n p m u x = palette. Extra colours: g = #a8b0bd, h = #d7a08c.
const COLS = { a: "#3a3029", A: "#241c18", g: "#a8b0bd", h: "#d7a08c" };
const STAND = [
  "....................",
  "....................",
  "..............hhh...",
  ".............hhhhh..",
  ".............hhhkgg.",
  ".............hhhhgg.",
  ".....aaaaaaaa.hhh...",
  "....aAAAAAAagggg....",
  "...AAAAAAAAAgggg....",
  "..AAAAAAAAAAgggg....",
  "..AAAAAAAAAAAAaa....",
  "..AAAAAAAAAAAAaa....",
  "..AAAAAAAAAAAAaa....",
  "...AAAAAAAAAAaa.....",
  "....aAAAAAAaaa......",
  "AAA..aaaaaaaa.......",
  "AAA.......d..d......",
  "AAA.......d..d......",
  "..........d..d......",
  "....................",
];
const STEP = [
  "....................",
  "....................",
  "..............hhh...",
  ".............hhhhh..",
  ".............hhhkgg.",
  ".............hhhhgg.",
  ".....aaaaaaaa.hhh...",
  "....aAAAAAAagggg....",
  "...AAAAAAAAAgggg....",
  "..AAAAAAAAAAgggg....",
  "..AAAAAAAAAAAAaa....",
  "..AAAAAAAAAAAAaa....",
  "..AAAAAAAAAAAAaa....",
  "...AAAAAAAAAAaa.....",
  "....aAAAAAAaaa......",
  "AAA..aaaaaaaa.......",
  "AAA......d..........",
  "AAA......d..........",
  ".........d...d......",
  "....................",
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
