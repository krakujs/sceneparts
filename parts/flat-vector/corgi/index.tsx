import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Corgi (preset of flat-vector/quadruped): orange body, white legs, chest and muzzle with white face blaze, big upright ears, stub tail
const LOOK = {"len": 300, "girth": 130, "leg": 72, "legW": 32, "neck": 32, "neckAngle": 60, "head": 66, "snout": 46, "snoutH": 52, "ear": "pointy", "earSize": 1.25, "earColor": "#E88A3A", "innerEar": "#FBF6EE", "color": "#E88A3A", "headColor": "#E88A3A", "belly": "#FBF6EE", "muzzle": "#FBF6EE", "legColor": "#FBF6EE", "pattern": "blaze", "tail": "stub", "mouth": "smile"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
