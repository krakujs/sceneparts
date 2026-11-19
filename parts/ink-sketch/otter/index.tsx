import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Otter (preset of ink-sketch/quadruped): long sleek brown otter, pale muzzle, short legs, thick tapering tail
const LOOK = {"len": 250, "girth": 92, "leg": 42, "legW": 28, "neck": 24, "neckAngle": 25, "head": 50, "snout": 34, "snoutH": 32, "headTilt": 12, "color": "#6B4A32", "belly": "#D8B88A", "muzzle": "#E9D3A9", "headColor": "#8A6242", "feet": "#3E2B1E", "ear": "round", "earSize": 0.45, "earColor": "#6B4A32", "innerEar": "none", "tail": "thin", "tailLen": 165, "tailAngle": 12, "tailColor": "#6B4A32", "eye": 0.9, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
