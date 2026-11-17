import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Sheep (preset of flat-vector/quadruped): white woolly sheep with black face and legs
const LOOK = {"len": 300, "girth": 190, "leg": 110, "legW": 30, "neck": 50, "neckAngle": 50, "neckW": 90, "head": 56, "snout": 46, "snoutH": 40, "headTilt": 10, "ear": "side", "earSize": 0.8, "earColor": "#2A2D35", "color": "#FFFFFF", "belly": "#FFFFFF", "pattern": "wool", "headColor": "#2A2D35", "muzzle": "#2A2D35", "legColor": "#2A2D35", "tail": "stub", "tailLen": 30, "tailColor": "#FFFFFF", "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
