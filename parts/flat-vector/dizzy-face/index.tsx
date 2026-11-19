import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Dizzy Face (preset of flat-vector/reaction-face): dizzy face with spinning spiral eyes and stars orbiting.
const LOOK = {"eyes": "spiral", "mouth": "wavy", "extra": "orbit", "anim": "spin"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
