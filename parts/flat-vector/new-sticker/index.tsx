import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// New Sticker (preset of flat-vector/text-sticker): red NEW badge sticker to flag new features, products or episodes.
const LOOK = {"text": "NEW", "shape": "badge", "fill": "#E8503F", "anim": "pulse", "tilt": -6};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
