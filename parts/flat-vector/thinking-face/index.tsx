import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Thinking Face (preset of flat-vector/reaction-face): pondering face with hand on chin and a question mark.
const LOOK = {"eyes": "dot", "look": "up", "mouth": "flat", "brows": "one", "accessory": "hand-chin", "extra": "question", "anim": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
