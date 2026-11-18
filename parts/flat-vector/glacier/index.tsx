import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Icy blue-white glacier flowing down between rocky slopes, with crevasses and an ice cliff at the front. Origin = centre of the ice cliff base. About 1000 px wide and 800 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const CREV = "#6FB2D8";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const ice = col(p.color, "#EAF7FC");
  const rock = col(p.color2, C.greyDark);
  const anim: string = p.anim ?? "none";
  const crev = (d: string, k: number) => (
    <path d={d} stroke={CREV} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray={anim === "flow" ? "30 18" : undefined}
      strokeDashoffset={anim === "flow" ? -f * (2 + k) : 0} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={460} ry={20} fill={C.shadow} />
        {/* rocky slopes either side */}
        <path d="M -500 0 L -500 -470 L -380 -600 L -300 -520 L -230 -690 L -120 -560 L -120 0 Z" fill={rock} />
        <path d="M 500 0 L 500 -400 L 390 -560 L 320 -470 L 240 -640 L 130 -520 L 130 0 Z" fill={rock} />
        <path d="M -230 -690 L -120 -560 L -120 -520 L -200 -600 Z M 240 -640 L 130 -520 L 130 -480 L 220 -590 Z" fill={shade(rock, 0.25)} />
        {/* ice tongue */}
        <path d="M -80 -780 Q 0 -800 80 -780 C 140 -680 300 -520 380 -260 L 420 -120 L -420 -120 L -380 -250 C -300 -560 -120 -700 -80 -780 Z" fill={ice} />
        {/* crevasses */}
        {crev("M -40 -740 L -20 -680 L -55 -620 L -15 -560 L -40 -500 L -10 -430", 0)}
        {crev("M 120 -640 L 95 -580 L 130 -520 L 100 -450 L 120 -380", 1)}
        {crev("M -200 -420 L -170 -360 L -215 -300", 2)}
        {crev("M 250 -380 L 225 -330 L 262 -270", 3)}
        <path d="M -160 -560 L -190 -480" stroke={C.white} strokeWidth={10} strokeLinecap="round" />
        {/* ice cliff at the front */}
        <path d="M -430 0 L -430 -130 Q 0 -170 430 -130 L 430 0 Z" fill="#A5D8EE" />
        <path d="M -300 -120 L -300 -30 M -150 -140 L -150 -30 M 0 -150 L 0 -30 M 150 -140 L 150 -30 M 300 -120 L 300 -30" stroke="#7FBEDD" strokeWidth={8} strokeLinecap="round" />
      </g>
    </g>
  );
}
