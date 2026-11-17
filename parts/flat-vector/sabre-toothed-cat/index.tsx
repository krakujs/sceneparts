import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Quadruped } from "../quadruped/index";

// Sabre-toothed cat (preset of flat-vector/quadruped): prehistoric tan big cat, short tail, no stripes, two long white fangs (over).
const LOOK = {"len": 380, "girth": 150, "leg": 115, "legW": 44, "neck": 36, "neckAngle": 50, "head": 62, "snout": 56, "snoutH": 40, "color": "#CDA271", "legColor": "#B98B5A", "belly": "#EBD2A6", "ear": "pointy", "earSize": 0.8, "innerEar": "#E8C8A0", "tail": "thin", "tailLen": 100, "tailAngle": 15, "tailColor": "#CDA271", "mouth": "open"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  return <Quadruped {...q} over={(h: any) => ((() => {
  const r = h.r, sn = 56, sh = 40, snx = r * 0.55 + sn * 0.5, srx = sn * 0.5 + r * 0.3, sny = r * 0.25, sry = sh / 2;
  const a = (p.pose === 'graze' ? 25 : 0) * Math.PI / 180; const R = (x: number, y: number) => [h.x + x * Math.cos(a) - y * Math.sin(a), h.y + x * Math.sin(a) + y * Math.cos(a)];
  const fang = (fx: number) => {
    const b1 = R(fx - r * 0.13, sny - sry * 0.1), b2 = R(fx + r * 0.13, sny - sry * 0.1), tp = R(fx + r * 0.0, sny + sry + r * 0.8);
    return <path d={`M ${b1[0]} ${b1[1]} L ${tp[0]} ${tp[1]} L ${b2[0]} ${b2[1]} Z`} fill='#FFFFFF' />;
  };
  return <g>{fang(snx + srx * 0.4)}{fang(snx + srx * 0.78)}</g>;
})())} />;
}
