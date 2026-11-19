import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Lynx (preset of flat-vector/quadruped): grey-beige coat, pointy ears with black tufts (over), short stub tail, lightly spotted.
const LOOK = {"len": 300, "girth": 140, "leg": 105, "legW": 40, "neck": 26, "neckAngle": 55, "head": 66, "snout": 36, "snoutH": 44, "color": "#B9A48A", "belly": "#EDE3D3", "pattern": "spots", "patternColor": "#8E7D68", "ear": "pointy", "earSize": 1.0, "innerEar": "#F1E4D4", "tail": "stub", "tailLen": 60, "tailColor": "#B9A48A", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => ((() => {
  const r = h.r;
  const a = (p.pose === 'graze' ? 25 : 0) * Math.PI / 180; const R = (x: number, y: number) => [h.x + x * Math.cos(a) - y * Math.sin(a), h.y + x * Math.sin(a) + y * Math.cos(a)];
  const tip = [-0.3 * r, -(0.75 + 0.85) * r];
  const ap = R(tip[0], tip[1] - 0.45 * r), b1 = R(tip[0] - 0.1 * r, tip[1] + 0.03 * r), b2 = R(tip[0] + 0.1 * r, tip[1] + 0.03 * r);
  return <path d={`M ${b1[0]} ${b1[1]} L ${ap[0]} ${ap[1]} L ${b2[0]} ${b2[1]} Z`} fill='#2B2A2E' />;
})())} />;
}
