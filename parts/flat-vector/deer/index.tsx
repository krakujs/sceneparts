import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Deer (preset of flat-vector/quadruped): red-brown deer with antlers, pale belly and a short pale tail
const LOOK = {"len": 300, "girth": 150, "leg": 210, "legW": 28, "neck": 120, "neckAngle": 62, "neckW": 62, "head": 60, "snout": 60, "snoutH": 42, "headTilt": 25, "ear": "side", "earSize": 1.1, "earColor": "#A8643A", "innerEar": "#F3E3C8", "color": "#A8643A", "belly": "#F3E3C8", "legColor": "#7A4A2C", "hooves": true, "horns": "antlers", "hornSize": 1.1, "hornColor": "#6E5440", "tail": "thin", "tailLen": 50, "tailAngle": 15, "tailColor": "#F3E3C8", "nose": "#1F2433", "mouth": "none", "eye": 1.1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
