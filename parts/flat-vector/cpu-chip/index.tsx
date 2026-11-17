import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Computer processor chip seen from above at a slight angle: square package, metal lid, pins on all four sides.
// Deliberately no screen or stand, so it does not read as a monitor. Origin = bottom centre of the chip's footprint.
// Hero scale: at s = 1 about 380 px across and 380 px tall (the chip floats above y). Use s about 0.3 next to a person.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};
const PINS = [-125, -75, -25, 25, 75, 125];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.navy;
  const lid = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const pin = p.accent && p.accent !== "none" ? p.accent : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const glow = anim === "pulse" ? 0.15 + 0.3 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 45)) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)})`}>
      <ellipse cx={0} cy={-2} rx={190} ry={14} fill={C.shadow} />
      <g transform={`translate(0 -330) ${motion(anim, f)}`}>
        <g transform={`scale(${p.flip ? -s : s} ${s}) rotate(-8)`}>
          <rect x={-170} y={-170} width={340} height={340} rx={40} fill={pin} opacity={glow} />
          {/* pins on all four sides */}
          {PINS.map((px) => (
            <g key={px}>
              <rect x={px - 8} y={-186} width={16} height={36} rx={4} fill={pin} />
              <rect x={px - 8} y={150} width={16} height={36} rx={4} fill={pin} />
              <rect x={-186} y={px - 8} width={36} height={16} rx={4} fill={pin} />
              <rect x={150} y={px - 8} width={36} height={16} rx={4} fill={pin} />
            </g>
          ))}
          {/* package body with a little depth on the lower-right edge */}
          <rect x={-146} y={-140} width={300} height={300} rx={20} fill={shade(body, 0.35)} />
          <rect x={-150} y={-150} width={300} height={300} rx={20} fill={body} />
          {/* metal lid */}
          <rect x={-112} y={-112} width={224} height={224} rx={18} fill={lid} />
          <rect x={-112} y={-112} width={224} height={64} rx={18} fill={C.white} opacity={0.3} />
          <circle cx={-88} cy={-88} r={12} fill={shade(lid, 0.3)} />
          <rect x={-60} y={-20} width={120} height={8} rx={4} fill={shade(lid, 0.2)} />
          <rect x={-60} y={2} width={80} height={8} rx={4} fill={shade(lid, 0.2)} />
          <rect x={-60} y={24} width={100} height={8} rx={4} fill={shade(lid, 0.2)} />
        </g>
      </g>
    </g>
  );
}
