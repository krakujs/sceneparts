import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Ox (preset of flat-vector/quadruped): big tan draft ox with long horns
const LOOK = {"len": 400, "girth": 230, "leg": 170, "legW": 50, "neck": 70, "neckAngle": 50, "neckW": 120, "head": 70, "snout": 80, "snoutH": 56, "headTilt": 20, "ear": "side", "earSize": 1.0, "color": "#C89A62", "belly": "#E4C79A", "muzzle": "#E4C79A", "horns": "bull", "hornSize": 1.2, "hornColor": "#F2EBDA", "tail": "tuft", "tailLen": 150, "tailAngle": 25, "maneColor": "#5E3B26", "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
