import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Tiger (preset of flat-vector/quadruped): orange coat with dark stripes, white belly and muzzle, round ears.
const LOOK = {"len": 360, "girth": 160, "leg": 120, "legW": 40, "neck": 40, "neckAngle": 45, "head": 66, "snout": 46, "snoutH": 46, "color": "#EF8A34", "belly": "#FFF4E2", "pattern": "stripes", "patternColor": "#1F2433", "ear": "round", "earSize": 0.75, "innerEar": "#FFF4E2", "tail": "thin", "tailLen": 220, "tailAngle": 25, "tailColor": "#EF8A34", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
