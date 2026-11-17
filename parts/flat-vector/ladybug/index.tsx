import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Ladybug (preset of flat-vector/bug): Ladybug; for garden and kids scenes.
const LOOK = {"abdomenShape":"round","abdomen":120,"abdomenH":58,"thorax":30,"head":24,"legs":6,"legLen":22,"legW":6,"legColor":"#1F2433","color":"#E8503F","color2":"#1F2433","thoraxColor":"#1F2433","headColor":"#1F2433","pattern":"spots","patternColor":"#1F2433","wings":"shell","antennae":"elbow","antennaLen":30,"antennaColor":"#1F2433","eyes":"dots"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Bug {...q} />;
}
