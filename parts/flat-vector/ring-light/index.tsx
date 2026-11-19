import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ring light on a tall tripod with a phone holder in the middle. Thick glowing ring (56 px) with a yellow halo.
// Origin = bottom centre (the floor line). Room scale: at s = 1 about 500 px wide and 920 px tall. Use s about 0.5 for a desk or room scene.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const ring = p.color && p.color !== "none" ? p.color : C.white;
  const stand = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const halo = anim === "pulse" ? 0.25 + 0.2 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 60)) : 0.3;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tripod legs and centre pole */}
        <path d="M0,-220 L-190,0 M0,-220 L190,0 M0,-220 L0,-10" fill="none" stroke={stand} strokeWidth={22} strokeLinecap="round" />
        <rect x={-14} y={-600} width={28} height={390} rx={10} fill={stand} />
        <circle cx={0} cy={-220} r={30} fill={shade(stand, 0.2)} />
        {/* glowing ring: halo, then the lit ring */}
        <circle cx={0} cy={-620} r={230} fill="none" stroke={C.yellow} strokeWidth={120} opacity={halo} />
        <circle cx={0} cy={-620} r={230} fill="none" stroke={ring} strokeWidth={56} />
        <circle cx={0} cy={-620} r={230} fill="none" stroke={C.yellow} strokeWidth={6} opacity={0.6} />
        {/* holder clamp and phone */}
        <rect x={-50} y={-632} width={100} height={26} rx={10} fill={stand} />
        <rect x={-42} y={-692} width={84} height={122} rx={14} fill={C.ink} />
        <rect x={-34} y={-682} width={68} height={102} rx={9} fill={C.skyDeep} />
        <circle cx={-22} cy={-672} r={5} fill={C.greyDark} />
      </g>
    </g>
  );
}
