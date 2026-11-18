import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small round pond with lily pads, reeds and stones around its rim. Origin = centre of the near edge. About 520 px wide and 330 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
// Stones around the rim: angle in degrees on the rim ellipse (centre 0,-130; radii 250 x 124)
const STONES: [number, number, number, number][] = [[200, 26, 16, 0], [240, 22, 14, 1], [300, 28, 17, 2], [340, 24, 15, 1], [25, 26, 16, 2], [60, 22, 14, 0], [110, 24, 15, 1], [150, 26, 16, 2]];
const REEDS: [number, number, number, number][] = [[-200, -200, -10, 130], [-180, -214, -6, 150], [-215, -186, -14, 110], [200, -205, 10, 130], [180, -214, 6, 150], [214, -190, 14, 110]];
const PADS: [number, number][] = [[-120, -90], [60, -70], [-30, -150], [130, -130], [-160, -150]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const water = col(p.color, "#4AA3D9");
  const bank = col(p.color2, C.green);
  const anim: string = p.anim ?? "none";
  const stoneTone = [C.grey, C.greyLight, C.greyDark];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={250} ry={14} fill={C.shadow} />
        {/* grassy bank */}
        <ellipse cx={0} cy={-130} rx={258} ry={130} fill={bank} />
        {/* reeds at the back */}
        {REEDS.map(([bx, by, dx, h], i) => (
          <g key={i}>
            <path d={`M ${bx} ${by} L ${bx + dx} ${by - h}`} stroke={C.green} strokeWidth={6} strokeLinecap="round" />
            <ellipse cx={bx + dx} cy={by - h} rx={7} ry={18} fill={C.brown} />
          </g>
        ))}
        {/* water */}
        <ellipse cx={0} cy={-118} rx={214} ry={100} fill={water} />
        <ellipse cx={-40} cy={-150} rx={110} ry={14} fill={C.white} opacity={0.25} />
        {/* lily pads and a flower */}
        {PADS.map(([px, py], i) => (
          <g key={i}>
            <ellipse cx={px} cy={py} rx={26} ry={12} fill={C.green} />
            <path d={`M ${px} ${py} L ${px + 26} ${py - 6} L ${px + 26} ${py + 6} Z`} fill={water} />
          </g>
        ))}
        <circle cx={60} cy={-72} r={9} fill={C.pink} />
        <circle cx={60} cy={-72} r={3.5} fill={C.yellow} />
        {/* stones around the rim */}
        {STONES.map(([a, rx, ry, t], i) => {
          const r = (a * Math.PI) / 180;
          return <ellipse key={i} cx={f1(250 * Math.cos(r))} cy={f1(-130 + 124 * Math.sin(r))} rx={rx} ry={ry} fill={stoneTone[t]} />;
        })}
        {anim === "ripple" && [0, 1].map((k) => {
          const ph = ((f + k * 40) % 80) / 80;
          const r = 10 + ph * 90;
          return <ellipse key={k} cx={-40} cy={-100} rx={r} ry={r * 0.42} fill="none" stroke={C.white} strokeWidth={4} opacity={0.7 * (1 - ph)} />;
        })}
      </g>
    </g>
  );
}
