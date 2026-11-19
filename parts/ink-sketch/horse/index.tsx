import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Horse (preset of ink-sketch/quadruped): brown horse, dark mane and flowing tail, dark hooves
const LOOK = {"len": 520, "girth": 220, "leg": 300, "legW": 46, "neck": 170, "neckW": 110, "neckAngle": 58, "head": 62, "snout": 120, "snoutH": 70, "headTilt": 35, "ear": "pointy", "earSize": 0.6, "innerEar": "none", "tail": "flowing", "tailLen": 160, "mane": "horse", "hooves": true, "mouth": "none", "color": "#8A5A3C", "maneColor": "#3A2416", "pattern": "blaze"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
