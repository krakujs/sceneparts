import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Gazelle (preset of flat-vector/quadruped): slim light tan gazelle with a dark side band and small curved horns
const LOOK = {"len": 300, "girth": 125, "leg": 230, "legW": 22, "neck": 120, "neckAngle": 66, "neckW": 60, "head": 56, "snout": 56, "snoutH": 38, "headTilt": 15, "ear": "side", "earSize": 0.8, "earColor": "#E3C08C", "innerEar": "#FFFFFF", "color": "#E3C08C", "belly": "#FFFFFF", "horns": "goat", "hornSize": 0.9, "hornColor": "#5E4A3A", "hooves": true, "legColor": "#D2AE78", "tail": "thin", "tailLen": 70, "tailAngle": -20, "tailColor": "#E3C08C", "nose": "#1F2433", "mouth": "none", "eye": 1.1};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<path d={`M ${-h.len * 0.4} ${h.by - h.girth * 0.06} Q 0 ${h.by - h.girth * 0.16} ${h.len * 0.32} ${h.by - h.girth * 0.02} L ${h.len * 0.32} ${h.by + h.girth * 0.06} Q 0 ${h.by + h.girth * 0.02} ${-h.len * 0.4} ${h.by + h.girth * 0.14} Z`} fill="#5E3B26" />)} />;
}
