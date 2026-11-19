import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Rhino (preset of flat-vector/quadruped): stocky grey rhino, two nose horns, small pointy ears, thick legs
const LOOK = {"len": 380, "girth": 290, "leg": 170, "legW": 90, "neck": 30, "neckAngle": 40, "head": 100, "snout": 80, "snoutH": 80, "headTilt": 8, "ear": "pointy", "earSize": 0.55, "innerEar": "#7D8699", "horns": "rhino", "hornSize": 0.9, "hornColor": "#5E6578", "color": "#8E97A8", "legColor": "#818A9C", "feet": "#6E7789", "nose": "#3A4157", "tail": "tuft", "tailLen": 100, "tailAngle": 30, "mouth": "none", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
