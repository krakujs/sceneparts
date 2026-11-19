import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Baby elephant (preset of ink-sketch/quadruped): round grey calf with a big head, small trunk, no tusks
const LOOK = {"len": 250, "girth": 240, "leg": 130, "legW": 66, "neck": 10, "neckAngle": 60, "head": 108, "snout": 22, "snoutH": 84, "ear": "fan", "earSize": 1.2, "earColor": "#B4BBC8", "innerEar": "#D9DDE5", "trunk": true, "tusks": "none", "tail": "tuft", "tailLen": 90, "tailAngle": -60, "color": "#AEB5C3", "legColor": "#A0A8B8", "feet": "#8F98AA", "nose": "#3A4157", "mouth": "none", "eye": 1.25};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
