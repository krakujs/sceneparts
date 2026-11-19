import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Hare (preset of ink-sketch/quadruped): leaner sandy hare, longer legs, long ears with black tips (over)
const LOOK = {"len": 230, "girth": 100, "leg": 120, "legW": 24, "neck": 30, "neckAngle": 55, "head": 44, "snout": 22, "snoutH": 30, "color": "#D6A86E", "belly": "#F1DDB9", "muzzle": "#F1DDB9", "ear": "long", "earSize": 1.3, "innerEar": "#EBC9A8", "tail": "stub", "tailLen": 30, "tailColor": "#F1DDB9", "eye": 1.1, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
