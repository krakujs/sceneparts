import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Yawning Face (preset of flat-vector/reaction-face): face in a big wide yawn with closed eyes.
const LOOK = {"eyes": "closed", "mouth": "yawn", "brows": "worried", "anim": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
