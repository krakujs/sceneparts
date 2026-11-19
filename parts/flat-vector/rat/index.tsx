import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Rat (preset of flat-vector/quadruped): grey-brown rat, pointed snout tilted down, long pink tail
const LOOK = {"len": 210, "girth": 100, "leg": 50, "legW": 20, "neck": 24, "neckAngle": 35, "head": 44, "snout": 62, "snoutH": 26, "headTilt": 12, "color": "#857162", "belly": "#BDB3A6", "ear": "round", "earSize": 0.9, "earColor": "#857162", "innerEar": "#E9A0AE", "tail": "thin", "tailLen": 240, "tailAngle": 12, "tailColor": "#D9A0A8", "nose": "#E07A93", "eye": 0.9, "mouth": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
