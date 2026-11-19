import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Cold Face (preset of flat-vector/reaction-face): freezing blue face with an icy cap, gritted teeth and snowflakes.
const LOOK = {"eyes": "dot", "mouth": "grimace", "brows": "worried", "accessory": "ice-cap", "extra": "snow", "color": "#7FC4EE", "anim": "tremble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
