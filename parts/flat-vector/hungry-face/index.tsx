import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Hungry Face (preset of flat-vector/reaction-face): hungry face with a napkin tucked in, licking its lips.
const LOOK = {"eyes": "open", "look": "up", "mouth": "tongue", "accessory": "napkin", "anim": "bounce"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
