import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Honey bee (preset of flat-vector/bug): Honey bee; hovers or flies in garden scenes.
const LOOK = {"abdomenShape":"oval","abdomen":112,"abdomenH":40,"thorax":44,"head":30,"legs":6,"legLen":30,"legW":8,"legColor":"#1F2433","color":"#FFC83D","color2":"#1F2433","pattern":"stripes","wings":"clear","wingSpan":120,"wingColor":"#E6F6FF","antennae":"thin","antennaLen":50,"eyes":"big","stinger":true,"alt":120};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
