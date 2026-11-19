import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Chihuahua (preset of flat-vector/quadruped): tiny body on thin legs, very large pointy ears, big eyes, tail curled up
const LOOK = {"len": 190, "girth": 104, "leg": 104, "legW": 18, "neck": 26, "neckAngle": 62, "head": 60, "snout": 22, "snoutH": 36, "ear": "pointy", "earSize": 1.7, "earColor": "#D8A866", "innerEar": "#F2C9A0", "color": "#D8A866", "headColor": "#D8A866", "belly": "#F3E1C4", "muzzle": "#F3E1C4", "tail": "thin", "tailLen": 90, "tailAngle": 75, "tailColor": "#D8A866", "eye": 1.45, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
