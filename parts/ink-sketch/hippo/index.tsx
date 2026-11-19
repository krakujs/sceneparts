import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Hippo (preset of ink-sketch/quadruped): huge purple-grey barrel body, short stubby legs, wide snout with pink muzzle, tiny ears
const LOOK = {"len": 340, "girth": 330, "leg": 95, "legW": 92, "neck": 20, "neckAngle": 20, "head": 110, "snout": 100, "snoutH": 130, "headTilt": 0, "ear": "tiny", "earSize": 1.0, "color": "#8D83A6", "muzzle": "#F4A3B8", "legColor": "#7F7698", "feet": "#6E6588", "nose": "#3A3450", "tail": "thin", "tailLen": 70, "tailAngle": 15, "tailColor": "#8D83A6", "mouth": "smile", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
