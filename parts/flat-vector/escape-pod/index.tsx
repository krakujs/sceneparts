import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Escape pod: a white and grey cone-nosed landing capsule with a small round window, three fins at its base and a
// glowing thruster flame below. Origin = the tip of the flame (the pod hovers above y); about 740 px tall at s = 1.
// anim bob: the pod bobs gently and the flame flickers.
/* eslint-disable @typescript-eslint/no-explicit-any */
const WHITE = C.white, GREY = C.greyLight, GREY_D = C.grey, FIN = C.greyDark;
const FLAME = C.orange, FLAME_IN = C.yellow, CORE = "#FFF6CC";
const f1 = (v: number) => v.toFixed(1);
const CAPSULE = "M 0 -740 L 128 -520 L 128 -200 Q 128 -170 98 -170 L -98 -170 Q -128 -170 -128 -200 L -128 -520 Z";

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1300, s = 1, f = 0, flip = false } = p as any;
  const on = p.anim === "bob";
  const t = (f * 2 * Math.PI) / 36;
  const bob = on ? -(Math.sin(t / 2) + 1) * 10 : 0;
  const flick = on ? Math.sin(t * 3) : 0;
  const ty = 12 * flick;   // flame tip flickers

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* faint halo around the thruster */}
        <circle cx={0} cy={-60} r={150} fill={FLAME_IN} opacity={0.12 + 0.05 * flick} />
        {/* three fins at the base, behind the capsule */}
        <path d="M -118 -270 L -210 -110 L -118 -150 Z" fill={FIN} />
        <path d="M 118 -270 L 210 -110 L 118 -150 Z" fill={FIN} />
        <path d="M -28 -180 L 0 -86 L 28 -180 Z" fill={FIN} />
        {/* thruster flame: orange outside, yellow inside, white core */}
        <path d={`M -42 -118 Q -62 -50 0 ${f1(ty)} Q 62 -50 42 -118 Z`} fill={FLAME} />
        <path d={`M -24 -118 Q -34 -60 0 ${f1(ty - 30)} Q 34 -60 24 -118 Z`} fill={FLAME_IN} />
        <path d={`M -10 -118 Q -14 -90 0 ${f1(ty - 56)} Q 14 -90 10 -118 Z`} fill={CORE} />
        {/* nozzle */}
        <path d="M -62 -170 L 62 -170 L 42 -118 L -42 -118 Z" fill={FIN} />
        {/* capsule: white shell with a grey lower band and a grey shaded side */}
        <path d={CAPSULE} fill={WHITE} />
        <path d="M -128 -250 L 128 -250 L 128 -200 Q 128 -170 98 -170 L -98 -170 Q -128 -170 -128 -200 Z" fill={GREY} />
        <path d="M 58 -524 L 128 -520 L 128 -200 Q 128 -170 98 -170 L 60 -170 Q 100 -260 58 -524 Z" fill={GREY} opacity={0.55} />
        {/* grey nose cap */}
        <path d="M 0 -740 L 44 -630 L -44 -630 Z" fill={GREY_D} />
        {/* small round window with a glint */}
        <circle cx={0} cy={-400} r={56} fill={C.greyDark} />
        <circle cx={0} cy={-400} r={46} fill={C.skyDeep} />
        <path d="M -24 -424 Q -14 -444 6 -444" stroke={C.white} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.85} />
      </g>
    </g>
  );
}
