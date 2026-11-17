import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Grasshopper (preset of flat-vector/bug): green grasshopper with big folded jumping hind legs; hops in meadows and grassy scenes.
const LOOK = {"abdomenShape":"oval","abdomen":130,"abdomenH":30,"thorax":44,"head":30,"legs":6,"legLen":40,"legW":8,"legColor":"#2E7A45","color":"#4BB46A","color2":"#2E7A45","thoraxColor":"#4BB46A","headColor":"#6CC77F","pattern":"none","wings":"grasshopper","wingSpan":150,"wingColor":"#3E9A52","antennae":"thin","antennaLen":60,"antennaColor":"#2E7A45","eyes":"big","hindLegs":"jumper","alt":0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
