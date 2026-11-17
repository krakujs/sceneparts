import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Chipmunk (preset of flat-vector/quadruped): small tan chipmunk, three dark horizontal back stripes (over), bushy tail
const LOOK = {"len": 150, "girth": 88, "leg": 40, "legW": 18, "neck": 14, "neckAngle": 50, "head": 44, "snout": 26, "snoutH": 28, "color": "#D08A4E", "belly": "#F5E6CF", "ear": "round", "earSize": 0.8, "earColor": "#D08A4E", "innerEar": "none", "tail": "bushy", "tailLen": 120, "tailAngle": 30, "tailColor": "#B86E3A", "eye": 1.3, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g>{[-0.36, -0.16, 0.04].map((v, i) => <path key={i} d={`M ${-h.len * 0.34} ${h.by + h.girth * v} Q ${-h.len * 0.02} ${h.by + h.girth * (v - 0.03)} ${h.len * 0.26} ${h.by + h.girth * v}`} stroke='#4A2E1C' strokeWidth={h.girth * 0.065} strokeLinecap='round' fill='none' />)}</g>)} />;
}
