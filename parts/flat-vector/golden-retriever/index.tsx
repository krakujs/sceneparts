import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Golden retriever (preset of flat-vector/quadruped): light golden coat, feathered chest and bushy plume tail, floppy ears
const LOOK = {"len": 320, "girth": 150, "leg": 115, "legW": 34, "neck": 36, "neckAngle": 58, "head": 70, "snout": 44, "snoutH": 48, "ear": "floppy", "earSize": 1, "earColor": "#B07A36", "color": "#E8B456", "belly": "#F6DB94", "headColor": "#E8B456", "muzzle": "#F6DB94", "mane": "shag", "maneColor": "#D9A040", "tail": "bushy", "tailLen": 140, "tailAngle": 28, "tailColor": "#E8B456", "fluff": true, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
