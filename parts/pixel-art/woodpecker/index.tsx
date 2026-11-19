import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Woodpecker: a pixel-art/sprite preset. Clinging upright to a short brown tree trunk piece; walk = peck cels (head forward and back).
// Role chars: a = main colour, A = shade, z = accent. a = black head and back, A = tail shade, z = red cap. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#1b1b2e", A: "#3a3a52", z: "#d2403f", x: "#c9874f", u: "#7a4a2b", w: "#f5f1e8", d: "#5a6170", r: "#d2403f", k: "#1b1b2e" };
const STAND = ["xxxx..........", "xxxx..rrrr....", "uuxx..aaa.....", "xxxx.aaaak....", "xxxx..aawwddd.", "xxxx...a......", "uuxx..aaa.....", "xxxx..aaa.....", "xxxx.awwwa....", "xxxx.aaaaa....", "uuxx..www.....", "xxxxA.aaa.....", "xxxxA..a......", "xxxxA.d..d....", "uuxx..d..d....", "xxxx.........."];
const STEP = ["xxxx..........", "xxxx...rrrr...", "uuxx...aaa....", "xxxx..aaaak...", "xxxx...aawwddd", "xxxx...aa.....", "uuxx..aaa.....", "xxxx..aaa.....", "xxxx.awwwa....", "xxxx.aaaaa....", "uuxx..www.....", "xxxxA.aaa.....", "xxxxA..a......", "xxxxA.d..d....", "uuxx..d..d....", "xxxx.........."];
const FLY_UP = ["xxxx..........", "xxxx..rrrr....", "uuxx..aaa.....", "xxxx.aaaak....", "xxxx..aawwddd.", "xxxx...a......", "uuxx..aaa.....", "xxxx..aaa.....", "xxxx.awwwa....", "xxxx.aaaaa....", "uuxx..www.....", "xxxxA.aaa.....", "xxxxA..a......", "xxxxA.d..d....", "uuxx..d..d....", "xxxx.........."];
const FLY_DOWN = ["xxxx..........", "xxxx...rrrr...", "uuxx...aaa....", "xxxx..aaaak...", "xxxx...aawwddd", "xxxx...aa.....", "uuxx..aaa.....", "xxxx..aaa.....", "xxxx.awwwa....", "xxxx.aaaaa....", "uuxx..www.....", "xxxxA.aaa.....", "xxxxA..a......", "xxxxA.d..d....", "uuxx..d..d....", "xxxx.........."];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const anim = p.anim ?? "walk";
  const pal = { ...COLS, ...(p.coat ? { a: p.coat } : {}), ...(p.coat2 ? { A: p.coat2 } : {}), ...(p.accent ? { z: p.accent } : {}), ...(p.pal ?? {}) };
  const frames = anim === "fly" ? [FLY_UP, FLY_DOWN] : (anim === "walk" || anim === "run") ? [STAND, STEP] : [STAND];
  const fps = p.fps ?? 8;
  const motion = (anim === "walk" || anim === "run" || anim === "fly") ? "none" : anim;
  return (
    <Sprite
      x={(p.x ?? 540) + (p.vx ?? 0) * p.f} y={p.y ?? 1600} s={p.s ?? 1} f={p.f} flip={!!p.flip}
      frames={frames} fps={fps} anim={motion} 
      pal={pal} px={p.px ?? 24} outline={p.outline ?? true}
    />
  );
}
