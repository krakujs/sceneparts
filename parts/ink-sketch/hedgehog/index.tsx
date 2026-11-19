import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Hedgehog (preset of ink-sketch/quadruped): round brown hedgehog with spines drawn on the back (over), pale face, tiny legs
const LOOK = {"len": 150, "girth": 128, "leg": 24, "legW": 26, "neck": 8, "neckAngle": 20, "head": 46, "snout": 22, "snoutH": 30, "color": "#A7714A", "headColor": "#F2E2C6", "muzzle": "#F2E2C6", "legColor": "#5E3B26", "ear": "round", "earSize": 0.6, "earColor": "#5E3B26", "innerEar": "none", "tail": "stub", "tailLen": 20, "tailColor": "#A7714A", "eye": 1.0, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g>{Array.from({length: 9}, (_, i) => { const a = h.len * 0.5, b = h.girth * 0.5, ph = (185 + i * 11) * Math.PI / 180; const px = Math.cos(ph) * a, py = h.by + Math.sin(ph) * b; const q1 = Math.cos(ph) / a, q2 = Math.sin(ph) / b, Q = Math.hypot(q1, q2); const dx0 = q1 / Q - 0.3, dy0 = q2 / Q, D = Math.hypot(dx0, dy0), ux = dx0 / D, uy = dy0 / D, w = h.girth * 0.075, Lp = h.girth * 0.27; return <path key={i} d={`M ${px - uy * w} ${py + ux * w} L ${px + ux * Lp} ${py + uy * Lp} L ${px + uy * w} ${py - ux * w} Z`} fill='#5E3B26' />; })}</g>)} />;
}
