import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Skunk (preset of ink-sketch/quadruped): black skunk, white stripe over the back (over), big bushy tail with white tip
const LOOK = {"len": 240, "girth": 135, "leg": 44, "legW": 30, "neck": 24, "neckAngle": 40, "head": 56, "snout": 34, "snoutH": 36, "color": "#25252B", "headColor": "#25252B", "legColor": "#25252B", "feet": "none", "ear": "round", "earSize": 0.7, "earColor": "#25252B", "innerEar": "none", "tail": "bushy", "tailLen": 170, "tailAngle": 30, "tailColor": "#25252B", "tailTip": "#FFFFFF", "eye": 1.1, "nose": "#8E8E96", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<path d={`M ${-h.len * 0.43} ${h.by - h.girth * 0.137} A ${h.len * 0.46} ${h.girth * 0.4} 0 0 1 ${h.len * 0.43} ${h.by - h.girth * 0.137}`} stroke='#FFFFFF' strokeWidth={h.girth * 0.17} strokeLinecap='round' fill='none' />)} />;
}
