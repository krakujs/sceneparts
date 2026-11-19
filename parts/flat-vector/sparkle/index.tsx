import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector sparkle cluster: three four-point sparkles with a white die-cut edge, shadow and one darker shade.
// Twinkle comes from p.f only. Centre (x, y), about 450 px wide at s = 1.

const spark = (R: number) => {
  const k = R * 0.16;
  return `M 0 ${-R} Q ${k} ${-k} ${R} 0 Q ${k} ${k} 0 ${R} Q ${-k} ${k} ${-R} 0 Q ${-k} ${-k} 0 ${-R} Z`;
};
const STARS = [
  { x: -30, y: 20, R: 180, ph: 0 },
  { x: 150, y: -140, R: 90, ph: 2 },
  { x: 150, y: 130, R: 62, ph: 4 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "twinkle";
  let dy = 0;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  const sc = (ph: number) => (anim === "twinkle" ? 0.8 + 0.2 * Math.sin(f * 0.22 + ph) : 1);
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k})`}>
      {STARS.map((st, i) => (
        <g key={`e${i}`} transform={`translate(${st.x} ${st.y}) scale(${sc(st.ph)})`}>
          <path d={spark(st.R)} transform="translate(0 16)" fill={C.shadow} stroke={C.shadow} strokeWidth={34} strokeLinejoin="round" />
          <path d={spark(st.R)} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} strokeLinejoin="round" />
        </g>
      ))}
      {STARS.map((st, i) => (
        <g key={`c${i}`} transform={`translate(${st.x} ${st.y}) scale(${sc(st.ph)})`}>
          <path d={spark(st.R)} transform="translate(0 12)" fill={shade(col, 0.18)} />
          <path d={spark(st.R)} fill={col} />
          <circle cx={-st.R * 0.22} cy={-st.R * 0.3} r={st.R * 0.07} fill="#FFFFFF" opacity={0.85} />
        </g>
      ))}
    </g>
  );
}
