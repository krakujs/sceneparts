import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Earth globe: blue planet with green generic land blobs, white cloud wisps and a soft rim light.
// Origin = globe centre. About 800 px across at s = 1. anim spin drifts land and clouds across the disc; float bobs it.
const f1 = (v: number) => v.toFixed(1);
const R = 380;
const LAND = [
  "M -270 -120 C -210 -200 -90 -190 -70 -120 C -50 -60 -120 -20 -190 -40 C -240 -50 -290 -80 -270 -120 Z",
  "M 60 60 C 120 20 220 40 240 110 C 260 180 200 230 130 210 C 80 200 40 150 60 60 Z",
  "M -40 -250 C 20 -290 110 -270 120 -220 C 90 -190 30 -180 -40 -250 Z",
  "M 150 -150 C 180 -190 240 -180 250 -140 C 230 -110 190 -105 150 -150 Z",
];
const CLOUDS: [number, number, number][] = [[-130, 150, 120], [130, -60, 110], [-40, -200, 85], [150, 210, 80]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const sea = p.color && p.color !== "none" ? p.color : C.blue;
  const land = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const drift = anim === "spin" ? (f * 1.5) % 760 : 0;
  const lift = anim === "float" ? Math.sin((f * 2 * Math.PI) / 90) * 14 : 0;
  const copies = anim === "spin" ? [-760, 0, 760] : [0];
  const features = (
    <g>
      {LAND.map((d, i) => <path key={`l${i}`} d={d} fill={land} />)}
      {CLOUDS.map(([cx, cy, rx], i) => (
        <g key={`c${i}`}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.24} fill={C.white} opacity={0.92} />
          <ellipse cx={cx - rx * 0.35} cy={cy - rx * 0.2} rx={rx * 0.5} ry={rx * 0.16} fill={C.white} opacity={0.92} />
        </g>
      ))}
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y + lift)}) scale(${p.flip ? -s : s} ${s})`}>
      <circle cx={0} cy={0} r={R + 16} fill={C.skyDeep} opacity={0.45} />
      <defs>
        <clipPath id="sp-earth-disc"><circle cx={0} cy={0} r={R} /></clipPath>
      </defs>
      <circle cx={0} cy={0} r={R} fill={sea} />
      <g clipPath="url(#sp-earth-disc)">
        {copies.map((o) => <g key={o} transform={`translate(${f1(o + drift)} 0)`}>{features}</g>)}
        <circle cx={130} cy={90} r={R} fill={shade(sea, 0.35)} opacity={0.4} />
        <ellipse cx={-150} cy={-170} rx={220} ry={140} fill={C.white} opacity={0.12} transform="rotate(-30 -150 -170)" />
      </g>
    </g>
  );
}
