import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// OMG Sticker (preset of flat-vector/text-sticker): pink OMG cloud sticker for shocking news and big reactions.
const LOOK = {"text": "OMG", "shape": "cloud", "fill": "#F27BA6", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
