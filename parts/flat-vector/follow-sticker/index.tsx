import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// Follow Sticker (preset of flat-vector/text-sticker): blue FOLLOW pill sticker for end cards and social calls to action.
const LOOK = {"text": "FOLLOW", "shape": "pill", "fill": "#3D6FE0", "anim": "pulse"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
