import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Goat (preset of ink-sketch/quadruped): white and brown goat: beard, backward horns
const LOOK = {"len": 280, "girth": 150, "leg": 150, "legW": 30, "neck": 60, "neckAngle": 60, "neckW": 70, "head": 56, "snout": 60, "snoutH": 40, "headTilt": 25, "ear": "side", "earSize": 0.9, "earColor": "#9A6A42", "color": "#F5F1E8", "belly": "#F5F1E8", "pattern": "patches", "patternColor": "#9A6A42", "headColor": "#9A6A42", "muzzle": "#F5F1E8", "mane": "beard", "maneColor": "#5E3A22", "horns": "goat", "hornSize": 1.4, "hornColor": "#E6D9BE", "tail": "stub", "tailLen": 30, "tailColor": "#F5F1E8", "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
