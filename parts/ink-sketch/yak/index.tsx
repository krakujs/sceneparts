import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Yak (preset of ink-sketch/quadruped): shaggy dark long-haired yak with short curved horns
const LOOK = {"len": 360, "girth": 220, "leg": 150, "legW": 48, "neck": 60, "neckAngle": 45, "neckW": 130, "head": 66, "snout": 60, "snoutH": 50, "headTilt": 20, "ear": "tiny", "earSize": 1.2, "color": "#3B302A", "belly": "#2C2420", "muzzle": "#8A7A6A", "mane": "shag", "maneColor": "#2C2420", "hump": "shoulder", "horns": "cow", "hornSize": 1.4, "hornColor": "#E9E0CC", "tail": "bushy", "tailLen": 130, "tailAngle": 25, "tailColor": "#2C2420", "fluff": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
