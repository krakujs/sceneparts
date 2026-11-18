import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// Wow Sticker (preset of flat-vector/text-sticker): WOW burst sticker for amazing facts and surprises.
const LOOK = {"text": "WOW", "shape": "burst", "fill": "#FFC83D", "anim": "pulse"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
