import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Smirk Face (preset of flat-vector/reaction-face): sly smirking face with a knowing look.
const LOOK = {"eyes": "half", "look": "right", "mouth": "smirk", "brows": "one", "anim": "nod"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
