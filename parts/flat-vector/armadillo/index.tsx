import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Armadillo (preset of flat-vector/quadruped): grey-brown armadillo: banded shell, small head with pointy ears, thin tail
const LOOK = {"len": 300, "girth": 150, "leg": 70, "legW": 34, "neck": 22, "neckAngle": 40, "neckW": 60, "head": 52, "snout": 52, "snoutH": 40, "headTilt": 10, "ear": "pointy", "earSize": 0.9, "earColor": "#B39B86", "innerEar": "#E9D3A9", "color": "#B39B86", "belly": "#E9D3A9", "headColor": "#B39B86", "legColor": "#9C8571", "feet": "#7A6654", "tail": "thin", "tailLen": 150, "tailAngle": 12, "tailColor": "#9C8571", "nose": "#3A3A42", "mouth": "none", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => (<g fill="none" stroke="#8A7561" strokeWidth={h.girth * 0.045}>{[-0.34, -0.2, -0.06, 0.08, 0.22].map((u, i) => <path key={i} d={`M ${h.len * u} ${h.by - h.girth * 0.48} Q ${h.len * u + 14} ${h.by} ${h.len * u} ${h.by + h.girth * 0.1}`} />)}</g>)} />;
}
