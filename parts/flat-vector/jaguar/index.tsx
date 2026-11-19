import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Jaguar (preset of flat-vector/quadruped): stocky golden body with big dark rosettes, cream belly, round ears.
const LOOK = {"len": 340, "girth": 175, "leg": 110, "legW": 46, "neck": 22, "neckAngle": 55, "head": 72, "snout": 48, "snoutH": 52, "color": "#D9A23E", "belly": "#F5E2B0", "pattern": "rosettes", "patternColor": "#5B3A1E", "ear": "round", "earSize": 0.7, "innerEar": "#8A5A3C", "tail": "thin", "tailLen": 200, "tailAngle": 20, "tailColor": "#D9A23E", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
