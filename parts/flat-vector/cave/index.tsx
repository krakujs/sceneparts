import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rocky mound with a dark arched cave mouth. Origin = centre of the base. About 960 px wide and 430 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const rock = col(p.color, C.grey);
  const dark = col(p.color2, C.greyDark);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={490} ry={20} fill={C.shadow} />
        <path d="M -480 0 C -500 -200 -340 -420 0 -430 C 340 -420 500 -200 480 0 Z" fill={rock} />
        <path d="M 40 -428 C 340 -420 500 -200 480 0 L 180 0 C 240 -150 200 -330 40 -428 Z" fill={shade(rock, 0.2)} />
        {/* lumps on the mound */}
        <circle cx={-300} cy={-260} r={40} fill={shade(rock, 0.08)} />
        <circle cx={250} cy={-270} r={34} fill={shade(rock, 0.08)} />
        <circle cx={-120} cy={-380} r={28} fill={shade(rock, 0.08)} />
        {/* arch: stone frame, then the dark mouth */}
        <path d="M -190 0 L -190 -170 Q -190 -310 0 -310 Q 190 -310 190 -170 L 190 0 Z" fill={dark} />
        <path d="M -150 0 L -150 -160 Q -150 -270 0 -270 Q 150 -270 150 -160 L 150 0 Z" fill={C.ink} />
        <path d="M -110 0 L -110 -150 Q -110 -230 0 -230 Q 110 -230 110 -150 L 110 0 Z" fill={C.inkSoft} opacity={0.35} />
        {/* front rubble */}
        <ellipse cx={-420} cy={-18} rx={50} ry={18} fill={dark} />
        <ellipse cx={400} cy={-14} rx={44} ry={14} fill={dark} />
      </g>
    </g>
  );
}
