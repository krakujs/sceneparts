import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Witch cat: black cat sitting, facing the viewer, wearing a tiny pointed witch hat with a star, green eyes and a curling tail.
// Feet at (0,0); about 720 px tall at s = 1. anim: curl (tail tip curls and sways) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HAT = "M -105 -470 C -60 -500 -20 -560 20 -660 C 40 -710 60 -750 80 -780 C 60 -700 70 -620 105 -470 Z";
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const fur: string = p.color && p.color !== "none" ? p.color : "#22201F";
  const light = shade(fur, -0.35), dark = shade(fur, 0.35);
  const anim: string = p.anim ?? "curl";
  const tipX = 230 + (anim === "curl" ? Math.sin(f * 0.08) * 14 : 0);
  const tipY = -150 + (anim === "curl" ? Math.cos(f * 0.08) * 8 : 0);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={200} ry={18} fill={C.shadow} />
      <path d={`M 110 -40 Q 240 -40 ${tipX} ${tipY}`} stroke={fur} strokeWidth={34} strokeLinecap="round" fill="none" />
      <path d="M -110 0 C -170 -120 -150 -260 0 -270 C 150 -260 170 -120 110 0 Z" fill={fur} />
      <ellipse cx={-50} cy={-6} rx={38} ry={20} fill={dark} />
      <ellipse cx={50} cy={-6} rx={38} ry={20} fill={dark} />
      <path d="M -100 -210 C -80 -160 -80 -120 -90 -90" stroke={light} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M -100 -380 L -105 -470 L -30 -405 Z" fill={fur} />
      <path d="M 100 -380 L 105 -470 L 30 -405 Z" fill={fur} />
      <path d="M -88 -400 L -90 -446 L -50 -412 Z" fill="#3A3F52" />
      <path d="M 88 -400 L 90 -446 L 50 -412 Z" fill="#3A3F52" />
      <circle cx={0} cy={-380} r={115} fill={fur} />
      <ellipse cx={-45} cy={-392} rx={26} ry={18} fill="#5BD67A" />
      <ellipse cx={45} cy={-392} rx={26} ry={18} fill="#5BD67A" />
      <ellipse cx={-45} cy={-392} rx={5} ry={16} fill={C.ink} />
      <ellipse cx={45} cy={-392} rx={5} ry={16} fill={C.ink} />
      <circle cx={-38} cy={-398} r={4} fill="#FFFFFF" />
      <circle cx={52} cy={-398} r={4} fill="#FFFFFF" />
      <path d="M -8 -358 L 8 -358 L 0 -348 Z" fill={C.pink} />
      <path d="M -14 -342 Q -7 -334 0 -342 Q 7 -334 14 -342" stroke="#9AA3B5" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M -30 -350 L -110 -362 M -30 -340 L -110 -336 M 30 -350 L 110 -362 M 30 -340 L 110 -336" stroke="#E6E9F2" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
      <g transform="translate(0 -470) scale(0.72) translate(0 470)">
        <ellipse cx={0} cy={-470} rx={150} ry={34} fill="#5A40A8" />
        <path d={HAT} fill="#5A40A8" />
        <rect x={-100} y={-500} width={200} height={20} fill={C.yellow} />
        <path d="M 30 -600 L 36 -582 L 54 -582 L 40 -571 L 46 -553 L 30 -564 L 14 -553 L 20 -571 L 6 -582 L 24 -582 Z" fill={C.yellow} />
      </g>
    </g>
  );
}
