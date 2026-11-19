import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Elephant (preset of ink-sketch/quadruped): grey elephant, fan ears, trunk hanging down, tusks, tail hanging back-down
const LOOK = {"len": 400, "girth": 330, "leg": 230, "legW": 96, "neck": 40, "neckAngle": 50, "head": 120, "snout": 30, "snoutH": 90, "ear": "fan", "earSize": 1.3, "earColor": "#A6ADBB", "innerEar": "#C9CED8", "trunk": true, "tusks": "large", "tail": "tuft", "tailLen": 230, "tailAngle": -60, "color": "#9AA3B5", "legColor": "#8C95A8", "feet": "#7C8496", "nose": "#3A4157", "mouth": "none", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
