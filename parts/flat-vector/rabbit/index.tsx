import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Rabbit (preset of flat-vector/quadruped): brown rabbit, long ears with pink inner, white puff tail
const LOOK = {"len": 200, "girth": 110, "leg": 70, "legW": 28, "neck": 22, "neckAngle": 50, "head": 50, "snout": 22, "snoutH": 36, "color": "#A8733F", "belly": "#E9D3A9", "muzzle": "#E9D3A9", "ear": "long", "earSize": 1.1, "innerEar": "#F2A7B8", "tail": "bushy", "tailLen": 60, "tailAngle": 20, "tailColor": "#FFFFFF", "eye": 1.2, "nose": "#E07A93", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
