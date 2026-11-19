import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Piglet (preset of flat-vector/quadruped): small pink piglet: short snout, big eye, curly tail
const LOOK = {"len": 170, "girth": 110, "leg": 55, "legW": 24, "neck": 14, "neckAngle": 45, "neckW": 70, "head": 46, "snout": 26, "snoutH": 32, "headTilt": 0, "ear": "side", "earSize": 0.9, "earColor": "#E58FA7", "color": "#F7B8C8", "belly": "#F7B8C8", "headColor": "#F7B8C8", "muzzle": "#E58FA7", "nose": "#E07A93", "tail": "curly", "tailLen": 60, "tailAngle": 40, "tailColor": "#E58FA7", "eye": 1.3, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
