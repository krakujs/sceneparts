import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round stone watchtower, front view, crenellated top, narrow windows and a stone base.
// Origin = centre of the floor line. About 360 px wide and 1200 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const WIN_Y = [-860, -700, -540, -380];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.grey;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" && Math.floor(f / 10) % WIN_Y.length === i ? C.yellow : C.navy);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={230} ry={20} fill={C.shadow} />
        {/* tower body with shaded side */}
        <rect x={-170} y={-1040} width={340} height={1040} rx={14} fill={stone} />
        <rect x={80} y={-1040} width={90} height={1040} rx={14} fill={shade(stone, 0.2)} opacity={0.7} />
        {/* stone base */}
        <rect x={-200} y={-120} width={400} height={120} rx={18} fill={shade(stone, 0.12)} />
        {/* stone courses */}
        {[-180, -300, -420, -540, -660, -780, -900].map((cy) => (
          <rect key={cy} x={-170} y={cy} width={340} height={4} fill={shade(stone, 0.15)} />
        ))}
        {/* narrow windows, one per storey */}
        {WIN_Y.map((wy, i) => (
          <g key={wy}>
            <rect x={-22} y={wy} width={44} height={96} rx={22} fill={dark} />
            <rect x={-12} y={wy + 12} width={24} height={84} rx={12} fill={lit(i)} />
          </g>
        ))}
        {/* door at the base */}
        <path d="M -48 -120 L -48 -190 Q -48 -220 0 -220 Q 48 -220 48 -190 L 48 -120 Z" fill={dark} />
        {/* crenellated top with a platform */}
        <rect x={-190} y={-1070} width={380} height={34} rx={6} fill={shade(stone, 0.1)} />
        {[-180, -90, 0, 90].map((mx) => (
          <rect key={mx} x={mx} y={-1120} width={70} height={52} rx={4} fill={stone} />
        ))}
        {/* lookout light in the top */}
        <rect x={-16} y={-1100} width={32} height={20} rx={4} fill={anim === "lights" ? C.yellow : dark} />
      </g>
    </g>
  );
}
