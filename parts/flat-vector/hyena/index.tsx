import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Spotted hyena (preset of flat-vector/quadruped): sandy coat with dark spots, sloping back (back > 0), round ears, short tail with dark tuft, mane ridge.
const LOOK = {"len": 320, "girth": 170, "back": 40, "leg": 120, "legW": 40, "neck": 30, "neckAngle": 40, "head": 62, "snout": 50, "snoutH": 44, "color": "#D8B57E", "belly": "none", "pattern": "spots", "patternColor": "#5A4636", "ear": "round", "earSize": 0.9, "mane": "ridge", "maneColor": "#4A3A2C", "tail": "tuft", "tailLen": 110, "tailAngle": 25, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
