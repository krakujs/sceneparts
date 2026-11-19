import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Coyote (preset of flat-vector/quadruped): lean tawny grey-brown body, sand belly, big pointy ears, bushy tail with dark tip.
const LOOK = {"len": 300, "girth": 115, "leg": 135, "legW": 28, "neck": 36, "neckAngle": 52, "head": 56, "snout": 60, "snoutH": 36, "color": "#A88A66", "belly": "#EAD9B8", "ear": "pointy", "earSize": 1.35, "innerEar": "#E9D3A9", "tail": "bushy", "tailLen": 160, "tailAngle": 18, "tailTip": "#3A3128", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
