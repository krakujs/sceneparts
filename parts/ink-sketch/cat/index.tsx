import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Cat (preset of ink-sketch/quadruped): ginger tabby house cat: pointy ears, stripes, tail held up
const LOOK = {"len": 230, "girth": 110, "leg": 90, "legW": 24, "neck": 18, "neckAngle": 45, "head": 56, "snout": 10, "snoutH": 34, "ear": "pointy", "earSize": 1.0, "innerEar": "#F5B7AE", "eye": 1.1, "tail": "thin", "tailLen": 150, "tailAngle": 70, "color": "#EE9440", "belly": "#FBE7C6", "pattern": "stripes", "patternColor": "#C86A24", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
