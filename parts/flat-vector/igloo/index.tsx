import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Snow-block igloo: a dome with block seams and a low, centred tunnel entrance, on a snow patch.
// Origin = centre of the ground line. About 600 px wide and 400 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const snow = p.color && p.color !== "none" ? p.color : C.white;
  const line = p.color2 && p.color2 !== "none" ? p.color2 : C.sky;
  const anim: string = p.anim ?? "none";
  const lamp = anim === "lights" ? (Math.floor(f / 10) % 2 ? C.yellow : C.yellowDark) : C.orange;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-6} rx={330} ry={46} fill={snow} />
        <path d="M -270 -20 Q -270 -330 0 -340 Q 270 -330 270 -20 Z" fill={snow} />
        <path d="M 40 -330 Q 200 -250 240 -40 L 270 -20 Q 270 -150 40 -330 Z" fill={line} opacity={0.5} />
        {/* block seams */}
        <path d="M -220 -110 Q 0 -140 220 -110" stroke={line} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M -160 -230 Q 0 -252 160 -230" stroke={line} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M -120 -40 L -110 -130" stroke={line} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 120 -40 L 110 -130" stroke={line} strokeWidth={8} fill="none" strokeLinecap="round" />
        {/* centred tunnel entrance with a lamp inside */}
        <path d="M -80 -4 L -80 -120 Q -80 -175 0 -175 Q 80 -175 80 -120 L 80 -4 Z" fill={shade(line, 0.2)} />
        <path d="M -62 -4 L -62 -115 Q -62 -155 0 -155 Q 62 -155 62 -115 L 62 -4 Z" fill={lamp} opacity={anim === "lights" ? 0.95 : 0.55} />
        <path d="M -40 -4 L -40 -110 Q -40 -135 0 -135 Q 40 -135 40 -110 L 40 -4 Z" fill={C.white} opacity={0.2} />
      </g>
    </g>
  );
}
