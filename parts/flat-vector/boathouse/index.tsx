import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Boathouse on the water: a plank building on piles with a gable roof, a big panelled door, two lanterns and a
// rowboat in front. Origin = water line at the centre. About 900 px wide and 660 px tall at s = 1.
// anim "lights": the two lanterns beside the door light up in turn.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.teal;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const lamp = (k: number) => anim === "lights" && Math.floor(f / 10) % 2 === k;
  const planks = Array.from({ length: 11 }, (_, i) => -410 + i * 34);
  const piles = Array.from({ length: 9 }, (_, i) => -320 + i * 80);
  const hw = (yy: number) => 380 * ((yy + 640) / 240);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={460} ry={16} fill={C.shadow} />
        <rect x={-500} y={-46} width={1000} height={46} fill={C.skyDeep} />
        {[-420, -250, 60, 300].map((wx) => <rect key={`wv${wx}`} x={wx} y={-30} width={80} height={5} rx={2} fill={C.white} opacity={0.6} />)}
        {/* piles and floor */}
        {piles.map((px) => <rect key={`pl${px}`} x={px - 9} y={-80} width={18} height={40} fill={shade(wall, 0.35)} />)}
        <rect x={-340} y={-90} width={680} height={22} fill={shade(wall, 0.2)} />
        {/* walls with plank lines */}
        <rect x={-330} y={-420} width={660} height={332} fill={wall} />
        {planks.map((py) => <rect key={`pk${py}`} x={-330} y={py} width={660} height={4} fill={shade(wall, 0.12)} />)}
        {/* roof */}
        <path d="M -380 -400 L 0 -640 L 380 -400 Z" fill={roof} />
        {[-500, -560, -610].map((ry) => <rect key={`sh${ry}`} x={-hw(ry)} y={ry} width={hw(ry) * 2} height={8} fill={shade(roof, 0.25)} />)}
        <rect x={-390} y={-412} width={780} height={16} rx={6} fill={shade(roof, 0.25)} />
        {/* big panelled door */}
        <rect x={-160} y={-390} width={320} height={22} fill={shade(wall, 0.2)} />
        <rect x={-150} y={-368} width={300} height={288} fill={C.white} />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={`dp${i}`} x={-150 + i * 33.3} y={-368} width={3} height={288} fill={C.greyLight} />
        ))}
        <rect x={-150} y={-260} width={300} height={8} fill={C.greyLight} />
        <rect x={-150} y={-160} width={300} height={8} fill={C.greyLight} />
        <circle cx={120} cy={-220} r={7} fill={C.yellow} />
        <circle cx={0} cy={-500} r={26} fill={C.sky} />
        <rect x={-30} y={-500} width={60} height={4} fill={C.white} opacity={0.8} />
        {/* lanterns beside the door */}
        {[-220, 220].map((lx, k) => (
          <g key={`lt${lx}`}>
            <rect x={lx - 3} y={-330} width={6} height={28} fill={C.greyDark} />
            <circle cx={lx} cy={-340} r={20} fill={lamp(k) ? C.yellow : C.greyLight} />
          </g>
        ))}
        {/* rowboat in front */}
        <path d="M 90 -52 L 470 -52 Q 440 -10 380 -10 L 180 -10 Q 120 -10 90 -52 Z" fill={C.white} />
        <path d="M 96 -52 L 464 -52 L 458 -40 L 102 -40 Z" fill={C.red} />
        <rect x={120} y={-72} width={320} height={6} rx={3} fill={C.brown} />
      </g>
    </g>
  );
}
