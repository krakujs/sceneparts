import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Confused Face (preset of flat-vector/reaction-face): puzzled face with uneven brows and a wavy mouth.
const LOOK = {"eyes": "open", "look": "left", "mouth": "wavy", "brows": "one", "extra": "question", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
