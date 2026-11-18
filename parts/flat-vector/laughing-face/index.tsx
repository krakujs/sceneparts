import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Laughing Face (preset of flat-vector/reaction-face): face laughing out loud with squeezed eyes and a big open mouth.
const LOOK = {"eyes": "squint", "mouth": "laugh", "anim": "shake"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
