import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Camel (preset of flat-vector/quadruped): sandy dromedary: one hump, long neck, small head
const LOOK = {"len": 380, "girth": 170, "leg": 230, "legW": 36, "neck": 170, "neckAngle": 65, "neckW": 60, "head": 48, "snout": 60, "snoutH": 34, "headTilt": 15, "ear": "tiny", "earSize": 1.0, "color": "#C9A06A", "muzzle": "#D8B07E", "hump": "one", "tail": "tuft", "tailLen": 80, "tailAngle": 30, "tailColor": "#A97E4E", "maneColor": "#6B4E33", "feet": "#6B4E33", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
