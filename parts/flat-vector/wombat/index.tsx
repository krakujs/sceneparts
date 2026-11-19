import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Wombat (preset of flat-vector/quadruped): stocky brown body, short legs, small round ears, no tail.
const LOOK = {"len": 280, "girth": 200, "leg": 50, "legW": 60, "neck": 4, "neckAngle": 40, "head": 66, "snout": 30, "snoutH": 52, "color": "#8C6B4E", "legColor": "#6E5139", "ear": "round", "earSize": 0.55, "earColor": "#7A5B41", "innerEar": "none", "tail": "none", "nose": "#1F2433", "mouth": "smile", "eye": 0.7};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
