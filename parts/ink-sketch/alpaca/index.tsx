import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Alpaca (preset of ink-sketch/quadruped): fluffy fawn alpaca: woolly body and head, shorter neck
const LOOK = {"len": 250, "girth": 160, "leg": 110, "legW": 30, "neck": 110, "neckAngle": 65, "neckW": 90, "head": 62, "snout": 34, "snoutH": 40, "headTilt": 10, "ear": "tiny", "earSize": 1.3, "earColor": "#D8B07A", "color": "#D8B07A", "belly": "#EBD2A8", "headColor": "#E2BC85", "pattern": "wool", "mane": "shag", "maneColor": "#EBD2A8", "fluff": true, "tail": "stub", "tailLen": 30, "tailColor": "#D8B07A", "nose": "#3A3340", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
