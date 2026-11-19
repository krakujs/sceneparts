import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Tapir (preset of flat-vector/quadruped): black front, legs and back with a white saddle band and a short trunk-like snout
const LOOK = {"len": 340, "girth": 200, "leg": 120, "legW": 46, "neck": 60, "neckAngle": 58, "neckW": 130, "head": 80, "snout": 26, "snoutH": 70, "headTilt": 10, "ear": "round", "earSize": 1.0, "earColor": "#2F3547", "innerEar": "#5A6175", "color": "#2F3547", "legColor": "#2F3547", "hooves": true, "tail": "stub", "tailColor": "#2F3547", "nose": "#1F2433", "mouth": "none", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g><ellipse cx={h.len * 0.02} cy={h.by} rx={h.len * 0.2} ry={h.girth * 0.48} fill="#FFFFFF" /><path d={`M ${h.x + 30} ${h.y - 8} Q ${h.x + 100} ${h.y - 4} ${h.x + 104} ${h.y + 44} Q ${h.x + 98} ${h.y + 54} ${h.x + 90} ${h.y + 44} Q ${h.x + 80} ${h.y + 26} ${h.x + 30} ${h.y + 24} Z`} fill="#4A5166" /></g>)} />;
}
