import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Screaming Face (preset of flat-vector/reaction-face): screaming face with a tall open mouth, shaking with fear.
const LOOK = {"eyes": "wide", "mouth": "scream", "brows": "worried", "color": "#E9DCA0", "anim": "shake"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
