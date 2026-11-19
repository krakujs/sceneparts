import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Crying Face (preset of flat-vector/reaction-face): sobbing face with streams of tears.
const LOOK = {"eyes": "closed", "mouth": "sad-open", "brows": "worried", "tears": "streams", "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
