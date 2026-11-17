import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Pig (preset of flat-vector/quadruped): pink pig: round snout, short legs, curly tail
const LOOK = {"len": 280, "girth": 170, "leg": 80, "legW": 36, "neck": 20, "neckAngle": 40, "neckW": 100, "head": 60, "snout": 40, "snoutH": 46, "headTilt": 0, "ear": "side", "earSize": 0.9, "earColor": "#E58FA7", "color": "#F4A7B9", "belly": "#F4A7B9", "headColor": "#F4A7B9", "muzzle": "#E58FA7", "nose": "#E07A93", "tail": "curly", "tailLen": 80, "tailAngle": 40, "tailColor": "#E58FA7", "eye": 0.9, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
