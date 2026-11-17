import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Reindeer (preset of flat-vector/quadruped): grey-brown reindeer, pale shag neck, big antlers, hooves
const LOOK = {"len": 320, "girth": 170, "leg": 220, "legW": 30, "neck": 120, "neckAngle": 60, "neckW": 110, "head": 66, "snout": 70, "snoutH": 50, "headTilt": 20, "ear": "tiny", "earSize": 1.0, "earColor": "#8C7A6A", "innerEar": "#E6DCCB", "color": "#8C7A6A", "belly": "#B9AC98", "mane": "shag", "maneColor": "#E6DCCB", "legColor": "#7A6A5A", "hooves": true, "horns": "antlers", "hornSize": 1.7, "hornColor": "#7A6246", "tail": "stub", "nose": "#1F2433", "mouth": "none", "eye": 1.0};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} />;
}
