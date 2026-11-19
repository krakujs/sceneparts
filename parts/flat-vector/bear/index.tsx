import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Brown bear (preset of flat-vector/quadruped): stocky brown bear with shoulder hump, small round ears, lighter muzzle and a stub tail.
const LOOK = {"len": 330, "girth": 220, "leg": 110, "legW": 58, "neck": 20, "neckAngle": 50, "head": 70, "snout": 44, "snoutH": 52, "color": "#7B4F2E", "muzzle": "#B58A62", "hump": "shoulder", "ear": "round", "earSize": 0.8, "innerEar": "#B07A52", "tail": "stub", "tailColor": "#7B4F2E", "mouth": "smile", "eye": 0.85};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
