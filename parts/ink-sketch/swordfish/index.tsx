import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Fish } from "../fish/index";

// Swordfish (preset of ink-sketch/fish): blue-purple back, silver belly, long sword bill, tall sail dorsal, crescent tail.
const LOOK = {"len": 400, "bodyH": 150, "shape": "torpedo", "head": "bill", "color": "#5B66A0", "belly": "#D8DEEA", "back": "#2F2C6E", "finColor": "#4A4F8E", "tail": "crescent", "tailSize": 170, "dorsal": "sail", "pattern": "none", "eyeSize": 0.9, "eyeType": "dot", "mouth": "closed", "gills": false};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Fish {...q} />;
}
