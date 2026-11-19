import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Snow leopard (preset of flat-vector/quadruped): pale grey coat with grey rosettes, very thick long tail with dark tip, small round ears.
const LOOK = {"len": 340, "girth": 150, "leg": 105, "legW": 40, "neck": 26, "neckAngle": 50, "head": 60, "snout": 40, "snoutH": 42, "color": "#D5DBE3", "belly": "#EEF1F5", "pattern": "rosettes", "patternColor": "#8D96A6", "ear": "round", "earSize": 0.65, "innerEar": "#B9C0CC", "tail": "bushy", "tailLen": 220, "tailAngle": 12, "tailColor": "#D5DBE3", "tailTip": "#8D96A6", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
