import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Wasp (preset of flat-vector/bug): slim yellow and black wasp with a pointed abdomen, thin waist and stinger; hovers or flies in gardens.
const LOOK = {"abdomenShape":"pointed","abdomen":120,"abdomenH":26,"thorax":36,"head":24,"waist":true,"legs":6,"legLen":34,"legW":6,"legColor":"#1F2433","color":"#FFC83D","color2":"#1F2433","thoraxColor":"#1F2433","headColor":"#FFC83D","pattern":"stripes","patternColor":"#1F2433","wings":"clear","wingSpan":120,"wingColor":"#E6F6FF","antennae":"thin","antennaLen":42,"eyes":"big","stinger":true,"alt":120};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
