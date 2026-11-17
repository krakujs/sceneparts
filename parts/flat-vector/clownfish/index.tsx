import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";

// Clownfish (preset of flat-vector/fish): bright orange body, three white bands edged dark, rounded fins
const LOOK = {"len": 120, "bodyH": 74, "shape": "oval", "head": "normal", "color": "#FF7A1F", "belly": "none", "back": "none", "finColor": "#FF7A1F", "tail": "round", "tailSize": 66, "dorsal": "small", "pattern": "bands", "bandColor": "#FFFFFF", "bandEdge": "#1F2433", "eyeSize": 1, "eyeType": "eye", "mouth": "smile", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fish {...q} />;
}
