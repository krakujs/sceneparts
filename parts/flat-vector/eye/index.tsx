import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big almond eye with iris, pupil and lids. Effect, centred on (x, y), about 460 px wide at s = 1.
// anim "blink": the lids close and open every 110 frames. anim "look": the pupil glances left and right.
const f1 = (v: number) => v.toFixed(1);
const HALF_W = 230; // eye half-width

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const iris = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  // closure 0 = open, 1 = shut
  const ph = f % 110;
  const c = anim === "blink" && ph < 10 ? Math.sin((Math.PI * ph) / 10) : 0;
  const U = -190 * (1 - c); // upper lid control point
  const L = 190 * (1 - c);  // lower lid control point
  const open = Math.max(0.04, 1 - c);
  const dx = anim === "look" ? 46 * Math.sin((f * 2 * Math.PI) / 150) : 0;
  const dy = anim === "look" ? 8 * Math.sin((f * 2 * Math.PI) / 75) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      {/* eye white */}
      <path d={`M -${HALF_W} 0 Q 0 ${f1(U)} ${HALF_W} 0 Q 0 ${f1(L)} -${HALF_W} 0 Z`} fill={C.white} />
      <path d={`M -${HALF_W} 0 Q 0 ${f1(L)} ${HALF_W} 0`} stroke={shade(C.white, 0.1)} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* iris and pupil, squashed by the lids */}
      <g transform={`translate(${f1(dx)} ${f1(dy)}) scale(1 ${open.toFixed(3)})`}>
        <circle cx={0} cy={0} r={84} fill={shade(iris, 0.25)} />
        <circle cx={0} cy={0} r={74} fill={iris} />
        <circle cx={0} cy={0} r={40} fill={C.ink} />
        <circle cx={-24} cy={-26} r={13} fill={C.white} />
        <circle cx={26} cy={22} r={6} fill={C.white} opacity={0.7} />
      </g>
      {/* lids: upper lid is the heavier line */}
      <path d={`M -${HALF_W + 6} 0 Q 0 ${f1(U)} ${HALF_W + 6} 0`} stroke={C.ink} strokeWidth={24} strokeLinecap="round" fill="none" />
      <path d={`M -${HALF_W} 0 Q 0 ${f1(L)} ${HALF_W} 0`} stroke={C.inkSoft} strokeWidth={12} strokeLinecap="round" fill="none" />
    </g>
  );
}
