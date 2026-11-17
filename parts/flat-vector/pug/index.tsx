import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Pug (preset of flat-vector/quadruped): round compact body, big round head, black flat muzzle and eye patches, small black ears, curly tail
const LOOK = {"len": 230, "girth": 175, "leg": 78, "legW": 40, "neck": 16, "neckW": 110, "neckAngle": 62, "head": 82, "snout": 20, "snoutH": 62, "ear": "tiny", "earSize": 1.3, "earColor": "#2F2A26", "color": "#D9A96E", "headColor": "#D9A96E", "muzzle": "#2F2A26", "mask": "patches", "maskColor": "#2F2A26", "tail": "curly", "tailColor": "#D9A96E", "tailLen": 120, "tailAngle": 40, "eye": 1.15, "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
