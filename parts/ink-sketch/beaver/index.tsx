import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Beaver (preset of ink-sketch/quadruped): brown beaver, flat dark paddle tail, small round ears, two front teeth (over)
const LOOK = {"len": 200, "girth": 125, "leg": 40, "legW": 36, "neck": 14, "neckAngle": 35, "head": 50, "snout": 40, "snoutH": 40, "color": "#7A5234", "belly": "#A87B52", "muzzle": "#A87B52", "ear": "round", "earSize": 0.6, "earColor": "#7A5234", "innerEar": "none", "tail": "flat", "tailLen": 150, "tailColor": "#3A2A20", "eye": 0.9, "nose": "#1F2433", "mouth": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g transform={`translate(${h.x} ${h.y})`}>{[0, 1].map((i) => <rect key={i} x={0.85 * h.r + 40 - 20 + i * 8} y={0.25 * h.r + 8} width={7} height={14} rx={2} fill='#FFFFFF' />)}</g>)} />;
}
