import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Cheetah (preset of flat-vector/quadruped): slim tawny body, long legs, small head, black spots, black tear-mark lines from the eyes (over).
const LOOK = {"len": 320, "girth": 105, "leg": 200, "legW": 24, "neck": 30, "neckAngle": 40, "head": 46, "snout": 34, "snoutH": 32, "color": "#E8B469", "belly": "#F8EBD0", "pattern": "spots", "patternColor": "#1F2433", "ear": "round", "earSize": 0.8, "innerEar": "none", "tail": "thin", "tailLen": 230, "tailAngle": 22, "tailColor": "#E8B469", "mouth": "smile", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => ((() => {
  const r = h.r;
  const a = (p.pose === 'graze' ? 25 : 0) * Math.PI / 180; const R = (x: number, y: number) => [h.x + x * Math.cos(a) - y * Math.sin(a), h.y + x * Math.sin(a) + y * Math.cos(a)];
  const s = R(r * 0.4, -r * 0.1), e = R(r * 0.7, r * 0.42);
  return <path d={`M ${s[0]} ${s[1]} L ${e[0]} ${e[1]}`} stroke='#1F2433' strokeWidth={r * 0.09} strokeLinecap='round' fill='none' />;
})())} />;
}
