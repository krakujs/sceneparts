import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Donkey (preset of flat-vector/quadruped): grey donkey: long ears, pale muzzle, tufted tail
const LOOK = {"len": 300, "girth": 150, "leg": 130, "legW": 30, "neck": 90, "neckAngle": 60, "neckW": 66, "head": 58, "snout": 70, "snoutH": 46, "headTilt": 25, "ear": "long", "earSize": 1.15, "color": "#A4A7AE", "belly": "#D7D9DE", "muzzle": "#EDE9E1", "tail": "tuft", "tailLen": 120, "tailAngle": 30, "tailColor": "#8F939B", "maneColor": "#3F434C", "hooves": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
