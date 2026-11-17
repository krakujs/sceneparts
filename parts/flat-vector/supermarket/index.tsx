import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Supermarket: a wide glass front with a sign band, a trolley bay with carts and a shopping-cart icon on the sign.
// Origin = floor centre. About 1000 px wide and 600 px tall at s = 1.
// anim "lights": the sign and the glass front light up in turn.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.greyLight;
  const sign = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const glow = anim === "lights" ? 0.6 + 0.35 * Math.sin(f / 6) : 0.9;
  const trolleys = [0, 1, 2];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={520} ry={22} fill={C.shadow} />
      {/* building body */}
      <rect x={-480} y={-460} width={960} height={460} rx={10} fill={wall} />
      {/* sign band with cart icon (no lettering) */}
      <rect x={-480} y={-520} width={960} height={80} rx={10} fill={sign} />
      <rect x={-480} y={-460} width={960} height={20} fill={shade(sign, 0.2)} />
      <rect x={-440} y={-506} width={70} height={48} rx={8} fill={C.white} opacity={anim === "lights" ? glow : 0.95} />
      <g transform="translate(-420 -494)">
        <path d="M 0 4 L 10 4 L 18 26 L 46 26 L 54 8 L 14 8" fill="none" stroke={sign} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={22} cy={34} r={4} fill={sign} />
        <circle cx={44} cy={34} r={4} fill={sign} />
      </g>
      {/* wide glass front */}
      <rect x={-440} y={-400} width={880} height={300} rx={8} fill={C.skyDeep} opacity={anim === "lights" ? glow : 0.9} />
      {[-300, -160, -20, 120, 260].map((mx) => (
        <rect key={mx} x={mx} y={-400} width={10} height={300} fill={C.white} opacity={0.7} />
      ))}
      <path d="M -420 -390 L -360 -390 L -330 -120 L -390 -120 Z" fill={C.white} opacity={0.35} />
      {/* entrance doors */}
      <rect x={-70} y={-300} width={140} height={300} rx={6} fill={C.greyDark} />
      <rect x={-60} y={-290} width={56} height={280} fill={C.skyDeep} />
      <rect x={4} y={-290} width={56} height={280} fill={C.skyDeep} />
      <rect x={-6} y={-300} width={12} height={300} fill={C.greyDark} />
      {/* shelves of goods seen through the glass */}
      {[-360, -220, 180, 320].map((gx, i) => (
        <g key={gx}>
          <rect x={gx} y={-230} width={110} height={8} rx={3} fill={C.greyDark} />
          <rect x={gx + 6} y={-260} width={26} height={30} rx={4} fill={[C.red, C.yellow, C.orange, C.teal][i]} />
          <rect x={gx + 38} y={-260} width={26} height={30} rx={4} fill={[C.blue, C.pink, C.lime, C.purple][i]} />
          <rect x={gx + 70} y={-260} width={26} height={30} rx={4} fill={[C.white, C.red, C.teal, C.yellow][i]} />
        </g>
      ))}
      {/* trolley bay at the right */}
      {trolleys.map((i) => (
        <g key={i} transform={`translate(${f1(360 + i * 36)} 0)`}>
          <rect x={0} y={-150} width={34} height={130} rx={4} fill={C.greyDark} opacity={0.55} />
          <line x1={0} y1={-150} x2={-10} y2={-170} stroke={C.greyDark} strokeWidth={5} />
          <circle cx={5} cy={-2} r={5} fill={C.ink} />
          <circle cx={29} cy={-2} r={5} fill={C.ink} />
        </g>
      ))}
      <rect x={340} y={-160} width={120} height={8} rx={3} fill={C.yellowDark} />
      {/* bollard row by the kerb */}
      {[-440, 440].map((bx) => (
        <rect key={bx} x={bx - 10} y={-60} width={20} height={60} rx={6} fill={C.yellowDark} />
      ))}
      <rect x={-520} y={-6} width={1040} height={12} rx={4} fill={C.grey} opacity={0.6} />
    </g>
  );
}
