import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Roadside single-storey motel: a long low block with a row of room doors and windows, and a tall blank sign on a pole.
// Origin = bottom centre on the ground. About 900 px wide and 1000 px tall at s = 1 (the pole sign reaches the top).
// anim "lights": the sign's lamp border chases in turn with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.sand;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const rooms = [-360, -240, -120, 0, 120, 240, 360];
  const lamps: [number, number][] = [];
  for (let i = 0; i < 8; i++) lamps.push([-150 + i * 42, -1000]), lamps.push([-150 + i * 42, -880]);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={460} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tall pole sign, blank panel with a chasing lamp border */}
        <rect x={-8} y={-880} width={16} height={880} fill={C.greyDark} />
        <rect x={-180} y={-1010} width={360} height={150} rx={14} fill={C.greyDark} />
        <rect x={-164} y={-994} width={328} height={118} rx={10} fill={C.white} />
        {lamps.map(([lx, ly], i) => {
          const on = anim === "lights" && Math.floor(f / 4) % lamps.length === i;
          return <circle key={i} cx={lx} cy={ly + 65} r={5} fill={on ? C.yellow : C.greyLight} />;
        })}
        {/* long low block */}
        <rect x={-430} y={-330} width={860} height={330} rx={12} fill={wall} />
        <rect x={-450} y={-360} width={900} height={40} rx={10} fill={roof} />
        <rect x={-430} y={-32} width={860} height={14} fill={shade(wall, 0.15)} />
        {/* room doors and windows */}
        {rooms.map((rx, i) => (
          <g key={rx}>
            <rect x={rx - 80} y={-255} width={160} height={70} rx={8} fill={C.sky} />
            <rect x={rx - 60} y={-240} width={40} height={40} rx={5} fill={C.white} opacity={0.5} />
            <rect x={rx + 18} y={-185} width={52} height={160} rx={8} fill={i % 2 ? C.teal : C.blue} />
            <circle cx={rx + 60} cy={-100} r={6} fill={C.yellow} />
          </g>
        ))}
        {/* small roof sign strip and a few plant pots */}
        {[-400, 400].map((px) => (
          <g key={px}>
            <rect x={px - 22} y={-54} width={44} height={44} rx={6} fill={C.brown} />
            <circle cx={px} cy={-74} r={28} fill={C.green} />
          </g>
        ))}
      </g>
    </g>
  );
}
