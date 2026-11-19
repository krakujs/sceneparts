import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Cow: a black-and-white dairy cow with a white belly and patches, small horns, a pink udder and a switch tail. Side view facing right.
// Role chars: a = black coat, A = shade, z = pale muzzle. Extra: w = white patches, h = horns, m = udder. k = eye.
const COLS = { a: "#1d1d22", A: "#3a3a44", z: "#e8b7a6", h: "#e6d9b8" };
const STAND = [
  "........................h......",
  "........................ahh....",
  "......................aaaakaa..",
  "....................aaaaaaaaaz.",
  ".....................aaaaaaaaa.",
  "...................aaaaaaaaaaaa",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aaaawwwwaaaaaawwwwaaaaaaaa...",
  ".aaaawwwwwwaaaaawwwwwaaaaaaa...",
  ".awwwwwwwwwwaaaawwwwwwwaaaaa...",
  "aaaaawwwwwwwwwaaawwwwwwwwwaa...",
  "aAaaaawwwwwwwwwwwwwwwwwwaaaa...",
  "aAaaaaaaaaaaaaaawwwwwwwwwaaa...",
  ".aaaaaaaaaaaaaaaaaaaaaaaaa.....",
  "..aaaaaaaaaaaaaaaaaaaaaamm.....",
  "..aaaaaaaaaaaaaaaaaaaaaaa......",
  "...aa...........aa....aa.......",
  "...aa...........aa....aa.......",
  "...aa...........aa....aa.......",
  "...AA...........AA....AA.......",
];
const STEP = [
  "........................h......",
  "........................ahh....",
  "......................aaaakaa..",
  "....................aaaaaaaaaz.",
  ".....................aaaaaaaaa.",
  "...................aaaaaaaaaaaa",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaa...",
  "..aaaawwwwaaaaaawwwwaaaaaaaa...",
  ".aaaawwwwwwaaaaawwwwwaaaaaaa...",
  ".awwwwwwwwwwaaaawwwwwwwaaaaa...",
  "aaaaawwwwwwwwwaaawwwwwwwwwaa...",
  "aAaaaawwwwwwwwwwwwwwwwwwaaaa...",
  "aAaaaaaaaaaaaaaawwwwwwwwwaaa...",
  ".aaaaaaaaaaaaaaaaaaaaaaaaa.....",
  "..aaaaaaaaaaaaaaaaaaaaaamm.....",
  "..aaaaaaaaaaaaaaaaaaaaaaa......",
  "..aa............aa....aa.......",
  "..aa............aa....aa.......",
  "..aa............aa....aa.......",
  "..AA............AA....AA.......",
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
