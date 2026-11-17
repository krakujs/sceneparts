import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Lion (preset of flat-vector/quadruped): golden coat, big brown mane, tufted tail.
const LOOK = {"len": 360, "girth": 150, "leg": 120, "legW": 40, "neck": 50, "neckAngle": 35, "head": 60, "snout": 44, "snoutH": 46, "color": "#D9A441", "muzzle": "#F3DBA0", "mane": "lion", "maneColor": "#7A4A22", "ear": "round", "earSize": 0.7, "earColor": "#D9A441", "innerEar": "#B77F2E", "tail": "tuft", "tailLen": 170, "tailAngle": 30, "tailColor": "#D9A441", "mouth": "smile", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
