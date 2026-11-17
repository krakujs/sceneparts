import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Mongoose (preset of flat-vector/quadruped): slim grey-brown mongoose, long legs, long tapering tail
const LOOK = {"len": 250, "girth": 95, "leg": 70, "legW": 22, "neck": 34, "neckAngle": 50, "head": 46, "snout": 50, "snoutH": 30, "color": "#8C7A62", "belly": "#B9A78A", "ear": "round", "earSize": 0.7, "earColor": "#8C7A62", "innerEar": "#D9A9A0", "tail": "thin", "tailLen": 200, "tailAngle": 10, "tailColor": "#6E5E4A", "eye": 1.1, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
