import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Capybara (preset of flat-vector/quadruped): large brown rodent with a barrel body, blunt square snout, tiny ears and no tail
const LOOK = {"len": 330, "girth": 260, "leg": 80, "legW": 56, "neck": 14, "neckAngle": 40, "head": 80, "snout": 36, "snoutH": 76, "headTilt": 5, "ear": "tiny", "earSize": 0.7, "earColor": "#8A5A3C", "innerEar": "#5E3B26", "color": "#A9744F", "belly": "#C98E62", "muzzle": "#D7A97E", "legColor": "#8A5A3C", "feet": "#5E3B26", "tail": "none", "nose": "#1F2433", "mouth": "none", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
