import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall power socket: a plate with two round holes, two screws and a small pilot light. anim "pilot" pulses the
// light. Wall item: centred on (x, y), default y 760, no ground shadow.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(Math.min(1, Math.max(0, f / 20)))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(c, 0.12);
  const pilot = p.anim === "pilot" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50)) : 1;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim === "pilot" ? "none" : (p.anim ?? "none"), f)}>
        {/* plate */}
        <rect x={-150} y={-170} width={300} height={340} rx={36} fill={c} />
        <rect x={-150} y={150} width={300} height={20} rx={10} fill={dk} opacity={0.5} />
        {/* screws top and bottom */}
        <circle cx={0} cy={-132} r={10} fill={C.greyDark} opacity={0.4} />
        <circle cx={0} cy={132} r={10} fill={C.greyDark} opacity={0.4} />
        {/* two round holes, each with a shaded rim */}
        {[-74, 74].map((hx) => (
          <g key={hx}>
            <circle cx={hx} cy={-6} r={40} fill={dk} />
            <circle cx={hx} cy={-6} r={30} fill={C.inkSoft} />
            <circle cx={hx - 8} cy={-14} r={7} fill={C.white} opacity={0.12} />
          </g>
        ))}
        {/* pilot light */}
        <circle cx={112} cy={-120} r={9} fill={C.green} opacity={pilot} />
      </g>
    </g>
  );
}
