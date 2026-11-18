import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Shh Face (preset of flat-vector/reaction-face): face with a finger over its lips asking for quiet.
const LOOK = {"eyes": "dot", "look": "right", "mouth": "none", "brows": "up", "accessory": "finger", "anim": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
