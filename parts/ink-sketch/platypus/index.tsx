import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Platypus (preset of ink-sketch/quadruped): brown platypus, dark grey flat bill (over), flat tail, no ears
const LOOK = {"len": 210, "girth": 115, "leg": 38, "legW": 28, "neck": 20, "neckAngle": 30, "head": 52, "snout": 0, "snoutH": 36, "headTilt": 0, "color": "#6E4E34", "belly": "#C4A27A", "muzzle": "#6E4E34", "legColor": "#5A3E28", "feet": "#3E2B1E", "ear": "none", "tail": "flat", "tailLen": 130, "tailColor": "#4E3624", "eye": 0.8, "nose": "#4A5060", "mouth": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g transform={`translate(${h.x} ${h.y})`}><path d={`M ${0.4 * h.r} ${-0.04 * h.r} Q ${1.1 * h.r} ${-0.18 * h.r} ${1.45 * h.r} ${0.1 * h.r} Q ${1.5 * h.r} ${0.36 * h.r} ${1.15 * h.r} ${0.36 * h.r} L ${0.45 * h.r} ${0.36 * h.r} Z`} fill='#4A5060' /></g>)} />;
}
