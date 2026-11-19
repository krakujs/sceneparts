import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Furious Face (preset of flat-vector/reaction-face): red-hot furious face with gritted teeth and steam puffs.
const LOOK = {"eyes": "dot", "mouth": "grimace", "brows": "angry", "extra": "steam", "color": "#E8503F", "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
