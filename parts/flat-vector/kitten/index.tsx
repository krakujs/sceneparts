import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Kitten (preset of flat-vector/quadruped): tiny fluffy grey kitten: big eyes, big head, stubby legs, tail up
const LOOK = {"len": 150, "girth": 88, "leg": 58, "legW": 22, "neck": 12, "neckAngle": 45, "head": 50, "snout": 8, "snoutH": 30, "ear": "pointy", "earSize": 0.9, "innerEar": "#F5B7AE", "eye": 1.5, "tail": "thin", "tailLen": 110, "tailAngle": 62, "color": "#B7BCC6", "belly": "#E6E9EF", "fluff": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
