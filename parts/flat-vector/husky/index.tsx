import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Husky (preset of flat-vector/quadruped): grey coat, white face blaze and muzzle, white chest and socks, pointy ears, curled-up bushy tail
const LOOK = {"len": 310, "girth": 140, "leg": 120, "legW": 34, "neck": 36, "neckAngle": 60, "head": 64, "snout": 48, "snoutH": 44, "ear": "pointy", "earSize": 1.15, "earColor": "#6F7889", "innerEar": "#F5F2EC", "color": "#8C94A3", "headColor": "#8C94A3", "belly": "#F7F5F0", "muzzle": "#F7F5F0", "pattern": "blaze", "feet": "#F7F5F0", "tail": "bushy", "tailLen": 130, "tailAngle": 72, "tailColor": "#8C94A3", "tailTip": "#F7F5F0", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
