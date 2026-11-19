import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Ferret (preset of flat-vector/quadruped): long slim cream ferret, dark face mask, short legs
const LOOK = {"len": 280, "girth": 80, "leg": 40, "legW": 20, "neck": 30, "neckAngle": 35, "head": 48, "snout": 40, "snoutH": 30, "color": "#E8D3A8", "headColor": "#E8D3A8", "muzzle": "#E8D3A8", "legColor": "#A9825A", "feet": "#6B4A32", "ear": "round", "earSize": 0.7, "earColor": "#6B4A32", "innerEar": "none", "mask": "face", "maskColor": "#4A3A2E", "tail": "thin", "tailLen": 150, "tailAngle": 15, "tailColor": "#A9825A", "eye": 1.1, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
