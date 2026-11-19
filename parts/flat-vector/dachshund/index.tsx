import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Dachshund (preset of flat-vector/quadruped): very long low body, short legs, long narrow snout, floppy ears, red-brown coat
const LOOK = {"len": 400, "girth": 120, "leg": 52, "legW": 28, "neck": 40, "neckAngle": 62, "head": 56, "snout": 88, "snoutH": 36, "headTilt": 8, "ear": "floppy", "earSize": 1, "earColor": "#6E3420", "color": "#A4532E", "headColor": "#A4532E", "tail": "thin", "tailLen": 120, "tailAngle": 55, "tailColor": "#8E4526", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
