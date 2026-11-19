import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Elk (preset of flat-vector/quadruped): tan elk with a dark brown shag neck, big antlers and a pale rump
const LOOK = {"len": 340, "girth": 230, "leg": 230, "legW": 38, "neck": 110, "neckAngle": 60, "neckW": 140, "head": 74, "snout": 80, "snoutH": 56, "headTilt": 25, "ear": "side", "earSize": 0.9, "earColor": "#C8A27A", "innerEar": "#F3E3C8", "color": "#C8A27A", "mane": "shag", "maneColor": "#6B4A32", "legColor": "#7A5A3E", "hooves": true, "horns": "antlers", "hornSize": 1.4, "hornColor": "#6E5440", "tail": "stub", "tailColor": "#F3E3C8", "nose": "#1F2433", "mouth": "smile", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
