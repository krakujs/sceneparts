import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Surprised Face (preset of flat-vector/reaction-face): surprised face with raised brows and a small o mouth.
const LOOK = {"eyes": "open", "mouth": "o", "brows": "up", "anim": "pulse"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
