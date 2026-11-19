import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Calf (preset of ink-sketch/quadruped): young brown and white calf, no horns, big head
const LOOK = {"len": 230, "girth": 130, "leg": 100, "legW": 28, "neck": 30, "neckAngle": 55, "head": 60, "snout": 44, "snoutH": 44, "headTilt": 15, "ear": "side", "earSize": 0.8, "color": "#A9764A", "belly": "#F3EEE4", "pattern": "patches", "patternColor": "#F7F5F0", "muzzle": "#F2D9C8", "eye": 1.25, "tail": "tuft", "tailLen": 80, "tailAngle": 30, "maneColor": "#F7F5F0", "hooves": true, "mouth": "smile", "innerEar": "#F2A7B8"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
