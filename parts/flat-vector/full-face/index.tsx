import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Full Face (preset of flat-vector/reaction-face): stuffed, satisfied face with puffed cheeks and closed eyes.
const LOOK = {"eyes": "closed", "mouth": "wavy", "blush": true, "brows": "flat", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
