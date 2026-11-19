import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Hamster (preset of flat-vector/quadruped): round golden hamster, white belly, round ears
const LOOK = {"len": 125, "girth": 92, "leg": 24, "legW": 20, "neck": 6, "neckAngle": 35, "head": 50, "snout": 20, "snoutH": 32, "color": "#E4A552", "belly": "#FFF4E0", "ear": "round", "earSize": 0.9, "earColor": "#E4A552", "innerEar": "#F4B6A6", "tail": "stub", "tailLen": 20, "tailColor": "#E4A552", "eye": 1.3, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
