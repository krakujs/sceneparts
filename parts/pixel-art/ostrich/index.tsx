import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Ostrich: a pixel-art/sprite preset. Pixel-art ostrich with a black body, white plumes, a long bare pink neck and long legs; for savanna and farm scenes.
// Role chars: a = main colour, A = shade, z = accent. a = black body, A = shade, z = white plumes. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#1b1b2e", A: "#3a3a52", z: "#f5f1e8" };
const STAND = ["....................", "....................", "....................", "....................", ".............mm.....", "............mmkm....", "............mmmmdd..", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".zzzzaaaaaaa.mm.....", ".zzzzaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaAAAAAAaa......", "..aaaAAAAAAAAa......", "...aaAAAAAAAA.......", "....aaAAAAAA........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......mmm..mmm......"];
const STEP = ["....................", "....................", "....................", "....................", ".............mm.....", "............mmkm....", "............mmmmdd..", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".zzzzaaaaaaa.mm.....", ".zzzzaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaAAAAAAaa......", "..aaaAAAAAAAAa......", "...aaAAAAAAAA.......", "....aaAAAAAA........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", ".....mmm....mmm....."];
const FLY_UP = ["....................", "....................", "....................", "....................", ".............mm.....", "............mmkm....", "............mmmmdd..", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".zzzzaaaaaaa.mm.....", ".zzzzaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaAAAAAAaa......", "..aaaAAAAAAAAa......", "...aaAAAAAAAA.......", "....aaAAAAAA........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......mmm..mmm......"];
const FLY_DOWN = ["....................", "....................", "....................", "....................", ".............mm.....", "............mmkm....", "............mmmmdd..", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".............mm.....", ".zzzzaaaaaaa.mm.....", ".zzzzaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaaaaaaaamm.....", "..aaaaAAAAAAaa......", "..aaaAAAAAAAAa......", "...aaAAAAAAAA.......", "....aaAAAAAA........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", "......m....m........", ".....mmm....mmm....."];

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
