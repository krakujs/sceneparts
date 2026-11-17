import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blank roadside billboard on two A-frame legs: a framed panel with no artwork, a cross brace, and a railed catwalk
// under the panel with three lamps on top. Origin = bottom centre; the leg feet stand on y.
// About 940 px wide and 1100 px tall at s = 1.
// anim "lights": the three lamps on top glow on one after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const face = p.color && p.color !== "none" ? p.color : C.yellow;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const litIndex = Math.floor(f / 10) % 3;
  const lamps = [-300, 0, 300];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={500} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* legs and brace */}
        <path d="M -330 -540 L -292 -540 L -190 0 L -230 0 Z" fill={frame} />
        <path d="M 330 -540 L 292 -540 L 190 0 L 230 0 Z" fill={frame} />
        <rect x={-250} y={-300} width={500} height={14} fill={frame} />
        <rect x={-260} y={-20} width={70} height={20} rx={6} fill={C.greyDark} />
        <rect x={190} y={-20} width={70} height={20} rx={6} fill={C.greyDark} />
        {/* blank panel */}
        <rect x={-470} y={-1060} width={940} height={460} rx={16} fill={frame} />
        <rect x={-450} y={-1040} width={900} height={420} rx={10} fill={face} />
        <rect x={-450} y={-1040} width={900} height={10} rx={5} fill={shade(face, 0.12)} />
        {/* catwalk: deck, railing and posts */}
        <rect x={-420} y={-560} width={840} height={22} rx={6} fill={frame} />
        <rect x={-420} y={-630} width={840} height={10} rx={4} fill={frame} />
        {[-420, -210, 0, 210, 420].map((px) => (
          <rect key={px} x={px - 5} y={-632} width={10} height={74} fill={frame} />
        ))}
        {/* lamps on top of the panel */}
        {lamps.map((lx, i) => (
          <g key={lx}>
            <path d={`M ${lx - 44} -1060 L ${lx - 30} -1090 L ${lx + 30} -1090 L ${lx + 44} -1060 Z`} fill={frame} />
            <rect x={lx - 34} y={-1094} width={68} height={8} rx={4}
              fill={anim === "lights" && litIndex === i ? C.yellow : C.greyLight} />
          </g>
        ))}
      </g>
    </g>
  );
}
