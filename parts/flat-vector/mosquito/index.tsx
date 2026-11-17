import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Mosquito (preset of flat-vector/bug): thin grey mosquito with long legs, clear wings and a proboscis; hovers at dusk.
const LOOK = {"abdomenShape":"long","abdomen":118,"abdomenH":14,"thorax":28,"head":17,"legs":6,"legLen":74,"legW":4,"legColor":"#6B7385","color":"#B8BFCC","color2":"#5D6578","thoraxColor":"#9AA3B5","headColor":"#9AA3B5","pattern":"stripes","patternColor":"#5D6578","wings":"clear","wingSpan":120,"wingColor":"#E6F6FF","antennae":"thin","antennaLen":34,"antennaColor":"#5D6578","eyes":"dots","proboscis":true,"alt":120};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
