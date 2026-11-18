import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Skeptical Face (preset of flat-vector/reaction-face): doubtful face with one raised brow and a sideways mouth.
const LOOK = {"eyes": "dot", "look": "right", "mouth": "smirk", "brows": "one", "anim": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
