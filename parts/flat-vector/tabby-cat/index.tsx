import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Tabby cat (preset of flat-vector/quadruped): grey coat with dark stripes on body, legs and neck, forehead M marks, white muzzle
const LOOK = {"len": 250, "girth": 135, "leg": 88, "legW": 30, "neck": 38, "neckAngle": 58, "head": 62, "snout": 14, "snoutH": 40, "ear": "pointy", "earSize": 1, "earColor": "#8F98A8", "innerEar": "#F2B8B8", "color": "#8F98A8", "headColor": "#8F98A8", "muzzle": "#FFFFFF", "belly": "#E9ECF2", "pattern": "stripes", "patternColor": "#3A4157", "tail": "thin", "tailLen": 160, "tailAngle": 30, "tailColor": "#8F98A8", "eye": 1.2, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g>{[-0.3, 0, 0.3].map((u, i) => <path key={i} d={`M ${h.x + h.r*(u-0.09)} ${h.y - h.r*0.98} L ${h.x + h.r*u} ${h.y - h.r*0.5} L ${h.x + h.r*(u+0.09)} ${h.y - h.r*0.98} Z`} fill="#3A4157" />)}</g>)} />;
}
