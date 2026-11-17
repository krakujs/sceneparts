import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Persian cat (preset of flat-vector/quadruped): round cream body with shaggy chest ruff, flat face, small ears, long fluffy tail, fluffy feet
const LOOK = {"len": 230, "girth": 170, "leg": 78, "legW": 40, "neck": 14, "neckW": 115, "neckAngle": 62, "head": 88, "snout": 8, "snoutH": 52, "ear": "round", "earSize": 0.6, "earColor": "#E8D5B0", "innerEar": "#F2C9B0", "color": "#F4EAD6", "headColor": "#F4EAD6", "belly": "#FBF6EC", "muzzle": "#FBF6EC", "mane": "shag", "maneColor": "#EADBBE", "tail": "bushy", "tailLen": 170, "tailAngle": 18, "tailColor": "#F4EAD6", "fluff": true, "nose": "#E07A93", "eye": 1.3, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
