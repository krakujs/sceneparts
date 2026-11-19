import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Bulldog (preset of flat-vector/quadruped): wide barrel chest, short legs, flat wide muzzle, small round ears, stub tail, white chest and muzzle
const LOOK = {"len": 270, "girth": 200, "leg": 84, "legW": 46, "neck": 12, "neckW": 130, "neckAngle": 60, "head": 80, "snout": 22, "snoutH": 66, "ear": "round", "earSize": 0.7, "earColor": "#B8743E", "color": "#D7A36A", "headColor": "#D7A36A", "belly": "#FBF4E6", "muzzle": "#FBF4E6", "feet": "#FBF4E6", "tail": "stub", "eye": 1.1, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g stroke="#8A5A3C" strokeWidth={h.r*0.05} strokeLinecap="round" fill="none"><path d={`M ${h.x - h.r*0.5} ${h.y - h.r*0.62} q ${h.r*0.2} ${-h.r*0.1} ${h.r*0.4} 0`} /><path d={`M ${h.x - h.r*0.4} ${h.y - h.r*0.8} q ${h.r*0.2} ${-h.r*0.08} ${h.r*0.4} 0`} /></g>)} />;
}
