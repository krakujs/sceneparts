import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Eagle: a pixel-art/sprite preset. Side view facing right, standing on y. Birds: feet walk cels and wing up/down fly cels.
// Role chars: a = #4a2f1d, A = #2e1c10, z = #f5f1e8. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#4a2f1d", A: "#2e1c10", z: "#f5f1e8" };
const STAND = [
  "........................",
  "........................",
  "..............zzzz......",
  ".............zzzzzz.....",
  ".............zzzzkzyyy..",
  ".......aaaaaazzzzzzyyy..",
  ".....aaaaaaaazzzzzz..y..",
  "....AAAAAAAAAAzzzz......",
  "...AAAAAAAAAAAAaa.......",
  "..AAAAAAAAAAAAAAa.......",
  "...AAAAAAAAAAAAaa.......",
  "AzzaAAAAAAAAAAaaa.......",
  ".zzzaaaaaaaaaaaa........",
  ".zzz.aaaaaaaaaa.........",
  "zzzz...aaaaaa...........",
  "zzzz......y..y..........",
  "zzz.......y..y..........",
  "zzz.......y..y..........",
  "..........y..y..........",
  "........................",
];
const STEP = [
  "........................",
  "........................",
  "..............zzzz......",
  ".............zzzzzz.....",
  ".............zzzzkzyyy..",
  ".......aaaaaazzzzzzyyy..",
  ".....aaaaaaaazzzzzz..y..",
  "....AAAAAAAAAAzzzz......",
  "...AAAAAAAAAAAAaa.......",
  "..AAAAAAAAAAAAAAa.......",
  "...AAAAAAAAAAAAaa.......",
  "AzzaAAAAAAAAAAaaa.......",
  ".zzzaaaaaaaaaaaa........",
  ".zzz.aaaaaaaaaa.........",
  "zzzz...aaaaaa...........",
  "zzzz.....y..............",
  "zzz......y..............",
  "zzz......y..............",
  ".........y...y..........",
  "........................",
];
const FLY_UP = [
  "........................",
  "........AA..............",
  ".......AAA....zzzz......",
  ".......AAAA..zzzzzz.....",
  "......AAAAAA.zzzzkzyyy..",
  ".....AAAAAAaazzzzzzyyy..",
  ".....AAAAAaaazzzzzz..y..",
  "....AAAAAAAAAAzzzz......",
  "...AAAAAAAAAAAAaa.......",
  "..AAAAAAAAAAAAAAa.......",
  "...AAAAAAAAAAAAaa.......",
  "AzzaAAAAAAAAAAaaa.......",
  ".zzzaaaaaaaaaaaa........",
  ".zzz.aaaaaaaaaa.........",
  "zzzz...aaaaaa...........",
  "zzzz....................",
  "zzz.....................",
  "zzz.....................",
  "........................",
  "........................",
];
const FLY_DOWN = [
  "........................",
  "........................",
  "..............zzzz......",
  ".............zzzzzz.....",
  ".............zzzzkzyyy..",
  ".......aaaaaazzzzzzyyy..",
  ".....aaaaaaaazzzzzz..y..",
  "....AAAAAAAAAAzzzz......",
  "...AAAAAAAAAAAAaa.......",
  "..AAAAAAAAAAAAAAa.......",
  "...AAAAAAAAAAAAaa.......",
  "AzzaAAAAAAAAAAaaa.......",
  ".zzzaAAAAAAaaaaa........",
  ".zzz.aAAAAAaaaa.........",
  "zzzz..AAAAaaa...........",
  "zzzz...AA...............",
  "zzz.....................",
  "zzz.....................",
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
