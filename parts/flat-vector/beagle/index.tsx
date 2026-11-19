import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Beagle (preset of flat-vector/quadruped): white body and legs, tan head, black saddle, floppy ears, tail with white tip
const LOOK = {"len": 300, "girth": 136, "leg": 100, "legW": 32, "neck": 36, "neckAngle": 58, "head": 66, "snout": 52, "snoutH": 46, "ear": "floppy", "earSize": 1, "earColor": "#8A4E26", "color": "#F7F2E8", "headColor": "#B8703A", "muzzle": "#F7F2E8", "belly": "#F7F2E8", "pattern": "saddle", "patternColor": "#2F2A26", "tail": "bushy", "tailLen": 120, "tailAngle": 48, "tailColor": "#B8703A", "tailTip": "#FFFFFF", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
