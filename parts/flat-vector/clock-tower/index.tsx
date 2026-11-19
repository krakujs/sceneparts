import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall stone clock tower, front view: a plain shaft with a cornice, a round clock face with twelve markers and hour and
// minute hands, two arched windows, an arched door and a pointed spire with a ball tip. Origin = bottom centre; the
// plinth stands on y. About 460 px wide and 1340 px tall at s = 1.
// The hands always turn with the frame number f (the minute hand turns 6 degrees a frame, the hour hand 0.5).
// anim "lights": the two windows light up one after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
// Arched opening with its bottom on yb.
const arch = (cx: number, w: number, yb: number, h: number) => {
  const r = w / 2;
  return `M ${cx - r} ${yb} L ${cx - r} ${yb - h + r} A ${r} ${r} 0 0 1 ${cx + r} ${yb - h + r} L ${cx + r} ${yb} Z`;
};
const CY = -800; // clock face centre height

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.sand;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const litIndex = Math.floor(f / 12) % 2;
  const minute = f * 6, hour = f * 0.5;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-240} y={-50} width={480} height={50} rx={8} fill={C.greyDark} />
        {/* shaft */}
        <rect x={-190} y={-1000} width={380} height={950} fill={stone} />
        <rect x={-190} y={-1000} width={24} height={950} fill={shade(stone, 0.12)} />
        <rect x={166} y={-1000} width={24} height={950} fill={shade(stone, 0.12)} />
        <rect x={-190} y={-460} width={380} height={8} fill={shade(stone, 0.12)} />
        <rect x={-190} y={-300} width={380} height={8} fill={shade(stone, 0.12)} />
        {/* cornice and spire */}
        <rect x={-210} y={-1010} width={420} height={24} rx={8} fill={shade(stone, 0.2)} />
        <rect x={-220} y={-1040} width={440} height={34} rx={10} fill={shade(stone, 0.2)} />
        <path d="M -200 -1040 L 0 -1330 L 200 -1040 Z" fill={roof} />
        <path d="M 0 -1330 L 200 -1040 L 110 -1040 Z" fill={shade(roof, 0.18)} />
        <circle cx={0} cy={-1342} r={14} fill={C.yellow} />
        {/* clock face */}
        <circle cx={0} cy={CY} r={152} fill={C.greyDark} />
        <circle cx={0} cy={CY} r={140} fill={C.white} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-6} y={CY - 130} width={12} height={22} rx={3} fill={C.ink}
            transform={`rotate(${i * 30} 0 ${CY})`} />
        ))}
        <g transform={`rotate(${f1(hour)} 0 ${CY})`}>
          <rect x={-10} y={CY - 92} width={20} height={102} rx={9} fill={C.ink} />
        </g>
        <g transform={`rotate(${f1(minute)} 0 ${CY})`}>
          <rect x={-7} y={CY - 124} width={14} height={134} rx={7} fill={C.ink} />
        </g>
        <circle cx={0} cy={CY} r={12} fill={C.yellow} />
        {/* door and windows */}
        {[-90, 90].map((wx, i) => (
          <path key={wx} d={arch(wx, 56, -560, 140)}
            fill={anim === "lights" && litIndex === i ? C.yellow : C.inkSoft} />
        ))}
        <path d={arch(0, 110, -50, 170)} fill={C.brownDark} />
      </g>
    </g>
  );
}
