import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Antelope (preset of flat-vector/quadruped): sandy antelope, white belly, dark face mask and long straight horns
const LOOK = {"len": 320, "girth": 150, "leg": 230, "legW": 26, "neck": 110, "neckAngle": 70, "neckW": 70, "head": 62, "snout": 60, "snoutH": 44, "headTilt": 15, "ear": "side", "earSize": 0.9, "earColor": "#D9B07A", "innerEar": "#FFFFFF", "color": "#D9B07A", "belly": "#FFFFFF", "mask": "face", "maskColor": "#6B4F36", "horns": "straight", "hornSize": 1.5, "hornColor": "#4A3B2E", "hooves": true, "tail": "tuft", "tailLen": 90, "tailAngle": -20, "tailColor": "#D9B07A", "nose": "#1F2433", "mouth": "none", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
