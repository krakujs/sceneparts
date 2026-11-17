import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Woolly mammoth (preset of flat-vector/quadruped): shaggy brown mammoth: shag mane, shoulder hump, wool outline, long tusks, trunk
const LOOK = {"len": 400, "girth": 320, "leg": 220, "legW": 96, "neck": 40, "neckAngle": 50, "neckW": 150, "head": 118, "snout": 34, "snoutH": 96, "ear": "tiny", "earSize": 1.0, "earColor": "#7A4E30", "innerEar": "#5E3B26", "trunk": true, "tusks": "large", "hump": "shoulder", "mane": "shag", "maneColor": "#5E3B26", "pattern": "wool", "tail": "tuft", "tailLen": 150, "tailAngle": -50, "color": "#8A5A3C", "legColor": "#7A4E30", "feet": "#4A3226", "nose": "#3A2A20", "mouth": "none", "eye": 0.9, "fluff": true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
