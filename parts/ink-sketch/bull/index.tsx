import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Bull (preset of ink-sketch/quadruped): dark brown muscular bull: thick neck, shoulder hump, curved horns
const LOOK = {"len": 380, "girth": 230, "leg": 150, "legW": 54, "neck": 70, "neckAngle": 55, "neckW": 130, "head": 70, "snout": 80, "snoutH": 56, "headTilt": 20, "ear": "side", "earSize": 1.0, "color": "#4A2E1E", "belly": "#3C2517", "muzzle": "#8A6A55", "horns": "bull", "hornSize": 1.1, "hornColor": "#EFE6D2", "hump": "shoulder", "tail": "thin", "tailLen": 130, "tailAngle": 30, "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
