import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Post office: a small office building with an envelope icon sign above the door and a red post box out front. Origin = bottom centre. About 820 px wide and 1060 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F7F1E3";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#FFC83D";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={420} ry={20} fill={C.shadow} />
        <rect x={-400} y={-14} width={800} height={20} rx={6} fill={shade(wall, 0.2)} />
        {/* office building */}
        <rect x={-380} y={-640} width={760} height={630} rx={12} fill={wall} />
        <rect x={-400} y={-670} width={800} height={38} rx={10} fill={roof} />
        <rect x={-400} y={-652} width={800} height={12} fill={shade(roof, 0.2)} />
        {[-290, -110, 70, 250].map((wx, i) => (
          <g key={wx}>
            <rect x={wx - 60} y={-560} width={120} height={130} rx={10} fill={C.sky} opacity={anim === "lights" ? lit(i) : 1} />
            <rect x={wx - 48} y={-548} width={14} height={106} fill={C.white} opacity={0.65} />
            <rect x={wx - 2} y={-560} width={4} height={130} fill={shade(wall, 0.3)} />
          </g>
        ))}
        {/* envelope icon sign above the door */}
        <rect x={-90} y={-585} width={180} height={110} rx={10} fill={C.yellow} />
        <path d="M -90 -585 L 0 -520 L 90 -585" fill="none" stroke={C.yellowDark} strokeWidth={10} strokeLinejoin="round" />
        {/* entrance */}
        <rect x={-70} y={-300} width={140} height={300} rx={10} fill={C.brownDark} />
        <rect x={-56} y={-286} width={52} height={270} rx={6} fill={C.skyDeep} />
        <rect x={4} y={-286} width={52} height={270} rx={6} fill={C.skyDeep} />
        {/* post box out front */}
        <rect x={250} y={-260} width={14} height={260} fill={C.greyDark} />
        <rect x={210} y={-420} width={150} height={180} rx={24} fill={C.red} />
        <rect x={210} y={-440} width={150} height={40} rx={18} fill={C.redDark} />
        <rect x={228} y={-390} width={114} height={18} rx={6} fill={C.redDark} />
        <rect x={230} y={-330} width={110} height={12} rx={4} fill={C.white} opacity={0.6} />
        <rect x={210} y={-270} width={150} height={20} rx={8} fill={C.redDark} />
      </g>
    </g>
  );
}
