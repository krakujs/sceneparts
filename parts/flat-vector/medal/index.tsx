import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sports medal on a V-shaped ribbon. Origin = the top of the ribbon (x, y) so the swing pivots there.
// The ribbon is two straps meeting at the top, then a round medal with a raised rim, a star-free
// emboss ring and a hole for the ribbon. The metal enum picks gold, silver or bronze.
const f1 = (v: number) => v.toFixed(1);
const METALS: Record<string, string> = { gold: C.yellow, silver: "#C9CED8", bronze: "#C98A5A" };
const swingAngle = (anim: string, f: number) => (anim === "swing" ? 8 * Math.sin((f * 2 * Math.PI) / 60) : 0);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const metal = METALS[p.metal as string] ?? METALS.gold;
  const ribbon = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  const ang = swingAngle(anim, f);
  const MR = 170, CY = 520; // medal radius and centre, relative to the ribbon top
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <g transform={`rotate(${f1(ang)})`}>
        <g transform={`translate(0 ${f1(bob)})`}>
          {/* V ribbon: two straps from the top knot down to the medal */}
          <path d="M -36 0 L -150 0 L -90 420 L -10 420 Z" fill={ribbon} />
          <path d="M 36 0 L 150 0 L 90 420 L 10 420 Z" fill={shade(ribbon, 0.2)} />
          <rect x={-40} y={-16} width={80} height={36} rx={12} fill={C.inkSoft} />
          {/* medal body: a darker rim, then the metal face */}
          <circle cx={0} cy={CY} r={MR} fill={shade(metal, 0.25)} />
          <circle cx={0} cy={CY} r={MR - 18} fill={metal} />
          <circle cx={0} cy={CY} r={MR - 60} fill="none" stroke={shade(metal, 0.2)} strokeWidth={10} />
          {/* ribbon ring at the top of the medal */}
          <circle cx={0} cy={CY - MR + 6} r={18} fill={C.inkSoft} />
          <circle cx={0} cy={CY - MR + 6} r={8} fill={C.greyLight} />
          {/* shine */}
          <path d={`M -110 ${CY - 60} Q -90 ${CY - 120} -40 ${CY - 140}`} stroke={C.white} strokeWidth={16} strokeLinecap="round" fill="none" opacity={0.4} />
        </g>
      </g>
    </g>
  );
}
