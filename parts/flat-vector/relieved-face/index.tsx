import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Relieved Face (preset of flat-vector/reaction-face): relieved face with closed eyes and a soft smile.
const LOOK = {"eyes": "closed", "mouth": "small", "blush": true, "brows": "worried", "anim": "bob"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
