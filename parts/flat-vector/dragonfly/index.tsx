import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Dragonfly (preset of flat-vector/bug): long thin turquoise body, four long clear wings and big eyes; hovers over ponds and gardens.
const LOOK = {"abdomenShape":"long","abdomen":170,"abdomenH":14,"thorax":38,"head":30,"legs":6,"legLen":26,"legW":5,"legColor":"#1F2433","color":"#27B8B0","color2":"#14706B","thoraxColor":"#27B8B0","headColor":"#1FA39A","pattern":"stripes","patternColor":"#14706B","wings":"long","wingSpan":170,"wingColor":"#E6F6FF","antennae":"none","eyes":"big","alt":170};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
