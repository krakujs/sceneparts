import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Dalmatian (preset of flat-vector/quadruped): white coat with black spots, black floppy ears, thin tail, long legs
const LOOK = {"len": 320, "girth": 150, "leg": 130, "legW": 30, "neck": 34, "neckAngle": 60, "head": 62, "snout": 46, "snoutH": 44, "ear": "floppy", "earSize": 1, "earColor": "#1F2433", "tail": "thin", "tailLen": 150, "tailAngle": 35, "tailColor": "#FFFFFF", "color": "#FFFFFF", "belly": "#FFFFFF", "pattern": "spots", "patternColor": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g><circle cx={h.x - h.r*0.3} cy={h.y - h.r*0.45} r={h.r*0.2} fill="#1F2433" /><circle cx={h.x + h.r*0.02} cy={h.y - h.r*0.72} r={h.r*0.15} fill="#1F2433" /></g>)} />;
}
