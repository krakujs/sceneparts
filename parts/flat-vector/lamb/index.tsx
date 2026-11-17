import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Lamb (preset of flat-vector/quadruped): small white woolly lamb with a pale face, big eyes
const LOOK = {"len": 190, "girth": 120, "leg": 75, "legW": 22, "neck": 28, "neckAngle": 55, "neckW": 56, "head": 48, "snout": 30, "snoutH": 32, "headTilt": 10, "ear": "side", "earSize": 0.7, "earColor": "#E9D9C6", "color": "#FFFFFF", "belly": "#FFFFFF", "pattern": "wool", "headColor": "#F3E3D3", "muzzle": "#F3E3D3", "legColor": "#E9D9C6", "eye": 1.4, "tail": "stub", "tailLen": 20, "tailColor": "#FFFFFF", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
