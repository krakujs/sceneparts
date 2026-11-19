import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Horseshoe (U) magnet, red with grey pole tips, standing on its tips. Optional attraction lines by the tips.
// Origin = bottom centre (the floor line). Hero scale: at s = 1 about 340 px wide and 400 px tall. Use s about 0.3–0.4 next to a person.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const tips = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const lines = p.lines === true;
  const pulse = anim === "pulse" ? 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {lines && (
          <g opacity={pulse} stroke={C.greyDark} strokeWidth={12} strokeLinecap="round">
            {[-70, -120, -170].map((ly) => (
              <g key={ly}>
                <path d={`M-200,${ly} L-240,${ly}`} />
                <path d={`M200,${ly} L240,${ly}`} />
              </g>
            ))}
          </g>
        )}
        {/* the U: a thick arc with two straight legs */}
        <path d="M-130,-30 V-230 A130,130 0 0 1 130,-230 V-30" fill="none" stroke={body} strokeWidth={80} />
        <path d="M-122,-274 A130,130 0 0 1 -44,-352" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.3} />
        {/* grey pole tips */}
        <rect x={-170} y={-50} width={80} height={50} rx={8} fill={tips} />
        <rect x={90} y={-50} width={80} height={50} rx={8} fill={tips} />
        <rect x={-170} y={-50} width={80} height={12} rx={6} fill={shade(tips, 0.2)} />
        <rect x={90} y={-50} width={80} height={12} rx={6} fill={shade(tips, 0.2)} />
      </g>
    </g>
  );
}
