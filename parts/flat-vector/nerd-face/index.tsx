import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Nerd Face (preset of flat-vector/reaction-face): nerdy face with round glasses and a toothy grin.
const LOOK = {"eyes": "dot", "mouth": "teeth", "accessory": "nerd", "anim": "nod"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
