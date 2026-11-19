import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Beetle (preset of flat-vector/bug): shiny dark green-blue beetle with hard shell wings and a small horn-free head; crawls on leaves.
const LOOK = {"abdomenShape":"oval","abdomen":110,"abdomenH":52,"thorax":40,"head":20,"legs":6,"legLen":30,"legW":7,"legColor":"#0E3F47","color":"#1B6E78","color2":"#0E3F47","thoraxColor":"#15545D","headColor":"#15545D","pattern":"none","wings":"shell","wingSpan":150,"wingColor":"#23808B","antennae":"thin","antennaLen":30,"antennaColor":"#0E3F47","eyes":"dots","alt":120};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
