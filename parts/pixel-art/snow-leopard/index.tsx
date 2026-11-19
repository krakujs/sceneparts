import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Snow leopard: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = pale grey-white fur, A = shade and ears, z = dark grey rosettes, k = eye and nose. k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#e6e9ee", A: "#aab2bd", z: "#5a6170" };
const STAND = [
  "........................",
  "..................A..A..",
  ".................aAaaA..",
  "za...............aaaaa..",
  "za..............aaaakaa.",
  "za.zz..zz..zz...aaaaaak.",
  "aa.za.azaaazaaazzaaaaa..",
  "aa..aaaaaaaaaaazaaa.....",
  "aa..aaaaaaaaaaaaaaa.....",
  "aaaaazzaazzaazzaaa......",
  "aaaaazaAAzaAAzaAA.......",
  "aa......AAAAAA..........",
  ".....a.a.......a.a......",
  ".....a.a.......a.a......",
  ".....AAAA......AAAA.....",
  "........................",
];
const STEP = [
  "........................",
  "..................A..A..",
  ".................aAaaA..",
  "za...............aaaaa..",
  "za..............aaaakaa.",
  "za.zz..zz..zz...aaaaaak.",
  "aa.za.azaaazaaazzaaaaa..",
  "aa..aaaaaaaaaaazaaa.....",
  "aa..aaaaaaaaaaaaaaa.....",
  "aaaaazzaazzaazzaaa......",
  "aaaaazaAAzaAAzaAA.......",
  "aa......AAAAAA..........",
  ".....aaa.......aaa......",
  ".....aa........aa.......",
  ".....AAA.......AAA......",
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
