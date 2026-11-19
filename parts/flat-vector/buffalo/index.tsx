import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Water buffalo (preset of flat-vector/quadruped): dark grey water buffalo, big horns swept back
const LOOK = {"len": 380, "girth": 230, "leg": 150, "legW": 56, "neck": 60, "neckAngle": 35, "neckW": 140, "head": 72, "snout": 68, "snoutH": 52, "headTilt": 25, "ear": "side", "earSize": 1.0, "color": "#4A4F58", "belly": "#3A3E46", "muzzle": "#6B6F78", "horns": "buffalo", "hornSize": 1.6, "hornColor": "#E6DDC6", "tail": "thin", "tailLen": 120, "tailAngle": 20, "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
