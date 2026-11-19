import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Polar bear (preset of flat-vector/quadruped): creamy white coat, longer neck, small round ears, black nose.
const LOOK = {"len": 340, "girth": 210, "leg": 115, "legW": 56, "neck": 60, "neckAngle": 35, "head": 72, "snout": 44, "snoutH": 52, "color": "#F4F0E4", "belly": "#E7E1D1", "ear": "round", "earSize": 0.6, "innerEar": "#D9D2C0", "tail": "stub", "tailColor": "#F4F0E4", "nose": "#1F2433", "mouth": "smile", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
