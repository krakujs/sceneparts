import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Wolf (preset of flat-vector/quadruped): grey coat with darker saddle, pale belly and muzzle, pointy ears, longer legs and bushy tail.
const LOOK = {"len": 330, "girth": 130, "leg": 170, "legW": 36, "neck": 46, "neckAngle": 45, "head": 62, "snout": 62, "snoutH": 44, "color": "#8A93A3", "belly": "#EEF0F4", "ear": "pointy", "earSize": 0.95, "innerEar": "#C9CED8", "tail": "bushy", "tailLen": 170, "tailAngle": 12, "tailTip": "#3D4453", "mane": "neck", "maneColor": "#5D6578", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
