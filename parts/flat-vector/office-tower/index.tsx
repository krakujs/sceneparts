import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mid-rise office block with a glass curtain wall, mullion grid and a ground-floor entrance canopy.
// Origin = centre of the floor line. About 640 px wide and 760 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const FLOORS = 5, FH = 100, TOP = -720, BASE = -120;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const glass = p.color && p.color !== "none" ? p.color : C.skyDeep;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const floors: React.ReactNode[] = [];
  for (let r = 0; r < FLOORS; r++) {
    const ry = TOP + 40 + r * FH;
    const lit = anim === "lights" && Math.floor(f / 12) % FLOORS === r;
    floors.push(
      <g key={r}>
        <rect x={-300} y={ry} width={600} height={FH - 10} fill={lit ? C.yellow : glass} />
        <path d={`M -260 ${ry + 8} L -220 ${ry + 8} L -260 ${ry + 50} Z`} fill={C.white} opacity={0.45} />
      </g>
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={360} ry={20} fill={C.shadow} />
        {/* roof slab and body */}
        <rect x={-330} y={TOP} width={660} height={24} rx={6} fill={C.greyDark} />
        <rect x={-320} y={TOP + 24} width={640} height={BASE - TOP - 24} fill={C.greyLight} />
        {floors}
        {/* mullion grid over the glass */}
        {[-200, -100, 0, 100, 200].map((mx) => (
          <rect key={mx} x={mx - 2} y={TOP + 40} width={4} height={FLOORS * FH - 10} fill={C.greyLight} />
        ))}
        {/* entrance canopy and glass lobby */}
        <rect x={-200} y={-250} width={400} height={20} rx={8} fill={accent} />
        <rect x={-180} y={-230} width={360} height={110} fill={shade(glass, 0.1)} />
        <rect x={-130} y={-230} width={260} height={110} fill={C.sky} />
        <rect x={-2} y={-230} width={4} height={110} fill={C.white} />
        <rect x={-260} y={-14} width={520} height={14} rx={4} fill={C.greyDark} />
      </g>
    </g>
  );
}
