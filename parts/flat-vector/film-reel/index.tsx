import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metal film reel seen from the front: a rim, a hub with spokes and sprocket holes, and a strip of film
// trailing down from its bottom edge. Origin = centre of the reel. anim "spin" turns the reel (the film stays put).
const f1 = (v: number) => v.toFixed(1);
const R = 190; // reel radius
const HOLES = 8;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const metal = p.color && p.color !== "none" ? p.color : C.grey;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? (f * 360) / 120 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  const film = C.ink;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* film strip trailing down, not spinning */}
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        <rect x={-70} y={R - 20} width={140} height={420} fill={film} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={i}>
            <rect x={-54} y={R + 10 + i * 46} width={18} height={24} rx={4} fill={C.white} opacity={0.35} />
            <rect x={36} y={R + 10 + i * 46} width={18} height={24} rx={4} fill={C.white} opacity={0.35} />
          </g>
        ))}
        {/* reel body */}
        <g transform={`rotate(${f1(turn)})`}>
          <circle cx={0} cy={0} r={R + 14} fill={shade(metal, 0.2)} />
          <circle cx={0} cy={0} r={R} fill={metal} />
          <circle cx={0} cy={0} r={R - 26} fill={shade(metal, 0.1)} />
          {/* spokes and sprocket holes in the hub */}
          {Array.from({ length: HOLES }).map((_, i) => {
            const a = (i * 360) / HOLES;
            return (
              <g key={i} transform={`rotate(${f1(a)})`}>
                <rect x={-14} y={-R + 40} width={28} height={R - 96} rx={8} fill={C.inkSoft} />
              </g>
            );
          })}
          <circle cx={0} cy={0} r={70} fill={metal} />
          <circle cx={0} cy={0} r={34} fill={C.inkSoft} />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * 60 * Math.PI) / 180;
            return <circle key={i} cx={Math.cos(a) * 52} cy={Math.sin(a) * 52} r={9} fill={C.inkSoft} />;
          })}
        </g>
        {/* highlight on the rim */}
        <path d={`M ${f1(-R + 30)} ${f1(-40)} A ${R - 30} ${R - 30} 0 0 1 ${f1(-40)} ${f1(-R + 30)}`} fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.35} />
      </g>
    </g>
  );
}
