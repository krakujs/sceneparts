import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Giant anteater (preset of flat-vector/quadruped): grey anteater with a long thin snout, black diagonal stripe and a bushy tail
const LOOK = {"len": 320, "girth": 180, "leg": 130, "legW": 40, "neck": 60, "neckAngle": 40, "neckW": 110, "head": 70, "snout": 190, "snoutH": 44, "headTilt": 30, "ear": "tiny", "earSize": 0.8, "earColor": "#A39A8E", "innerEar": "#7D7468", "color": "#A39A8E", "muzzle": "#8D8479", "legColor": "#8D8479", "feet": "#4A4F5E", "tail": "bushy", "tailLen": 260, "tailAngle": 15, "tailColor": "#6B6F7C", "tailTip": "#2A2F3D", "nose": "#1F2433", "mouth": "none", "eye": 0.8};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<path d={`M ${h.len * 0.18} ${h.by - h.girth * 0.38} Q ${h.len * 0.02} ${h.by} ${-h.len * 0.14} ${h.by + h.girth * 0.38}`} stroke="#1F2433" strokeWidth={h.girth * 0.12} strokeLinecap="round" fill="none" />)} />;
}
