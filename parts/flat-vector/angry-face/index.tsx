import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Angry Face (preset of flat-vector/reaction-face): angry face with slanted brows and a tight frown.
const LOOK = {"eyes": "dot", "mouth": "frown", "brows": "angry", "color": "#FFAA3D", "anim": "shake"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
