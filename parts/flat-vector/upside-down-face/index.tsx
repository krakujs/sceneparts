import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Upside Down Face (preset of flat-vector/reaction-face): silly upside-down smiling face.
const LOOK = {"eyes": "dot", "mouth": "smile", "rotate": 180, "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
