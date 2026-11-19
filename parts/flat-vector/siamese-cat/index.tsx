import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Siamese cat (preset of flat-vector/quadruped): cream body with dark brown points: ears, face mask, legs and tail; slender build
const LOOK = {"len": 260, "girth": 120, "leg": 92, "legW": 26, "neck": 40, "neckAngle": 60, "head": 56, "snout": 24, "snoutH": 40, "ear": "pointy", "earSize": 1.15, "earColor": "#5E3B26", "innerEar": "#8A5A3C", "color": "#F1E4C8", "headColor": "#F1E4C8", "muzzle": "#F1E4C8", "legColor": "#5E3B26", "mask": "face", "maskColor": "#5E3B26", "tail": "thin", "tailLen": 190, "tailAngle": 30, "tailColor": "#5E3B26", "nose": "#5E3B26", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
