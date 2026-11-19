import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import BalloonPart from "../balloon/index";

// Five balloons fanned out from one tied knot, with two curly ribbon tails. Origin = the knot.
/* eslint-disable @typescript-eslint/no-explicit-any */
const FAN = [
  { a: -54, color: "#3D6FE0", s: 0.9 },
  { a: -27, color: "#FFC83D", s: 1 },
  { a: 0, color: "#E8503F", s: 1.05 },
  { a: 27, color: "#1FA39A", s: 1 },
  { a: 54, color: "#F27BA6", s: 0.9 },
];

export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1100, s = p.s ?? 1.1, f = p.f ?? 0;
  const ribbon = p.ribbon && p.ribbon !== "none" ? p.ribbon : C.purple;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 10 : 0;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s}) translate(${-x} ${-y})`}>
      {/* curly ribbon tails from the knot, behind the balloons */}
      <path d={`M ${x} ${y} C ${x + 60} ${y + 70} ${x - 60} ${y + 120} ${x + 10} ${y + 190} S ${x + 60} ${y + 290} ${x - 10} ${y + 330}`} fill="none" stroke={ribbon} strokeWidth={9} strokeLinecap="round" />
      <path d={`M ${x} ${y} C ${x - 70} ${y + 60} ${x + 40} ${y + 130} ${x - 30} ${y + 210} S ${x - 80} ${y + 300} ${x - 40} ${y + 360}`} fill="none" stroke={C.purpleDark} strokeWidth={9} strokeLinecap="round" />
      {FAN.map((b, i) => {
        const q: any = { ...p, x, y, s: b.s, color: b.color, anim: anim === "bob" ? "bob" : "none", flip: false, f: f + i * 11 };
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${b.a}) translate(${-x} ${-y})`}>
            <BalloonPart {...q} />
          </g>
        );
      })}
      {/* the knot */}
      <circle cx={x} cy={y} r={14} fill={ribbon} />
    </g>
  );
}

