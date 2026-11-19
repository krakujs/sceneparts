import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Wild boar (preset of flat-vector/quadruped): dark bristly brown boar with a ridge mane, small tusks and pointy ears
const LOOK = {"len": 300, "girth": 170, "leg": 110, "legW": 36, "neck": 50, "neckAngle": 55, "neckW": 120, "head": 68, "snout": 50, "snoutH": 56, "headTilt": 10, "ear": "pointy", "earSize": 0.8, "earColor": "#6B4A36", "innerEar": "#A87A5E", "color": "#6B4A36", "legColor": "#5A3E2E", "hooves": true, "mane": "ridge", "maneColor": "#3A2A20", "tusks": "small", "tail": "thin", "tailLen": 80, "tailAngle": 40, "tailColor": "#6B4A36", "nose": "#1F2433", "mouth": "none", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
