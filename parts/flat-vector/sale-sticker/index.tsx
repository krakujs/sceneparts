import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// Sale Sticker (preset of flat-vector/text-sticker): red SALE price-tag sticker for deals, discounts and shops.
const LOOK = {"text": "SALE", "shape": "tag", "fill": "#E8503F", "anim": "wobble"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
