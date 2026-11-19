import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Raccoon (preset of ink-sketch/quadruped): grey raccoon, black eye mask band, bushy tail with dark tip (ringed look)
const LOOK = {"len": 230, "girth": 135, "leg": 56, "legW": 32, "neck": 22, "neckAngle": 50, "head": 58, "snout": 30, "snoutH": 40, "color": "#8E8E96", "belly": "#D9D6D0", "headColor": "#8E8E96", "muzzle": "#E6E3DC", "legColor": "#3A3A42", "feet": "#2A2A30", "ear": "round", "earSize": 0.9, "earColor": "#6E6E76", "innerEar": "#E6E3DC", "mask": "band", "maskColor": "#1F2433", "tail": "bushy", "tailLen": 130, "tailAngle": 25, "tailColor": "#8E8E96", "tailTip": "#1F2433", "eye": 1.1, "nose": "#1F2433", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
