import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Cricket (insect) (preset of flat-vector/bug): brown cricket with long antennae and jumping legs; for night meadows and campfire scenes.
const LOOK = {"abdomenShape":"oval","abdomen":120,"abdomenH":34,"thorax":40,"head":24,"legs":6,"legLen":40,"legW":8,"legColor":"#5A3A22","color":"#8A5A3C","color2":"#5E3B26","thoraxColor":"#8A5A3C","headColor":"#8A5A3C","pattern":"none","wings":"grasshopper","wingSpan":140,"wingColor":"#6E4727","antennae":"thin","antennaLen":130,"antennaColor":"#3B2516","eyes":"dots","hindLegs":"jumper","alt":0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
