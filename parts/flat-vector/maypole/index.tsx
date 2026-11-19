import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Maypole: a tall pole with a flower crown on top and six coloured ribbons streaming from the top down
// and out to the ground. Origin = bottom centre of the pole (the base stands on y, the floor line).
// About 720 px wide and 1080 px tall at s = 1. anim "sway" makes the ribbons flutter in the breeze.
const f1 = (v: number) => v.toFixed(1);
const RIBBONS = [C.red, C.yellow, C.teal, C.blue, C.lime, C.purple];
const START = [-75, -45, -15, 15, 45, 75];
const END = [-330, -210, -90, 90, 210, 330];
const TOP = -1040;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const pole = p.color && p.color !== "none" ? p.color : C.brown;
  const flower = p.color2 && p.color2 !== "none" ? p.color2 : C.pink;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? 1 + 0.05 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const sway = anim === "sway";
  const crown = Array.from({ length: 9 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 9;
    return [f1(Math.cos(a) * 128), f1(TOP - 6 + Math.sin(a) * 46)];
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(pop)})`}>
        {/* stone base and pole */}
        <rect x={-46} y={-30} width={92} height={30} rx={8} fill={C.grey} />
        <rect x={-13} y={TOP} width={26} height={TOP * -1 - 30} fill={pole} />
        <rect x={-13} y={TOP} width={26} height={22} fill={shade(pole, 0.2)} />
        {/* ribbons: each starts near the top and streams down and out to the ground */}
        {RIBBONS.map((c, i) => {
          const sx = START[i], ex = END[i];
          const wave = sway ? Math.sin((f * 2 * Math.PI) / 70 + i * 0.9) * (18 + i * 2) : 0;
          const d = `M ${f1(sx)} ${TOP + 6} C ${f1(sx + (ex - sx) * 0.2 + wave)} ${TOP * 0.55} ${f1(ex * 0.8 - wave)} ${TOP * 0.3} ${f1(ex)} -4`;
          return <path key={i} d={d} stroke={c} strokeWidth={22} fill="none" strokeLinecap="butt" />;
        })}
        {/* flower crown wreath around the top of the pole */}
        <ellipse cx={0} cy={TOP - 6} rx={128} ry={46} fill="none" stroke={C.green} strokeWidth={10} />
        {crown.map(([fx, fy], i) => (
          <g key={i} transform={`translate(${fx} ${fy})`}>
            {[0, 1, 2, 3, 4].map((k) => {
              const a = (k * 2 * Math.PI) / 5;
              return <circle key={k} cx={f1(Math.cos(a) * 12)} cy={f1(Math.sin(a) * 12)} r={10} fill={flower} />;
            })}
            <circle cx={0} cy={0} r={7} fill={C.yellow} />
          </g>
        ))}
        <rect x={-10} y={TOP - 14} width={20} height={20} rx={6} fill={shade(pole, 0.2)} />
      </g>
    </g>
  );
}
