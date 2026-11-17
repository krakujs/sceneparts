import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Black cat (preset of flat-vector/quadruped): all black body, upright tail, yellow-green eyes drawn on top
const LOOK = {"len": 240, "girth": 130, "leg": 92, "legW": 28, "neck": 40, "neckAngle": 62, "head": 56, "snout": 10, "snoutH": 36, "ear": "pointy", "earSize": 1.1, "earColor": "#262A36", "innerEar": "#3A3F4E", "color": "#262A36", "headColor": "#262A36", "muzzle": "#262A36", "tail": "thin", "tailLen": 210, "tailAngle": 82, "tailColor": "#262A36", "eye": 1.2, "nose": "#4A4F5E", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g><circle cx={h.x + h.r*0.42} cy={h.y - h.r*0.18} r={h.r*0.17} fill="#A8D85A" /><ellipse cx={h.x + h.r*0.42} cy={h.y - h.r*0.18} rx={h.r*0.035} ry={h.r*0.13} fill="#1F2433" /><circle cx={h.x + h.r*0.48} cy={h.y - h.r*0.25} r={h.r*0.03} fill="#FFFFFF" /></g>)} />;
}
