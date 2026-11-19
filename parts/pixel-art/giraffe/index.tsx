import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Giraffe: a pixel-art/sprite preset. Side view facing right, standing on y. Two walk cels swap the legs.
// Role chars: a = #f2d9a4, A = #a0743f, z = #b8733a. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#f2d9a4", A: "#a0743f", z: "#b8733a" };
const STAND = [
  "...................u..u...",
  "...................A..A...",
  "...................AaaAa..",
  ".................AAaakaa..",
  ".................AAaaaaaaa",
  "...................aaaaaak",
  ".................aaaaaaaaa",
  ".................azzz.....",
  "................aaaaa.....",
  "................azza......",
  "................azza......",
  "...............aazza......",
  "...............aaaaa......",
  "..............zzzzaa......",
  "..............zzzzaa......",
  "..............aaaaaa......",
  "..............aaaaa.......",
  ".......aaaaaaaaaaaa.......",
  "AA..aaaaaaaaaazzaaa.......",
  "AA.zzzzaaaaaaazza.........",
  "AAazzzzaaaaaaazzaa........",
  "AAaaaaaazzzzaaaaaa........",
  "AAaaaaaazzzzaaaaaa........",
  "AAzzaaaazzzzaaaaaa........",
  "AAzzaaaaaaaaaaaaa.........",
  "AAAAaaAAAAAAAaaA..........",
  "..AAaaAAAAAAAaaAA.........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAaa.....AAaa...........",
  "..AAdd.....AAdd...........",
  "....dd.......dd...........",
];
const STEP = [
  "...................u..u...",
  "...................A..A...",
  "...................AaaAa..",
  ".................AAaakaa..",
  ".................AAaaaaaaa",
  "...................aaaaaak",
  ".................aaaaaaaaa",
  ".................azzz.....",
  "................aaaaa.....",
  "................azza......",
  "................azza......",
  "...............aazza......",
  "...............aaaaa......",
  "..............zzzzaa......",
  "..............zzzzaa......",
  "..............aaaaaa......",
  "..............aaaaa.......",
  ".......aaaaaaaaaaaa.......",
  "AA..aaaaaaaaaazzaaa.......",
  "AA.zzzzaaaaaaazza.........",
  "AAazzzzaaaaaaazzaa........",
  "AAaaaaaazzzzaaaaaa........",
  "AAaaaaaazzzzaaaaaa........",
  "AAzzaaaazzzzaaaaaa........",
  "AAzzaaaaaaaaaaaaa.........",
  "AAaaAAAAAAAaaAAA..........",
  "..aaAAAAAAAaaAAAA.........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..aaAA.....aaAA...........",
  "..ddAA.....ddAA...........",
  "..dd.......dd.............",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
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
