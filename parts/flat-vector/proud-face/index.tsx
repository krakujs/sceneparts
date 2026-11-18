import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Proud Face (preset of flat-vector/reaction-face): proud face beaming with sparkles around it.
const LOOK = {"eyes": "happy", "mouth": "smile", "brows": "up", "blush": true, "extra": "sparkles", "anim": "nod"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
