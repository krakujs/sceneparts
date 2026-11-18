import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Sick Face (preset of flat-vector/reaction-face): green, unwell face with a thermometer in its mouth.
const LOOK = {"eyes": "half", "mouth": "flat", "brows": "worried", "accessory": "thermometer", "color": "#A8D85A", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
