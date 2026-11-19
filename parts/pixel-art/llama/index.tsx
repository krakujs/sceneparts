import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Llama: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = cream fleece, A = ears and shade, z = white fluffy tail. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#efe2c2", A: "#b59d72", z: "#fbf6ea" };
const STAND = [
  "..............A....A....",
  "..............AA..AA....",
  "...............AA.A.....",
  "...............aaaaa....",
  "..............aaakaaad..",
  "..............aaaaaaa...",
  "..............aaaaa.....",
  "..............aaa.......",
  "..............aaa.......",
  ".......aaaa...aaa.......",
  "zzz.aaaaaaaaaaaaa.......",
  "zzzaaaaaaaaaaaaaa.......",
  "zzzaaaaaaaaaaaaa........",
  ".aaaaaaaaaaaaaaaa.......",
  "..aaaaaaaaaaaaaa........",
  "..aaaaaaaaaaaaaa........",
  "....AAAAAAAAAA..........",
  "...AAAAAAAAAAAAa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "....aaAA....AAaa........",
  "........................",
  ".....d.d.....d.d........",
];
const STEP = [
  "..............A....A....",
  "..............AA..AA....",
  "...............AA.A.....",
  "...............aaaaa....",
  "..............aaakaaad..",
  "..............aaaaaaa...",
  "..............aaaaa.....",
  "..............aaa.......",
  "..............aaa.......",
  ".......aaaa...aaa.......",
  "zzz.aaaaaaaaaaaaa.......",
  "zzzaaaaaaaaaaaaaa.......",
  "zzzaaaaaaaaaaaaa........",
  ".aaaaaaaaaaaaaaaa.......",
  "..aaaaaaaaaaaaaa........",
  "..aaaaaaaaaaaaaa........",
  "....AAAAAAAAAA..........",
  "...AAAAAAAAAAAAa........",
  "....a..A....A..a........",
  "....a..A....A..a........",
  "....a..A....A..a........",
  "....a..A....A..a........",
  "...aa..AA..AA..aa.......",
  "...aa..AA..AA..aa.......",
  "...a....A..A....a.......",
  "...a....A..A....a.......",
  "...a....A..A....a.......",
  "....d...d...d...d.......",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={walk ? [STAND, STEP] : [STAND]} fps={anim === "run" ? 4 : p.fps ?? 8}
      anim={walk ? (anim === "run" ? "bob" : "none") : anim} pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
