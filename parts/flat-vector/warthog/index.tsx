import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Warthog (preset of flat-vector/quadruped): grey warthog: big flat snout, curved tusks, ridge mane, thin tail with a tuft
const LOOK = {"len": 300, "girth": 150, "leg": 130, "legW": 30, "neck": 40, "neckAngle": 45, "neckW": 80, "head": 92, "snout": 96, "snoutH": 52, "headTilt": 20, "ear": "pointy", "earSize": 0.6, "earColor": "#9C9A94", "innerEar": "#7A786F", "color": "#9C9A94", "muzzle": "#B8B3AA", "legColor": "#8A887F", "hooves": true, "mane": "ridge", "maneColor": "#5E5E66", "tusks": "large", "tail": "tuft", "tailLen": 130, "tailAngle": -40, "tailColor": "#9C9A94", "nose": "#3A3A42", "mouth": "none", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
