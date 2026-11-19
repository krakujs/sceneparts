import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Ant (preset of flat-vector/bug): red-brown ant with three body parts, thin waist and elbow antennae; crawls, for garden and picnic scenes.
const LOOK = {"abdomenShape":"oval","abdomen":100,"abdomenH":40,"thorax":28,"head":26,"waist":true,"legs":6,"legLen":32,"legW":6,"legColor":"#5E2A18","color":"#A4482A","color2":"#5E2A18","thoraxColor":"#8E3C23","headColor":"#A4482A","pattern":"none","wings":"none","antennae":"elbow","antennaLen":50,"antennaColor":"#5E2A18","eyes":"dots","alt":0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
