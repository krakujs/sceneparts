import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Mule (preset of flat-vector/quadruped): brown mule: long ears, horse-like body, pale muzzle
const LOOK = {"len": 460, "girth": 210, "leg": 260, "legW": 46, "neck": 140, "neckW": 100, "neckAngle": 58, "head": 62, "snout": 110, "snoutH": 70, "headTilt": 35, "ear": "long", "earSize": 0.75, "innerEar": "#C9A88A", "tail": "tuft", "tailLen": 130, "mane": "horse", "hooves": true, "mouth": "none", "color": "#8A6446", "muzzle": "#CDB49A", "maneColor": "#3A2A1E", "tailAngle": -30};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
