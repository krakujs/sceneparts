import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Factory with a sawtooth roof and two smokestacks. Origin = base on the ground. About 980 px wide and 760 px tall at s = 1.
// anim "lights": the smoke puffs drift up and fade, one stack after the other.
const f1 = (v: number) => v.toFixed(1);
const PUFFS = [0, 1, 2];
const puff = (f: number, base: number, k: number) => {
  const t = ((f + k * 22) % 66) / 66;
  return { y: -t * 260, r: 26 + t * 60, o: (1 - t) * 0.85, dx: Math.sin(t * 3 + base) * 30 };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sawXs = [-400, -260, -120, 20, 160, 300];
  const smoke = (cx: number, base: number) =>
    anim === "lights" && PUFFS.map((k) => {
      const q = puff(f, base, k);
      return <circle key={`${cx}-${k}`} cx={f1(cx + q.dx)} cy={f1(-720 + q.y)} r={f1(q.r)} fill={C.white} opacity={f1(q.o)} />;
    });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={520} ry={26} fill={C.shadow} />
      {/* smoke (behind the stacks) */}
      {smoke(-230, 0.5)}
      {smoke(230, 2.0)}
      {/* smokestacks */}
      <rect x={-270} y={-640} width={80} height={640} rx={6} fill={C.greyDark} />
      <rect x={-284} y={-660} width={108} height={26} rx={6} fill={shade(C.greyDark, 0.2)} />
      <rect x={190} y={-640} width={80} height={640} rx={6} fill={C.greyDark} />
      <rect x={176} y={-660} width={108} height={26} rx={6} fill={shade(C.greyDark, 0.2)} />
      {/* main hall */}
      <rect x={-460} y={-360} width={920} height={360} rx={10} fill={wall} />
      <rect x={-460} y={-372} width={920} height={18} rx={6} fill={shade(wall, 0.15)} />
      {/* sawtooth roof: each tooth is a slope up to a vertical glass face */}
      {sawXs.map((sx, i) => (
        <g key={i}>
          <path d={`M ${sx} -372 L ${sx + 60} -470 L ${sx + 120} -372 Z`} fill={roof} />
          <path d={`M ${sx + 60} -470 L ${sx + 120} -470 L ${sx + 120} -372 L ${sx + 110} -372 L ${sx + 110} -448 L ${sx + 60} -448 Z`} fill={C.sky} />
        </g>
      ))}
      <rect x={-460} y={-372} width={920} height={10} fill={roof} />
      {/* windows row */}
      {[-380, -250, -120, 10, 140, 270].map((wx, i) => (
        <g key={wx}>
          <rect x={wx} y={-300} width={90} height={70} rx={6} fill={C.skyDeep} />
          <rect x={wx + 10} y={-292} width={18} height={54} fill={C.white} opacity={0.5} />
          <line x1={wx + 45} y1={-300} x2={wx + 45} y2={-230} stroke={C.greyDark} strokeWidth={4} />
          <rect x={wx} y={-216} width={90} height={6} fill={shade(wall, 0.2)} />
          {i === 2 && <rect x={wx + 40} y={-300} width={40} height={70} rx={6} fill={C.yellow} opacity={anim === "lights" ? 0.6 + 0.4 * Math.sin(f / 6) : 0.9} />}
        </g>
      ))}
      {/* roll-up gate */}
      <rect x={-60} y={-230} width={120} height={230} rx={8} fill={C.greyDark} />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <rect key={k} x={-60} y={-224 + k * 30} width={120} height={6} fill={shade(C.greyDark, 0.2)} />
      ))}
      {/* side plant block */}
      <rect x={380} y={-260} width={70} height={260} rx={6} fill={shade(wall, 0.1)} />
      <rect x={-520} y={-260} width={60} height={260} rx={6} fill={shade(wall, 0.1)} />
      {/* pipes along the front */}
      <rect x={-460} y={-40} width={920} height={14} rx={6} fill={C.yellowDark} />
      <rect x={-460} y={-40} width={920} height={40} rx={6} fill={C.greyDark} opacity={0.0} />
      {/* ground-level grass strip */}
      <rect x={-520} y={-24} width={1040} height={24} rx={8} fill={C.grey} opacity={0.5} />
    </g>
  );
}
