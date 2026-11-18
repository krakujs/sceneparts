import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Party Face (preset of flat-vector/reaction-face): celebrating face in a party hat with confetti.
const LOOK = {"eyes": "happy", "mouth": "grin", "accessory": "party-hat", "extra": "confetti", "anim": "bounce"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
