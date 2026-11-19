import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Giraffe (preset of ink-sketch/quadruped): tall tan giraffe with brown patches, ossicones, a neck mane and a tufted tail; back raised
const LOOK = {"len": 300, "girth": 190, "leg": 360, "legW": 40, "neck": 380, "neckAngle": 72, "neckW": 88, "head": 72, "snout": 70, "snoutH": 52, "headTilt": 20, "back": 40, "ear": "side", "earSize": 1.0, "earColor": "#E8B65C", "innerEar": "#F5E2B5", "horns": "ossicones", "mane": "neck", "maneColor": "#6B4226", "pattern": "patches", "patternColor": "#8A5A3C", "color": "#E8B65C", "belly": "#F5E2B5", "tail": "tuft", "tailLen": 170, "tailAngle": -35, "tailColor": "#8A5A3C", "nose": "#3A2A20", "mouth": "smile", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
