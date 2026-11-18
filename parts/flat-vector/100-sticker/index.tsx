import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// 100 Sticker (preset of flat-vector/text-sticker): red 100 circle sticker for perfect scores and full agreement.
const LOOK = {"text": "100", "shape": "circle", "fill": "#E8503F", "anim": "pulse"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
