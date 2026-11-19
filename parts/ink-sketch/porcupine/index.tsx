import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Porcupine (preset of ink-sketch/quadruped): dark bulky porcupine, long pale quills along the back (over)
const LOOK = {"len": 260, "girth": 175, "leg": 70, "legW": 36, "neck": 30, "neckAngle": 40, "head": 62, "snout": 34, "snoutH": 46, "color": "#4E443B", "headColor": "#4E443B", "muzzle": "#8A7D6E", "legColor": "#3A332D", "ear": "round", "earSize": 0.6, "earColor": "#4E443B", "innerEar": "none", "tail": "thin", "tailLen": 80, "tailAngle": 25, "tailColor": "#3A332D", "eye": 0.9, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g>{Array.from({length: 16}, (_, i) => { const a = h.len * 0.5, b = h.girth * 0.5, ph = (188 + i * 9) * Math.PI / 180; const px = Math.cos(ph) * a, py = h.by + Math.sin(ph) * b; const q1 = Math.cos(ph) / a, q2 = Math.sin(ph) / b, Q = Math.hypot(q1, q2); const dx0 = q1 / Q - 0.45, dy0 = q2 / Q, D = Math.hypot(dx0, dy0), ux = dx0 / D, uy = dy0 / D, w = h.girth * 0.035, Lp = h.girth * (0.45 + (i % 3) * 0.08); return <path key={i} d={`M ${px - uy * w} ${py + ux * w} L ${px + ux * Lp} ${py + uy * Lp} L ${px + uy * w} ${py - ux * w} Z`} fill={i % 2 ? '#E9E0CC' : '#2E2924'} />; })}</g>)} />;
}
