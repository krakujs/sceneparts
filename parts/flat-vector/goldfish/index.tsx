import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";

// Goldfish (preset of flat-vector/fish): orange-gold round body with a flowing double tail
const LOOK = {"len": 120, "bodyH": 90, "shape": "round", "head": "normal", "color": "#F8A23A", "belly": "#FFD27A", "back": "#E97E24", "finColor": "#FF8A3A", "tail": "double", "tailSize": 100, "dorsal": "small", "pattern": "none", "eyeSize": 1.1, "eyeType": "eye", "mouth": "open", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fish {...q} />;
}
