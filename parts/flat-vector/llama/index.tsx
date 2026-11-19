import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Llama (preset of flat-vector/quadruped): cream llama: long upright neck, banana ears
const LOOK = {"len": 280, "girth": 130, "leg": 190, "legW": 28, "neck": 170, "neckAngle": 75, "neckW": 50, "head": 46, "snout": 52, "snoutH": 30, "headTilt": 10, "ear": "long", "earSize": 0.55, "color": "#F1E4CC", "belly": "#FAF4E6", "headColor": "#F1E4CC", "innerEar": "none", "tail": "stub", "tailLen": 40, "tailColor": "#F1E4CC", "nose": "#3A3340", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
