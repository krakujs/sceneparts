import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden pier on piles running out over the water: a planked deck with a railing, a bench, two lamp posts
// and a strip of water in front. Origin = water line at the centre. About 1000 px wide and 560 px tall at s = 1.
// anim "lights": the lamps on the posts light up in turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const water = p.color2 && p.color2 !== "none" ? p.color2 : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const lamp = (k: number) => anim === "lights" && Math.floor(f / 10) % 2 === k;
  const piles = [-440, -300, -160, -20, 120, 260, 400];
  const posts = Array.from({ length: 13 }, (_, i) => -480 + i * 80);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* water strip */}
        <rect x={-500} y={-60} width={1000} height={60} fill={water} />
        {[-400, -200, 0, 200, 380].map((wx) => <rect key={`wv${wx}`} x={wx} y={-34} width={70} height={5} rx={2} fill={C.white} opacity={0.6} />)}
        {/* piles going into the water */}
        {piles.map((px) => <rect key={`pl${px}`} x={px - 13} y={-236} width={26} height={236} fill={shade(wood, 0.25)} />)}
        <rect x={-500} y={-212} width={1000} height={20} fill={shade(wood, 0.2)} />
        {/* deck */}
        <rect x={-500} y={-262} width={1000} height={32} rx={4} fill={wood} />
        {Array.from({ length: 25 }, (_, i) => (
          <rect key={`dk${i}`} x={-500 + i * 40} y={-262} width={3} height={32} fill={shade(wood, 0.25)} />
        ))}
        {/* railing with posts and two rails */}
        {posts.map((px) => <rect key={`po${px}`} x={px - 5} y={-390} width={10} height={130} fill={shade(wood, 0.1)} />)}
        <rect x={-500} y={-392} width={1000} height={12} rx={4} fill={shade(wood, 0.1)} />
        <rect x={-500} y={-326} width={1000} height={8} fill={shade(wood, 0.1)} />
        {/* bench */}
        <rect x={80} y={-300} width={160} height={14} rx={4} fill={C.sand} />
        <rect x={90} y={-286} width={12} height={24} fill={shade(wood, 0.2)} />
        <rect x={218} y={-286} width={12} height={24} fill={shade(wood, 0.2)} />
        {/* lamp posts with lanterns */}
        {[-400, 400].map((lx, k) => (
          <g key={`lp${lx}`}>
            <rect x={lx - 5} y={-560} width={10} height={300} fill={C.greyDark} />
            <path d={`M ${lx - 24} -560 L ${lx} -590 L ${lx + 24} -560 Z`} fill={C.greyDark} />
            <rect x={lx - 18} y={-560} width={36} height={40} rx={6} fill={lamp(k) ? C.yellow : C.sky} />
          </g>
        ))}
      </g>
    </g>
  );
}
