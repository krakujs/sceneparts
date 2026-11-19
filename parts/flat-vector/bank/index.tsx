import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classical bank: columns, a pediment with a gold coin icon, wide steps and a central door. Origin = bottom centre. About 880 px wide and 790 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F2EADB";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#2A50AE";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={460} ry={22} fill={C.shadow} />
        {/* steps */}
        <rect x={-400} y={-40} width={800} height={22} rx={6} fill={shade(wall, 0.12)} />
        <rect x={-430} y={-20} width={860} height={20} rx={6} fill={shade(wall, 0.22)} />
        {/* base and body */}
        <rect x={-380} y={-620} width={760} height={590} rx={6} fill={wall} />
        {/* pediment with a coin icon */}
        <path d="M -440 -620 L 0 -780 L 440 -620 Z" fill={roof} />
        <path d="M -380 -620 L 0 -730 L 380 -620 Z" fill={shade(roof, 0.12)} />
        <circle cx={0} cy={-672} r={44} fill={C.yellow} />
        <circle cx={0} cy={-672} r={30} fill={C.yellowDark} />
        <rect x={-6} y={-690} width={12} height={36} rx={4} fill={C.yellow} />
        <rect x={-380} y={-620} width={760} height={22} fill={shade(wall, 0.15)} />
        {/* columns */}
        {[-300, -180, -60, 60, 180, 300].map((cx) => (
          <g key={cx}>
            <rect x={cx - 24} y={-580} width={48} height={450} fill={C.white} />
            <rect x={cx + 10} y={-580} width={14} height={450} fill={shade(C.white, 0.12)} />
            <rect x={cx - 36} y={-594} width={72} height={18} rx={4} fill={shade(C.white, 0.08)} />
          </g>
        ))}
        {/* centre door */}
        <rect x={-62} y={-320} width={124} height={190} rx={10} fill={C.brownDark} />
        <rect x={-50} y={-306} width={46} height={170} rx={6} fill={C.skyDeep} />
        <rect x={4} y={-306} width={46} height={170} rx={6} fill={C.skyDeep} />
        <rect x={-50} y={-306} width={10} height={170} fill={C.white} opacity={0.5} />
      </g>
    </g>
  );
}
