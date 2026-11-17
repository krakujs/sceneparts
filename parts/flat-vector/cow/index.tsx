import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Cow (preset of flat-vector/quadruped): white dairy cow, black patches, pink muzzle, small horns
const LOOK = {"len": 380, "girth": 200, "leg": 200, "legW": 40, "neck": 60, "neckAngle": 50, "neckW": 100, "head": 62, "snout": 70, "snoutH": 50, "headTilt": 20, "ear": "side", "earSize": 1.0, "color": "#F7F5F0", "belly": "#F7F5F0", "pattern": "patches", "patternColor": "#2A2A2E", "muzzle": "#F2A7B8", "horns": "cow", "hornSize": 0.8, "hornColor": "#EFE6D2", "tail": "tuft", "tailLen": 150, "tailAngle": 25, "maneColor": "#2A2A2E", "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
