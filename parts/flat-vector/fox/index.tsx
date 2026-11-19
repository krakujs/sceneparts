import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Red fox (preset of flat-vector/quadruped): orange coat, white chest and muzzle, black socks, big pointy ears, bushy tail with white tip.
const LOOK = {"len": 300, "girth": 130, "leg": 120, "legW": 30, "neck": 30, "neckAngle": 50, "head": 60, "snout": 66, "snoutH": 38, "color": "#E4773A", "belly": "#FFFFFF", "feet": "#1F2433", "ear": "pointy", "earSize": 1.25, "innerEar": "#3A2A24", "tail": "bushy", "tailLen": 190, "tailAngle": 20, "tailTip": "#FFFFFF", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
