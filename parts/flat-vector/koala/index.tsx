import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Koala (preset of flat-vector/quadruped): grey fluffy koala, big round white-lined ears, large dark nose, no tail, sits by default.
const LOOK = {"len": 190, "girth": 200, "leg": 60, "legW": 50, "neck": 0, "neckAngle": 60, "head": 80, "snout": 22, "snoutH": 50, "color": "#A7ADB9", "legColor": "#8F96A3", "belly": "#E3E5EA", "ear": "round", "earSize": 1.35, "earColor": "#A7ADB9", "innerEar": "#F3F1EC", "tail": "none", "nose": "#1F2433", "mouth": "smile", "eye": 0.9};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => ((() => {
  const r = h.r, sn = 24, sh = 46, snx = r * 0.55 + sn * 0.5, srx = sn * 0.5 + r * 0.3, sny = r * 0.25, sry = sh / 2;
  const a = (p.pose === 'graze' ? 25 : 0) * Math.PI / 180; const R = (x: number, y: number) => [h.x + x * Math.cos(a) - y * Math.sin(a), h.y + x * Math.sin(a) + y * Math.cos(a)];
  const c = R(snx + srx - r * 0.12, sny - sry * 0.25);
  return <ellipse cx={c[0]} cy={c[1]} rx={r * 0.22} ry={r * 0.17} fill='#1F2433' />;
})())} />;
}
