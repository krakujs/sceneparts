import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Giant panda (preset of flat-vector/quadruped): white body, black legs and ears, black eye patches, shoulder hump, stub tail.
const LOOK = {"len": 320, "girth": 190, "hump": "shoulder", "leg": 110, "legW": 52, "neck": 26, "neckAngle": 50, "head": 66, "snout": 36, "snoutH": 44, "color": "#FFFFFF", "legColor": "#22262F", "belly": "#EEF1F5", "ear": "round", "earSize": 0.85, "earColor": "#22262F", "innerEar": "none", "mask": "patches", "maskColor": "#22262F", "tail": "stub", "tailColor": "#22262F", "nose": "#22262F", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
