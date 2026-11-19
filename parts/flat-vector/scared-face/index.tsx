import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Scared Face (preset of flat-vector/reaction-face): frightened face with worried brows, wide eyes and a sweat drop.
const LOOK = {"eyes": "wide", "mouth": "wavy", "brows": "worried", "sweat": true, "color": "#F3D36B", "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
