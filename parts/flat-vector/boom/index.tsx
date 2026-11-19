import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TextSticker } from "../text-sticker/index";

// Boom (preset of flat-vector/text-sticker): comic BOOM burst for explosions, big reveals and impact moments.
const LOOK = {"text": "BOOM", "shape": "burst", "fill": "#FF8A3D", "anim": "shake"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <TextSticker {...q} />;
}
