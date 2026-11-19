import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Macaw: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #d2403f, A = #a02e2e, z = #2f5fb8. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#d2403f", A: "#a02e2e", z: "#2f5fb8" };
const STAND = [
  "........................",
  "........................",
  ".............aaaa.......",
  "............aaawaadddd..",
  "......aaaaaaaawwkadddd..",
  ".....zzzzzzaawwwww.ddd..",
  "....zzzzzzzzaawwwa..dd..",
  "...zzzzAAzzzzaawa.......",
  "...zzAAAAAAzzaa.........",
  "...azzzAAzzzaaa.........",
  "...aazzzzzzyaaa.........",
  "...zaayyyyyyyy..........",
  "...zzayyyyyyyy..........",
  "...zz.ayyyyyy...........",
  "..zz.....d..d...........",
  ".zz......d..d...........",
  "zz.......d..d...........",
  "z.......................",
  "........................",
  "........................",
];
const STEP = [
  "........................",
  "........................",
  ".............aaaa.......",
  "............aaawaadddd..",
  "......aaaaaaaawwkadddd..",
  ".....zzzzzzaawwwww.ddd..",
  "....zzzzzzzzaawwwa..dd..",
  "...zzzzAAzzzzaawa.......",
  "...zzAAAAAAzzaa.........",
  "...azzzAAzzzaaa.........",
  "...aazzzzzzyaaa.........",
  "...zaayyyyyyyy..........",
  "...zzayyyyyyyy..........",
  "...zz.ayyyyyy...........",
  "..zz....d...............",
  ".zz.....d...............",
  "zz......d...d...........",
  "z.......................",
  "........................",
  "........................",
];
const FLY_UP = [
  ".........zz.............",
  ".........zzz............",
  "........zzzzzaaaa.......",
  ".......zzzzzaaawaadddd..",
  "......azzzzaaawwkadddd..",
  ".....zzzzzzaawwwww.ddd..",
  "....zzzzzzzzaawwwa..dd..",
  "...zzzzAAzzzzaawa.......",
  "...zzAAAAAAzzaa.........",
  "...azzzAAzzzaaa.........",
  "...aazzzzzzyaaa.........",
  "...zaayyyyyyyy..........",
  "...zzayyyyyyyy..........",
  "...zz.ayyyyyy...........",
  "..zz....................",
  ".zz.....................",
  "zz......................",
  "z.......................",
  "........................",
  "........................",
];
const FLY_DOWN = [
  "........................",
  "........................",
  ".............aaaa.......",
  "............aaawaadddd..",
  "......aaaaaaaawwkadddd..",
  ".....zzzzzzaawwwww.ddd..",
  "....zzzzzzzzaawwwa..dd..",
  "...zzzzAAzzzzaawa.......",
  "...zzAAAAAAzzaa.........",
  "...azzzAAzzzaaa.........",
  "...aazzzzzzyaaa.........",
  "...zazzyyyyyyy..........",
  "...zzazzzzyyyy..........",
  "...zz.azzzzyy...........",
  "..zz...zzzz.............",
  ".zz.....zz..............",
  "zz......................",
  "z.......................",
  "........................",
  "........................",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const walk = anim === "walk" || anim === "run";
  const fly = anim === "fly";
  const frames = fly ? [FLY_UP, FLY_DOWN] : walk ? [STAND, STEP] : [STAND];
  const fps = anim === "run" ? 4 : p.fps ?? (fly ? 6 : 8);
  const motion = walk ? (anim === "run" ? "bob" : "none") : fly ? "none" : anim;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={frames} fps={fps} anim={motion}
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
