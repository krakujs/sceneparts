import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Lioness (preset of ink-sketch/quadruped): lean golden body, no mane, tufted tail, sand belly.
const LOOK = {"len": 340, "girth": 125, "leg": 130, "legW": 34, "neck": 36, "neckAngle": 50, "head": 56, "snout": 44, "snoutH": 40, "color": "#DDA85A", "belly": "#F2D9A2", "ear": "round", "earSize": 0.7, "innerEar": "#B98446", "mane": "none", "tail": "tuft", "tailLen": 200, "tailAngle": 25, "tailColor": "#DDA85A", "maneColor": "#8E5C2A", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
