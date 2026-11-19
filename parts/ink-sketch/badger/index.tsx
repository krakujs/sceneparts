import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Badger (preset of ink-sketch/quadruped): grey badger, white head with black eye band and crown stripe (over), short stout legs
const LOOK = {"len": 230, "girth": 145, "leg": 46, "legW": 38, "neck": 18, "neckAngle": 40, "head": 60, "snout": 40, "snoutH": 42, "headTilt": 0, "color": "#8E9096", "belly": "#4A4A52", "headColor": "#F1EFE8", "muzzle": "#F1EFE8", "legColor": "#4A4A52", "feet": "#2C2C33", "ear": "round", "earSize": 0.7, "earColor": "#2C2C33", "innerEar": "none", "mask": "band", "maskColor": "#2C2C33", "tail": "stub", "tailLen": 40, "tailColor": "#8E9096", "eye": 0.9, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g transform={`translate(${h.x} ${h.y})`}><path d={`M ${-0.55 * h.r} ${-0.6 * h.r} Q ${-0.05 * h.r} ${-1.0 * h.r} ${0.45 * h.r} ${-0.62 * h.r}`} stroke='#2C2C33' strokeWidth={h.r * 0.2} strokeLinecap='round' fill='none' /></g>)} />;
}
