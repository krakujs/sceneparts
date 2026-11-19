import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Guinea pig (preset of ink-sketch/quadruped): round cream guinea pig with brown patches, tiny legs, no tail
const LOOK = {"len": 190, "girth": 150, "leg": 24, "legW": 34, "neck": 6, "neckAngle": 30, "head": 60, "snout": 26, "snoutH": 44, "color": "#F3E2C4", "pattern": "patches", "patternColor": "#9A6036", "headColor": "#B9793F", "muzzle": "#F3E2C4", "ear": "round", "earSize": 0.8, "earColor": "#B9793F", "innerEar": "none", "tail": "none", "eye": 1.1, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
