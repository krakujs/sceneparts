import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Moose (preset of flat-vector/quadruped): dark brown moose: palmate antlers, long face, shoulder hump, beard dewlap
const LOOK = {"len": 400, "girth": 250, "leg": 250, "legW": 60, "neck": 110, "neckAngle": 35, "neckW": 130, "head": 80, "snout": 120, "snoutH": 80, "headTilt": 15, "hump": "none", "mane": "beard", "maneColor": "#2F2420", "ear": "side", "earSize": 0.8, "earColor": "#5A4032", "innerEar": "#3A2A20", "color": "#5A4032", "legColor": "#4A3428", "hooves": true, "horns": "moose", "hornSize": 1.45, "hornColor": "#C9A97A", "tail": "stub", "tailColor": "#5A4032", "nose": "#1F2433", "mouth": "none", "eye": 0.9, "back": 30};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
