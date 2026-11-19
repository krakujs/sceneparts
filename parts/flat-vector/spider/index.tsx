import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Spider (preset of flat-vector/bug): Spider; cute, not scary, for garden scenes.
const LOOK = {"abdomenShape":"round","abdomen":112,"abdomenH":58,"thorax":26,"head":22,"legs":8,"legLen":84,"legW":7,"legColor":"#1F2433","color":"#5A40A8","color2":"#A98BF0","thoraxColor":"#3A2A7A","headColor":"#3A2A7A","pattern":"spots","patternColor":"#A98BF0","wings":"none","antennae":"none","eyes":"big"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
