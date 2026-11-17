import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Family seen from behind on the sofa (watching TV)
export const SofaBacks: React.FC<{ y?: number; lean?: number }> = ({ y = 1500, lean = 0 }) => (
  <g>
    {[{ x: 300, c: P.green, hair: "bun", s: 1 }, { x: 560, c: "#9CC7E0", hair: "bald", s: 1.05 }, { x: 800, c: P.stripeA, hair: "kid", s: 0.8 }].map((p, i) => (
      <g key={i} transform={`translate(${p.x + lean * (i - 1) * 10} ${y}) scale(${p.s})`}>
        <path d="M -110 0 Q -110 -180 0 -190 Q 110 -180 110 0 Z" fill={p.c} stroke={INK} strokeWidth={SW} />
        <circle cx={0} cy={-250} r={78} fill={P.hair} stroke={INK} strokeWidth={SW} />
        {p.hair === "bun" ? <circle cx={0} cy={-300} r={38} fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
        {p.hair === "bald" ? <ellipse cx={0} cy={-290} rx={45} ry={30} fill={P.skin} /> : null}
      </g>
    ))}
    <rect x={120} y={y - 40} width={840} height={150} rx={40} fill="#7A3B2A" stroke={INK} strokeWidth={SW} />
    <rect x={90} y={y - 140} width={70} height={250} rx={30} fill="#8E4632" stroke={INK} strokeWidth={SW} />
    <rect x={920} y={y - 140} width={70} height={250} rx={30} fill="#8E4632" stroke={INK} strokeWidth={SW} />
  </g>
);

// ---------- gully (street lane, frontal perspective) ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <SofaBacks {...(rest as any)} frame={f} />;
}
