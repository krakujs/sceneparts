import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// Zap (preset of flat-vector/text-sticker): comic ZAP! burst for electric shocks, magic and quick changes.
const LOOK = {"text": "ZAP!", "shape": "burst", "fill": "#7B5CD6", "anim": "pulse"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
