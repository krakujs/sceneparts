import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sleeveless A-line dress with a scoop neck, fitted waist, belt and dotted skirt, on a wooden coat hanger.
// Origin = bottom centre: the hem rests on y, the hook is the highest point. About 500 px wide and 690 px tall
// at s = 1. anim "sway": the dress swings gently from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";
const DOTS: [number, number][] = [[-150, -150], [-60, -110], [40, -150], [130, -110], [-110, -60], [0, -50], [100, -40], [-170, -30], [170, -30], [-40, -20]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const fabric = p.color && p.color !== "none" ? p.color : C.pink;
  const belt = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={250} ry={14} fill={C.shadow} />
      {/* hanger, behind the garment */}
      <path d="M 0 -600 L 0 -636 Q 0 -684 30 -684 Q 52 -684 46 -660" stroke={WOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -150 -432 L 0 -600 L 150 -432" stroke={WOOD} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`rotate(${f1(sw)} 0 -600)`}>
        {/* bodice and A-line skirt in one shape */}
        <path d="M -110 -440 L 110 -440 Q 122 -330 112 -250 Q 190 -150 250 -10 Q 0 24 -250 -10 Q -190 -150 -112 -250 Q -122 -330 -110 -440 Z" fill={fabric} />
        {/* shaded side for depth */}
        <path d="M 60 -250 Q 190 -150 250 -10 Q 150 4 110 -8 Q 120 -120 60 -250 Z" fill={shade(fabric, 0.15)} opacity={0.6} />
        {/* scoop neckline */}
        <path d="M -62 -440 Q 0 -380 62 -440" stroke={shade(fabric, 0.3)} strokeWidth={10} fill="none" strokeLinecap="round" />
        {/* dots on the skirt */}
        {DOTS.map(([dx, dy]) => <circle key={dx + "_" + dy} cx={dx} cy={dy} r={10} fill={shade(fabric, 0.2)} opacity={0.7} />)}
        {/* belt with a small bow */}
        <path d="M -116 -262 L 116 -262 L 120 -226 L -120 -226 Z" fill={belt} />
        <path d="M -20 -244 Q -56 -280 -70 -240 Q -56 -210 -20 -230 Z M 20 -244 Q 56 -280 70 -240 Q 56 -210 20 -230 Z" fill={shade(belt, 0.15)} />
        {/* hem band */}
        <path d="M -250 -10 Q 0 24 250 -10 L 246 -36 Q 0 -2 -246 -36 Z" fill={shade(fabric, 0.12)} />
      </g>
    </g>
  );
}
