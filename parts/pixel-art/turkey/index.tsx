import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Sprite } from "../sprite/index";

// Turkey: a pixel-art/sprite preset. Pixel-art turkey with a fanned striped tail, bare blue-grey head and red wattle; for farm and harvest scenes.
// Role chars: a = main colour, A = shade, z = accent. a = brown body, A = tail shade, z = cream tail bands. Other chars: k w g d r o y e f c b n p m u x = palette.
const COLS = { a: "#7a4a2b", A: "#4a2a18", z: "#f5efe2" };
const STAND = ["...AAAA.................", "..AAAAAA................", ".AAAAAAAA...............", "zzzzzzzzzzz.............", "AAAAAAAAAA.......dd.....", "AAAAAAAAAAA.....dddxx...", "zzzzzzzzzzz.....ddddk...", "AAAAAAAAAAA......dd.....", "AAAAAAAAAAA.......r.....", "zzzzzzzzzzz.......r.....", "AAAAAAAAAAaaaaaa........", "AAAAAAAAaaaaaaaaaa......", "zzzzzzzzaaaaaaaaaa......", ".AAAAAAAaaaaaaaaaa......", "..AAAAAAaaaaaaaaaa......", "zzzzzzzzzzaaaaaa........", "........................", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "...........xxxxxx.......", "........................"];
const STEP = ["...AAAA.................", "..AAAAAA................", ".AAAAAAAA...............", "zzzzzzzzzzz.............", "AAAAAAAAAA.......dd.....", "AAAAAAAAAAA.....dddxx...", "zzzzzzzzzzz.....ddddk...", "AAAAAAAAAAA......dd.....", "AAAAAAAAAAA.......r.....", "zzzzzzzzzzz.......r.....", "AAAAAAAAAAaaaaaa........", "AAAAAAAAaaaaaaaaaa......", "zzzzzzzzaaaaaaaaaa......", ".AAAAAAAaaaaaaaaaa......", "..AAAAAAaaaaaaaaaa......", "zzzzzzzzzzaaaaaa........", "........................", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "..........xxx..xxx......", "........................"];
const FLY_UP = ["...AAAA.................", "..AAAAAA................", ".AAAAAAAA...............", "zzzzzzzzzzz.............", "AAAAAAAAAA.......dd.....", "AAAAAAAAAAA.....dddxx...", "zzzzzzzzzzz.....ddddk...", "AAAAAAAAAAA......dd.....", "AAAAAAAAAAA.......r.....", "zzzzzzzzzzz.......r.....", "AAAAAAAAAAaaaaaa........", "AAAAAAAAaaaaaaaaaa......", "zzzzzzzzaaaaaaaaaa......", ".AAAAAAAaaaaaaaaaa......", "..AAAAAAaaaaaaaaaa......", "zzzzzzzzzzaaaaaa........", "........................", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "...........xxxxxx.......", "........................"];
const FLY_DOWN = ["...AAAA.................", "..AAAAAA................", ".AAAAAAAA...............", "zzzzzzzzzzz.............", "AAAAAAAAAA.......dd.....", "AAAAAAAAAAA.....dddxx...", "zzzzzzzzzzz.....ddddk...", "AAAAAAAAAAA......dd.....", "AAAAAAAAAAA.......r.....", "zzzzzzzzzzz.......r.....", "AAAAAAAAAAaaaaaa........", "AAAAAAAAaaaaaaaaaa......", "zzzzzzzzaaaaaaaaaa......", ".AAAAAAAaaaaaaaaaa......", "..AAAAAAaaaaaaaaaa......", "zzzzzzzzzzaaaaaa........", "........................", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "............x..x........", "..........xxx..xxx......", "........................"];

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
