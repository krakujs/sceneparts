import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Pony (preset of flat-vector/quadruped): stocky chestnut pony with a cream shaggy mane and tail
const LOOK = {"len": 380, "girth": 190, "leg": 170, "legW": 42, "neck": 110, "neckW": 100, "neckAngle": 58, "head": 56, "snout": 84, "snoutH": 60, "headTilt": 35, "ear": "pointy", "earSize": 0.6, "innerEar": "none", "tail": "flowing", "tailLen": 130, "mane": "horse", "hooves": true, "mouth": "none", "color": "#C98A4E", "maneColor": "#F3E6C8", "tailColor": "#F3E6C8"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
