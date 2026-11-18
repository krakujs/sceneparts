import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// Pow (preset of flat-vector/text-sticker): comic POW! star for punches, hits and sudden action.
const LOOK = {"text": "POW!", "shape": "star", "fill": "#E8503F", "anim": "shake"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
