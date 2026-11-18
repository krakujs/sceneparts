import React from "react";
import type { PartProps } from "@sceneparts/core";
import { ReactionFace } from "../reaction-face/index";

// Sleeping Face (preset of flat-vector/reaction-face): fast-asleep face with closed eyes, a little o mouth and floating Zs.
const LOOK = {"eyes": "closed", "mouth": "o", "extra": "zzz", "anim": "bob", "blink": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <ReactionFace {...q} />;
}
