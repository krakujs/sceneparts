import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Flamingo: pixel-art/sprite preset. Pink bird on one leg, S-curved neck, bent black-tipped beak. Side view facing right.
// Role chars: a = feathers, A = feather shade, z = accent (beak / wing tips). k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#ef8fb4", A: "#c85f8a", z: "#24202a" };
const NECK_BODY = [
  "...........aaa.....",
  "..........aakaa....",
  "..........aaaazz...",
  ".........aaaaaz....",
  "........aaaaa......",
  ".......aaaa........",
  "......aaaa.........",
  ".....aaaa..........",
  ".....aaa...........",
  "....aaaa...........",
  "...aaaaaaaaaa......",
  "..aaaaaaaaaaaa.....",
  "..aaaaaaaaaaaaA....",
  "...AAAAAAAAAAA.....",
  "....AAAAAAAA.......",
];
const LEG = ["........a........", "........a........", "........a........", "........a........", "........a........", "........a........", "........a........", "........a........"];
const FOOT_A = ["......aaa.........", ];
const FOOT_B = ["........aaa.......", ];
const WING_UP = NECK_BODY.map((r, i) => (i === 9 ? "zzzaaaaaaaaaa......" : i === 8 ? "zzzz.............." : r));
const WING_DOWN = NECK_BODY.map((r, i) => (i === 12 ? "..zzzaaaaaaaaaaA..." : r));
const LEG_A = [...NECK_BODY, ...LEG, "......aaa........"];
const LEG_B = [...NECK_BODY, ...LEG, "........aaa......"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={fly ? [WING_UP.concat(LEG_A.slice(NECK_BODY.length)), WING_DOWN.concat(LEG_A.slice(NECK_BODY.length))] : walk ? [LEG_A, LEG_B] : [LEG_A]}
      fps={anim === "run" ? 4 : p.fps ?? 8} anim={walk ? (anim === "run" ? "bob" : "none") : fly ? "bob" : anim}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
