import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Emu: a pixel-art/sprite preset. Pixel-art emu with a shaggy grey-brown body, long blue-grey neck and long legs; for outback and farm scenes.
// Role chars: a = main colour, A = shade, z = accent. a = shaggy body, A = shade, z = blue-grey neck. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#6b5a4a", A: "#4a3c30", z: "#7f98b3" };
const STAND = ["................", "................", "................", "................", "...........gg...", "..........gggk..", "..........ggggdd", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", ".AAAAaaaaa.gg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaaaa...", ".AAAAaaaaaaaa...", ".aaaaaaaaaaaa...", "..aaaaaaaaaa....", "...aaaaaaaa.....", "....aaaaaa......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", "....ddd.ddd....."];
const STEP = ["................", "................", "................", "................", "...........gg...", "..........gggk..", "..........ggggdd", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", ".AAAAaaaaa.gg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaaaa...", ".AAAAaaaaaaaa...", ".aaaaaaaaaaaa...", "..aaaaaaaaaa....", "...aaaaaaaa.....", "....aaaaaa......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", ".....ddddd......"];
const FLY_UP = ["................", "................", "................", "................", "...........gg...", "..........gggk..", "..........ggggdd", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", ".AAAAaaaaa.gg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaaaa...", ".AAAAaaaaaaaa...", ".aaaaaaaaaaaa...", "..aaaaaaaaaa....", "...aaaaaaaa.....", "....aaaaaa......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", ".....d...d......", "....ddd.ddd....."];
const FLY_DOWN = ["................", "................", "................", "................", "...........gg...", "..........gggk..", "..........ggggdd", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", "...........gg...", ".AAAAaaaaa.gg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaagg...", "AAAAAAaaaaaaa...", ".AAAAaaaaaaaa...", ".aaaaaaaaaaaa...", "..aaaaaaaaaa....", "...aaaaaaaa.....", "....aaaaaa......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", "......d.d.......", ".....ddddd......"];

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
