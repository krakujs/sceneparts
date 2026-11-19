import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Smiling Face (preset of flat-vector/reaction-face): calm, friendly face with dot eyes and a gentle smile.
const LOOK = {"eyes": "dot", "mouth": "smile", "blush": true, "anim": "bob"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
