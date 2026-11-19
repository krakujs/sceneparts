import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";

// Shark (preset of ink-sketch/fish): grey torpedo body, white belly, tall dorsal fin, crescent tail, gill slits, closed mouth
const LOOK = {"len": 560, "bodyH": 150, "shape": "torpedo", "head": "normal", "color": "#8D99A6", "belly": "#F4F6F8", "back": "#616D7A", "finColor": "#6E7A88", "tail": "crescent", "tailSize": 200, "dorsal": "tall", "pattern": "none", "eyeSize": 0.8, "eyeType": "dot", "mouth": "closed", "gills": true};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fish {...q} />;
}
