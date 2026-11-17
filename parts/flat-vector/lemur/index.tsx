import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Ring-tailed lemur (preset of flat-vector/quadruped): grey lemur with a white face, dark eye patches and a long ringed tail held up
const LOOK = {"len": 230, "girth": 130, "leg": 130, "legW": 24, "neck": 26, "neckAngle": 60, "neckW": 70, "head": 60, "snout": 28, "snoutH": 44, "headTilt": 10, "ear": "round", "earSize": 0.9, "earColor": "#F4F1EA", "innerEar": "#C9CED8", "color": "#A9AFBD", "headColor": "#F4F1EA", "belly": "#F4F1EA", "muzzle": "#F4F1EA", "mask": "patches", "maskColor": "#2A2F3D", "legColor": "#A9AFBD", "feet": "#8A90A0", "tail": "none", "nose": "#1F2433", "mouth": "none", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g fill="none" strokeLinecap="butt"><path d={`M ${-h.len * 0.5} ${h.by - h.girth * 0.18} Q ${-h.len * 0.72} ${h.by - h.girth * 1.2} ${-h.len * 0.95} ${h.by - h.girth * 2.6}`} stroke="#2A2F3D" strokeWidth={26} /><path d={`M ${-h.len * 0.5} ${h.by - h.girth * 0.18} Q ${-h.len * 0.72} ${h.by - h.girth * 1.2} ${-h.len * 0.95} ${h.by - h.girth * 2.6}`} stroke="#F4F1EA" strokeWidth={26} strokeDasharray="24 24" /></g>)} />;
}
