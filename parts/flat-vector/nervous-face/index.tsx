import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Nervous Face (preset of flat-vector/reaction-face): nervous face with a wobbly mouth, side glance and sweat.
const LOOK = {"eyes": "side", "mouth": "wavy", "brows": "worried", "sweat": true, "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
