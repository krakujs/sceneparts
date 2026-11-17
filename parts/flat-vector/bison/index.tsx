import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Bison (preset of flat-vector/quadruped): brown bison: shoulder hump, dark shag front, short horns, low head
const LOOK = {"len": 360, "girth": 250, "leg": 150, "legW": 52, "neck": 80, "neckAngle": 35, "neckW": 150, "head": 92, "snout": 60, "snoutH": 70, "headTilt": 35, "back": 20, "hump": "shoulder", "mane": "shag", "maneColor": "#4A2F20", "ear": "tiny", "earSize": 1.0, "earColor": "#5E3B26", "innerEar": "#7A4E30", "color": "#8A5A3C", "muzzle": "#6B4A36", "legColor": "#5E3B26", "hooves": true, "horns": "cow", "hornSize": 0.8, "hornColor": "#EFE6D2", "tail": "tuft", "tailLen": 90, "tailAngle": -40, "tailColor": "#5E3B26", "nose": "#1F2433", "mouth": "none", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
