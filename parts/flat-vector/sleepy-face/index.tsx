import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Sleepy Face (preset of flat-vector/reaction-face): drowsy face with heavy eyelids and a small yawn.
const LOOK = {"eyes": "half", "mouth": "small", "brows": "flat", "anim": "nod"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
