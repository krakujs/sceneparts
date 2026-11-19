import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Broad oak: a thick trunk with a root flare under a wide, lumpy round crown. Origin = centre of the trunk base on the ground.
// About 720 px wide and 1000 px tall at s = 1. anim sway turns the crown gently.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

// Crown lumps: [x, y, radius]
const LUMPS: [number, number, number][] = [
  [-300, -600, 130], [-200, -760, 170], [-40, -850, 200], [130, -820, 190], [290, -690, 150],
  [-330, -530, 110], [330, -530, 120], [-130, -530, 150], [120, -540, 150], [0, -620, 190],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leaf = p.color && p.color !== "none" ? p.color : C.green;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 1.5 * Math.sin((f * 2 * Math.PI) / 90) : 0;
  const dark = shade(leaf, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={22} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* trunk with root flare, shaded right half */}
        <path d="M -120 0 C -100 -30 -58 -40 -52 -130 L -40 -480 C -36 -520 -70 -560 -90 -660 L 90 -660 C 70 -560 36 -520 40 -480 L 52 -130 C 58 -40 100 -30 120 0 Z" fill={bark} />
        <path d="M 0 0 L 120 0 C 100 -30 58 -40 52 -130 L 40 -480 C 36 -520 70 -560 90 -660 L 0 -660 Z" fill={shade(bark, 0.2)} />
        {/* two thick limbs into the crown */}
        <path d="M -30 -470 Q -120 -560 -190 -660 L -160 -680 Q -100 -600 -10 -520 Z" fill={bark} />
        <path d="M 30 -470 Q 120 -560 190 -660 L 160 -680 Q 100 -600 10 -520 Z" fill={shade(bark, 0.2)} />
        <g transform={`rotate(${f1(sway)} 0 -600)`}>
          {LUMPS.map(([lx, ly, r], i) => <circle key={`s${i}`} cx={lx + 24} cy={ly + 28} r={r} fill={dark} />)}
          {LUMPS.map(([lx, ly, r], i) => <circle key={`m${i}`} cx={lx} cy={ly} r={r} fill={leaf} />)}
        </g>
      </g>
    </g>
  );
}
