import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stadium, side view: a wide low bowl whose outer wall curves up at both ends, with rows of arches on the wall,
// pitch visible across the rim, four floodlight masts with light panels and small pennants on the rim.
// Origin = centre of the ground line. About 1000 px wide and 1000 px tall at s = 1. anim lights blinks the floodlights.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const WALL = "#E9ECF2", ACCENT = "#3D6FE0";
const RIM = -340; // height of the top rim of the bowl
const MASTS = [-380, -130, 130, 380];
const PENNANTS = [-250, -80, 80, 250];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : WALL;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : ACCENT;
  const anim: string = p.anim ?? "none";
  const arch = shade(wall, 0.4);
  const lamp = (i: number) => (anim === "lights" && Math.floor(f / 10 + i) % 2 ? C.yellow : C.white);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={500} ry={20} fill={C.shadow} />
        {/* outer wall of the bowl: curves up at both ends */}
        <path d="M -460 -20 C -520 -200 -440 -330 -330 -340 L 330 -340 C 440 -330 520 -200 460 -20 Z" fill={wall} />
        <rect x={-470} y={-30} width={940} height={30} rx={8} fill={shade(wall, 0.2)} />
        {/* arches in two tiers on the outer wall */}
        {[-270, -160].map((ay, row) =>
          [-330, -240, -150, -60, 30, 120, 210, 300].filter((_, i) => row === 0 ? true : i !== 0 && i !== 7).map((ax) => (
            <path key={`${row}-${ax}`} d={`M ${ax - 28} ${ay + 66} L ${ax - 28} ${ay + 28} Q ${ax - 28} ${ay} ${ax} ${ay} Q ${ax + 28} ${ay} ${ax + 28} ${ay + 28} L ${ax + 28} ${ay + 66} Z`} fill={arch} />
          ))
        )}
        {/* top rim: dark bowl interior with the pitch visible */}
        <ellipse cx={0} cy={RIM} rx={350} ry={36} fill={shade(wall, 0.35)} />
        <ellipse cx={0} cy={RIM + 2} rx={300} ry={24} fill={C.green} />
        <ellipse cx={0} cy={RIM + 2} rx={60} ry={8} fill={shade(C.green, 0.15)} />
        <rect x={-355} y={RIM - 6} width={710} height={10} fill={accent} opacity={0.9} />
        {/* pennants on the rim */}
        {PENNANTS.map((px, i) => (
          <g key={`p${px}`}>
            <rect x={px - 3} y={RIM - 70} width={6} height={70} fill={C.greyDark} />
            <path d={`M ${px + 3} ${RIM - 70} L ${px + 54} ${RIM - 58} L ${px + 3} ${RIM - 46} Z`} fill={i % 2 ? C.yellow : accent} />
          </g>
        ))}
        {/* floodlight masts with light panels */}
        {MASTS.map((mx, i) => (
          <g key={`m${mx}`}>
            <rect x={mx - 7} y={-720} width={14} height={390} fill={C.greyDark} />
            <rect x={mx - 60} y={-770} width={120} height={56} rx={8} fill={C.greyDark} />
            {[-40, -13, 14, 41].map((lx, j) => (
              <rect key={j} x={mx + lx - 11} y={-758} width={22} height={34} rx={4} fill={lamp(i * 4 + j)} />
            ))}
          </g>
        ))}
      </g>
    </g>
  );
}
