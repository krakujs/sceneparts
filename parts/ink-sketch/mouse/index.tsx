import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Mouse (preset of ink-sketch/quadruped): small grey mouse, big round ears with pink inner, long thin pink tail
const LOOK = {"len": 115, "girth": 62, "leg": 28, "legW": 12, "neck": 10, "neckAngle": 40, "head": 34, "snout": 18, "snoutH": 20, "color": "#9AA3B5", "belly": "#DDE2EA", "ear": "round", "earSize": 1.5, "earColor": "#9AA3B5", "innerEar": "#F27BA6", "tail": "thin", "tailLen": 150, "tailAngle": 10, "tailColor": "#F27BA6", "nose": "#F27BA6", "eye": 1.2, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
