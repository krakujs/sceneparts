import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Blushing Face (preset of flat-vector/reaction-face): embarrassed blushing face with smiling eyes.
const LOOK = {"eyes": "happy", "mouth": "small", "blush": true, "color": "#FFB13D", "anim": "pulse"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
