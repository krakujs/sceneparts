import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Butterfly (preset of flat-vector/bug): Butterfly; for garden and nature scenes.
const LOOK = {"abdomenShape":"long","abdomen":96,"abdomenH":15,"thorax":22,"head":20,"legs":6,"legLen":20,"legW":5,"legColor":"#1F2433","color":"#1F2433","color2":"#FFFFFF","pattern":"none","wings":"butterfly","wingSpan":150,"wingColor":"#FF8A3D","wingColor2":"#1F2433","wingSpots":true,"antennae":"clubbed","antennaLen":70,"antennaColor":"#1F2433","eyes":"big","alt":120};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
