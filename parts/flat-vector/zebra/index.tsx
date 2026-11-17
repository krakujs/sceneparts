import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Zebra (preset of flat-vector/quadruped): white horse-like body with black stripes, black neck mane, black-tufted tail and hooves
const LOOK = {"len": 330, "girth": 190, "leg": 230, "legW": 34, "neck": 170, "neckAngle": 68, "neckW": 92, "head": 74, "snout": 84, "snoutH": 58, "headTilt": 25, "ear": "pointy", "earSize": 0.9, "earColor": "#FFFFFF", "innerEar": "#3A4157", "color": "#FFFFFF", "pattern": "stripes", "patternColor": "#1F2433", "mane": "neck", "maneColor": "#1F2433", "tail": "tuft", "tailLen": 150, "tailAngle": -40, "tailColor": "#FFFFFF", "hooves": true, "nose": "#1F2433", "mouth": "smile", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
