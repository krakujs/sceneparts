import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Corner shop: a two-storey front with a striped awning over a display window, a door and a sign board.
// Origin = floor centre. About 640 px wide and 720 px tall at s = 1.
// anim "lights": the shop window lights up and the sign lamp glows in turn.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.sand;
  const awning = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const glow = anim === "lights" ? 0.6 + 0.3 * Math.sin(f / 7) : 0.85;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={20} fill={C.shadow} />
      {/* building */}
      <rect x={-300} y={-720} width={600} height={720} rx={10} fill={wall} />
      <rect x={-300} y={-720} width={600} height={18} rx={6} fill={shade(wall, 0.15)} />
      {/* upper floor windows */}
      {[-200, -40, 120].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={-640} width={120} height={110} rx={8} fill={C.skyDeep} />
          <rect x={wx + 10} y={-630} width={26} height={90} fill={C.white} opacity={0.45} />
          <rect x={wx - 8} y={-656} width={136} height={14} rx={5} fill={shade(wall, 0.2)} />
        </g>
      ))}
      {/* sign board */}
      <rect x={-200} y={-520} width={400} height={56} rx={10} fill={C.white} />
      <rect x={-180} y={-506} width={360} height={28} rx={6} fill={C.greyLight} />
      <circle cx={-170} cy={-492} r={8} fill={C.yellow} opacity={anim === "lights" ? glow : 0.9} />
      {/* striped awning over the shop front */}
      {[-300, -220, -140, -60, 20, 100, 180, 260].map((ax, i) => (
        <path key={ax} d={`M ${ax} -450 L ${ax + 80} -450 L ${ax + 90} -390 L ${ax + 10} -390 Z`} fill={i % 2 ? C.white : awning} />
      ))}
      <path d="M -300 -450 L 300 -450 L 300 -440 L -300 -440 Z" fill={shade(awning, 0.2)} />
      {/* scalloped valance */}
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={-290 + i * 60} cy={-388} r={16} fill={i % 2 ? C.white : awning} />
      ))}
      {/* display window */}
      <rect x={-260} y={-360} width={200} height={230} rx={8} fill={C.ink} opacity={0.2} />
      <rect x={-250} y={-350} width={180} height={210} rx={6} fill={C.skyDeep} opacity={anim === "lights" ? glow : 0.9} />
      <rect x={-236} y={-336} width={34} height={180} fill={C.white} opacity={0.5} />
      {/* goods in the window */}
      <rect x={-220} y={-180} width={60} height={40} rx={6} fill={C.red} />
      <rect x={-140} y={-200} width={50} height={60} rx={6} fill={C.yellow} />
      <circle cx={-70} cy={-170} r={20} fill={C.orange} />
      <rect x={-120} y={-120} width={60} height={40} rx={6} fill={C.green} />
      {/* door with a glass panel */}
      <rect x={40} y={-360} width={170} height={360} rx={8} fill={C.brownDark} />
      <rect x={58} y={-340} width={134} height={150} rx={6} fill={C.skyDeep} />
      <rect x={70} y={-330} width={22} height={130} fill={C.white} opacity={0.5} />
      <rect x={180} y={-200} width={12} height={40} rx={5} fill={C.yellow} />
      {/* step and kerb */}
      <rect x={20} y={-20} width={210} height={20} rx={6} fill={C.greyLight} />
      <rect x={-340} y={-8} width={680} height={8} rx={4} fill={C.grey} opacity={0.6} />
    </g>
  );
}
