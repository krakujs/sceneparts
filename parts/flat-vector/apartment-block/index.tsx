import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Apartment block: a ground-floor lobby plus five residential storeys, flat front elevation.
// Origin = centre of the floor line. About 720 px wide and 1100 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const STOREYS = 5, FH = 165, TOP = -1040, BASE = -200;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.sand;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const storeys: React.ReactNode[] = [];
  for (let r = 0; r < STOREYS; r++) {
    const wy = BASE - (r + 1) * FH + 30; // top of this storey's windows
    const lit = anim === "lights" && Math.floor(f / 15) % STOREYS === r;
    storeys.push(
      <g key={r}>
        <rect x={-300} y={wy + 112} width={600} height={14} rx={4} fill={shade(wall, 0.15)} />
        <rect x={-300} y={wy + 96} width={6} height={16} fill={C.white} />
        <rect x={294} y={wy + 96} width={6} height={16} fill={C.white} />
        {[-240, -150, -60, 30, 120, 210].map((wx, i) => (
          <g key={i}>
            <rect x={wx} y={wy} width={70} height={100} rx={8} fill={C.white} />
            <rect x={wx + 8} y={wy + 8} width={54} height={84} rx={5} fill={lit ? C.yellow : C.sky} />
            <rect x={wx + 33} y={wy + 8} width={4} height={84} fill={C.white} />
            <rect x={wx + 8} y={wy + 46} width={54} height={4} fill={C.white} />
          </g>
        ))}
        {r % 2 === 0 && <rect x={-70} y={wy + 96} width={140} height={22} rx={6} fill={accent} />}
      </g>
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={380} ry={22} fill={C.shadow} />
        <rect x={-340} y={TOP} width={680} height={1040} rx={14} fill={wall} />
        <rect x={-360} y={TOP - 26} width={720} height={34} rx={8} fill={shade(wall, 0.2)} />
        {storeys}
        {/* ground-floor lobby with canopy and glass door */}
        <rect x={-340} y={BASE} width={680} height={200} rx={6} fill={shade(wall, 0.12)} />
        <rect x={-170} y={BASE - 20} width={340} height={20} rx={8} fill={accent} />
        <rect x={-110} y={-170} width={220} height={170} rx={8} fill={C.sky} />
        <rect x={-2} y={-170} width={4} height={170} fill={C.white} />
        <path d="M -100 -160 L -70 -160 L -100 -110 Z" fill={C.white} opacity={0.7} />
        <rect x={-180} y={-30} width={360} height={30} rx={8} fill={C.greyDark} />
      </g>
    </g>
  );
}
