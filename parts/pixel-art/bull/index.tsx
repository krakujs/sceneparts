import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Bull: a dark brown, muscular bull with a heavy neck, a hump of shoulder, big curved horns and an optional gold nose ring. Side view facing right.
// Role chars: a = coat (dark brown), A = shade, z = nose ring (gold). Extra: h = horns, s = muzzle. k = eye.
const COLS = { a: "#5b3a24", A: "#3a2316", z: "#c9a14a", h: "#efe3c2", s: "#8a6a50" };
const STAND = [
  "...........................hh.",
  "..........................hh..",
  ".......h.............hhhh.....",
  "......hh.............hk.......",
  ".....hhaaaaaaaaaaaaaaaaaaa....",
  "....hAaaaaaaaaaaaaaaaaaaaaz...",
  "....hAaaaaaaaaaaaaaaaaaaaasz..",
  "......aaaaaaaaaaaaaaaaaaaass..",
  ".....aaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..aAaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aAaaaaaaaaaaaaaaaaaaaaaa....",
  "...aaaaaaaaaaaaaaaaaaaaaa.....",
  "...aa.........aa.......aa.....",
  "...aa.........aa.......aa.....",
  "...aa.........aa.......aa.....",
  "...AA.........AA.......AA.....",
  "...AA.........AA.......AA.....",
];
const STEP = [
  "...........................hh.",
  "..........................hh..",
  ".......h.............hhhh.....",
  "......hh.............hk.......",
  ".....hhaaaaaaaaaaaaaaaaaaa....",
  "....hAaaaaaaaaaaaaaaaaaaaaz...",
  "....hAaaaaaaaaaaaaaaaaaaaasz..",
  "......aaaaaaaaaaaaaaaaaaaass..",
  ".....aaaaaaaaaaaaaaaaaaaaaaa..",
  "....aaaaaaaaaaaaaaaaaaaaaaaa..",
  "...aaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaa..",
  "..aAaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aAaaaaaaaaaaaaaaaaaaaaaa....",
  "...aaaaaaaaaaaaaaaaaaaaaa.....",
  "..aa..........aa.......aa.....",
  "..aa..........aa.......aa.....",
  "..aa..........aa.......aa.....",
  "..AA..........AA.......AA.....",
  "..AA..........AA.......AA.....",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
