import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Calf: a small young cow with a big round head, no horns, short legs and a thin tail. Side view facing right.
// Role chars: a = coat (brown), A = shade and legs, z = pale muzzle and belly patch. k = eye.
const COLS = { a: "#9c6a40", A: "#5e3d24", z: "#e8c9a8" };
const STAND = [
  "..............aaaa...",
  "............aaaaaaaa.",
  "...........aaaaaakaaa",
  "...........aaaaaaaaz.",
  "...........aazzzzzzz.",
  "..aaaaaaaaaaaaaaaaa..",
  ".aaaaaaaaaaaaaaaaaa..",
  ".aazzaaaaaaaaaaaaa...",
  ".aazzaaaaaaaaaaaaa...",
  "..aaaaaaaaaaaaaaaa...",
  "...AA.......AA.......",
  "...AA.......AA.......",
  "...AA.......AA.......",
  "...AA.......AA.......",
];
const STEP = [
  "..............aaaa...",
  "............aaaaaaaa.",
  "...........aaaaaakaaa",
  "...........aaaaaaaaz.",
  "...........aazzzzzzz.",
  "..aaaaaaaaaaaaaaaaa..",
  ".aaaaaaaaaaaaaaaaaa..",
  ".aazzaaaaaaaaaaaaa...",
  ".aazzaaaaaaaaaaaaa...",
  "..aaaaaaaaaaaaaaaa...",
  "..AA.......AA........",
  "..AA.......AA........",
  "..AA.......AA........",
  "...A.......A.........",
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
