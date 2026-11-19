import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Shocked Face (preset of flat-vector/reaction-face): shocked face with huge eyes and a dropped jaw.
const LOOK = {"eyes": "wide", "mouth": "gasp", "brows": "up", "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
