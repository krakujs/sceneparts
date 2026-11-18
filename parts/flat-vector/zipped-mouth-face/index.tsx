import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Zipped Mouth Face (preset of flat-vector/reaction-face): face with a zipper across its mouth: keeping a secret.
const LOOK = {"eyes": "dot", "mouth": "zip", "brows": "flat", "anim": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
