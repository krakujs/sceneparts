import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Modern airport terminal: a long glass front under a curved glass roof, with a control tower stub at one end.
// Origin = floor centre. About 1000 px wide and 820 px tall at s = 1.
// anim "lights": the tower beacon blinks and the terminal lamps glow in turn.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const mullions = Array.from({ length: 13 }, (_, i) => -440 + i * 73);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={520} ry={22} fill={C.shadow} />
      {/* apron */}
      <rect x={-520} y={-30} width={1040} height={30} rx={6} fill={C.greyLight} />
      {/* terminal body: low glass front */}
      <rect x={-460} y={-260} width={800} height={230} rx={8} fill={body} />
      <rect x={-460} y={-40} width={800} height={10} fill={shade(body, 0.15)} />
      {/* glass front with mullions */}
      <rect x={-440} y={-240} width={760} height={190} rx={6} fill={C.skyDeep} />
      {mullions.map((mx) => (
        <rect key={mx} x={mx} y={-240} width={6} height={190} fill={C.white} opacity={0.8} />
      ))}
      <path d="M -420 -230 L -380 -230 L -460 -60 L -500 -60 Z" fill={C.white} opacity={0.35} />
      {/* entrance canopy and doors */}
      <rect x={-120} y={-220} width={200} height={180} rx={6} fill={C.greyDark} />
      <rect x={-112} y={-214} width={92} height={172} rx={4} fill={C.sky} opacity={0.9} />
      <rect x={-8} y={-214} width={92} height={172} rx={4} fill={C.sky} opacity={0.9} />
      {/* curved glass roof over the hall */}
      <path d="M -470 -260 Q -240 -420 0 -400 Q 240 -420 460 -260 Z" fill={roof} />
      <path d="M -440 -266 Q -240 -400 0 -384 Q 240 -400 430 -266 Z" fill={C.sky} opacity={0.85} />
      {[-300, -150, 0, 150, 300].map((rx) => (
        <line key={rx} x1={rx} y1={f1(-400 + Math.abs(rx) * 0.1)} x2={rx} y2={-266} stroke={C.white} strokeWidth={4} opacity={0.6} />
      ))}
      <rect x={-470} y={-270} width={940} height={14} rx={6} fill={shade(roof, 0.25)} />
      {/* control tower stub at the right end */}
      <rect x={320} y={-620} width={70} height={590} rx={6} fill={body} />
      <rect x={300} y={-690} width={110} height={90} rx={10} fill={C.skyDeep} />
      <rect x={316} y={-676} width={24} height={62} fill={C.white} opacity={0.5} />
      <rect x={296} y={-706} width={118} height={18} rx={6} fill={roof} />
      <rect x={290} y={-740} width={130} height={20} rx={8} fill={shade(roof, 0.12)} />
      <rect x={350} y={-770} width={10} height={30} fill={C.greyDark} />
      <circle cx={355} cy={-776} r={12} fill={C.red} opacity={anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(f / 4)) : 0.9} />
      {/* windows on the tower shaft */}
      {[-560, -490].map((wy) => (
        <rect key={wy} x={336} y={wy} width={38} height={36} rx={5} fill={C.skyDeep} />
      ))}
      {/* terminal lamps under the canopy */}
      {[-380, -200, -20].map((lx, i) => (
        <circle key={lx} cx={lx} cy={-250} r={9} fill={C.yellow} opacity={anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 0.9} />
      ))}
    </g>
  );
}
