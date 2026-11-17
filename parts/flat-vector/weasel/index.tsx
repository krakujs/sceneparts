import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Weasel (preset of flat-vector/quadruped): long slim brown weasel, white belly and chin
const LOOK = {"len": 250, "girth": 72, "leg": 40, "legW": 18, "neck": 30, "neckAngle": 30, "head": 40, "snout": 32, "snoutH": 24, "color": "#8B5A30", "belly": "#F7F3EA", "muzzle": "#F7F3EA", "ear": "round", "earSize": 0.6, "earColor": "#8B5A30", "innerEar": "#E9A0A8", "tail": "thin", "tailLen": 110, "tailAngle": 12, "tailColor": "#8B5A30", "eye": 1.1, "nose": "#1F2433", "mouth": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
