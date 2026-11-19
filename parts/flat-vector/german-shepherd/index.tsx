import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// German shepherd (preset of flat-vector/quadruped): tan coat with a black saddle, black muzzle, large upright ears, sloped back and bushy tail
const LOOK = {"len": 330, "girth": 140, "leg": 130, "legW": 36, "neck": 44, "neckAngle": 58, "back": 10, "head": 60, "snout": 70, "snoutH": 46, "ear": "pointy", "earSize": 1.3, "earColor": "#2F2A26", "innerEar": "#6B4A36", "color": "#C98B4A", "belly": "#E8C28A", "headColor": "#C98B4A", "muzzle": "#2F2A26", "pattern": "saddle", "patternColor": "#2F2A26", "tail": "bushy", "tailLen": 150, "tailAngle": 25, "tailColor": "#C98B4A", "tailTip": "#2F2A26", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
