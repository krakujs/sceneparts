import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Shy Face (preset of flat-vector/reaction-face): shy face with big shiny eyes, blush and a tiny smile.
const LOOK = {"eyes": "teary", "look": "down", "mouth": "small", "brows": "worried", "blush": true, "anim": "bob"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
