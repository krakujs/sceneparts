import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Grimace Face (preset of flat-vector/reaction-face): grimacing face showing clenched teeth: yikes.
const LOOK = {"eyes": "open", "mouth": "grimace", "brows": "worried", "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
