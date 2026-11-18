import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Hot Face (preset of flat-vector/reaction-face): overheated red face with heat waves and sweat.
const LOOK = {"eyes": "half", "mouth": "tongue", "sweat": true, "extra": "heat", "color": "#F2714A", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
