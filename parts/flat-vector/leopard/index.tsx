import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Leopard (preset of flat-vector/quadruped): golden coat with dark rosettes, cream belly, long thin tail.
const LOOK = {"len": 340, "girth": 135, "leg": 130, "legW": 32, "neck": 36, "neckAngle": 50, "head": 62, "snout": 44, "snoutH": 42, "color": "#E0A84F", "belly": "#F6E6C2", "pattern": "rosettes", "patternColor": "#3E2A18", "ear": "round", "earSize": 0.75, "innerEar": "#F6E6C2", "tail": "thin", "tailLen": 240, "tailAngle": 25, "tailColor": "#E0A84F", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
