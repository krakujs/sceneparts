import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Sweating Face (preset of flat-vector/reaction-face): awkward grinning face with a big sweat drop.
const LOOK = {"eyes": "happy", "mouth": "grin", "brows": "worried", "sweat": true, "anim": "bob"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
