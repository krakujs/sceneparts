import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Very Happy Face (preset of flat-vector/reaction-face): overjoyed face with a big open grin and rosy cheeks.
const LOOK = {"eyes": "happy", "mouth": "grin", "blush": true, "anim": "bounce"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
