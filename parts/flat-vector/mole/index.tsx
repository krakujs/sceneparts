import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Mole (preset of flat-vector/quadruped): dark velvet mole, no ears, tiny eyes, pink nose and paws
const LOOK = {"len": 150, "girth": 118, "leg": 24, "legW": 30, "neck": 4, "neckAngle": 25, "head": 42, "snout": 26, "snoutH": 32, "color": "#3F4350", "headColor": "#3F4350", "legColor": "#3F4350", "feet": "#F27BA6", "ear": "none", "tail": "none", "eye": 0.45, "nose": "#F27BA6", "mouth": "none"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
