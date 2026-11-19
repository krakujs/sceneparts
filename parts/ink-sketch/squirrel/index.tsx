import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Squirrel (preset of ink-sketch/quadruped): red-brown squirrel, big bushy upright tail with dark tip
const LOOK = {"len": 180, "girth": 100, "leg": 62, "legW": 22, "neck": 22, "neckAngle": 55, "head": 44, "snout": 20, "snoutH": 28, "color": "#B5562B", "belly": "#F0D2A8", "ear": "round", "earSize": 0.8, "earColor": "#B5562B", "innerEar": "none", "tail": "bushy", "tailLen": 175, "tailAngle": 62, "tailColor": "#C8622F", "tailTip": "#7A3418", "eye": 1.2, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
