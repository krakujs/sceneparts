import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";

// Pufferfish (preset of flat-vector/fish): yellow-tan round body with spots and spines, puffed by default.
const LOOK = {"pose": "puffed", "len": 170, "bodyH": 153, "shape": "round", "head": "normal", "color": "#E8C27A", "belly": "#F8E7B8", "back": "#C9A25E", "finColor": "#D9A94E", "tail": "round", "tailSize": 90, "dorsal": "none", "pattern": "spots", "patternColor": "#9A7434", "spikes": true, "eyeSize": 1, "eyeType": "eye", "mouth": "smile", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fish {...q} />;
}
