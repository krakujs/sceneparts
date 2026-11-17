import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Dog (preset of flat-vector/quadruped): medium tan dog, cream belly and muzzle, floppy ears, tongue out.
const LOOK = {"len": 300, "girth": 140, "leg": 120, "legW": 34, "neck": 30, "neckAngle": 60, "head": 66, "snout": 50, "ear": "floppy", "tail": "thin", "tailLen": 110, "tailAngle": 40, "color": "#C99A62", "belly": "#F3E3C8", "mouth": "tongue"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
