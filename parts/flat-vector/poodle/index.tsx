import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Poodle (preset of flat-vector/quadruped): apricot curly wool body, fluffy legs, pom-pom tail, topknot drawn on top of the head
const LOOK = {"len": 300, "girth": 150, "leg": 150, "legW": 30, "neck": 40, "neckAngle": 60, "head": 64, "snout": 40, "snoutH": 46, "ear": "floppy", "earSize": 1.2, "earColor": "#D9975A", "color": "#EFBE84", "headColor": "#EFBE84", "pattern": "wool", "tail": "bushy", "tailLen": 105, "tailAngle": 45, "tailColor": "#EFBE84", "fluff": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g><circle cx={h.x - h.r*0.05} cy={h.y - h.r*1.0} r={h.r*0.42} fill="#F6D7A8" /><circle cx={h.x - h.r*0.45} cy={h.y - h.r*0.78} r={h.r*0.3} fill="#F6D7A8" /><circle cx={h.x + h.r*0.3} cy={h.y - h.r*0.8} r={h.r*0.3} fill="#F6D7A8" /></g>)} />;
}
