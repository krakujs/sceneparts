import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mushroom creature: walking mushroom with an orange cap with cream spots, a stem body with a face and leaf arms.
// Feet at (0,0); about 720 px tall at s = 1. anim: walk (little steps and bob) | wave (leaf waves) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const CAP = "M -270 -420 C -280 -640 280 -640 270 -420 C 240 -380 -240 -380 -270 -420 Z";
const STEM = "M -120 -420 C -130 -300 -120 -150 -150 -70 L 150 -70 C 120 -150 130 -300 120 -420 Z";
const SPOTS: [number, number, number][] = [[-120, -540, 40], [40, -600, 46], [150, -520, 30], [-200, -470, 24], [10, -500, 22]];
const LEAF = "M 0 0 C 40 -40 120 -40 170 0 C 120 40 40 40 0 0 Z";

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const cap: string = p.color && p.color !== "none" ? p.color : "#FF8A3D";
  const capD = shade(cap, 0.2), stem = "#FFF1DA", stemD = shade(stem, 0.12), leaf = "#4BB46A", leafD = shade(leaf, 0.2);
  const anim: string = p.anim ?? "walk";
  const step = anim === "walk" ? Math.sin(f * 0.2) * 12 : 0;
  const bob = anim === "walk" ? Math.abs(Math.sin(f * 0.2)) * -5 : 0;
  const wave = anim === "wave" ? Math.sin(f * 0.25) * 18 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={190} ry={18} fill={C.shadow} />
      <ellipse cx={-60 + step} cy={-14} rx={46} ry={16} fill="#E0B98A" />
      <ellipse cx={60 - step} cy={-14} rx={46} ry={18} fill="#E0B98A" />
      <g transform={`translate(0 ${bob})`}>
        <g transform="translate(-115 -250) rotate(200)">
          <path d={LEAF} fill={leaf} />
          <path d="M 10 0 L 130 0" stroke={leafD} strokeWidth={5} />
        </g>
        <path d={STEM} fill={stem} />
        <path d="M 60 -400 C 70 -300 60 -150 90 -80 L 150 -70 C 120 -150 130 -300 120 -420 Z" fill={stemD} opacity={0.5} />
        <path d={CAP} fill={cap} />
        <path d="M -270 -420 C -240 -380 240 -380 270 -420 C 240 -400 -240 -400 -270 -420 Z" fill={capD} />
        {SPOTS.map(([sx, sy, r], i) => <circle key={i} cx={sx} cy={sy} r={r} fill="#FFF1DA" />)}
        <g transform={`translate(${wave} 0)`}>
          <g transform="translate(115 -250) rotate(-20)">
            <path d={LEAF} fill={leaf} />
            <path d="M 10 0 L 130 0" stroke={leafD} strokeWidth={5} />
          </g>
        </g>
        <circle cx={-45} cy={-290} r={22} fill={C.ink} />
        <circle cx={45} cy={-290} r={22} fill={C.ink} />
        <circle cx={-40} cy={-296} r={5} fill="#FFFFFF" />
        <circle cx={50} cy={-296} r={5} fill="#FFFFFF" />
        <circle cx={-90} cy={-260} r={20} fill={C.pink} opacity={0.6} />
        <circle cx={90} cy={-260} r={20} fill={C.pink} opacity={0.6} />
        <path d="M -26 -240 Q 0 -215 26 -240" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
