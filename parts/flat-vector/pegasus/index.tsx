import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pegasus: white winged horse with feathered wings; side view facing right. Feet at (0,0); about 1150 px tall at s = 1.
// anim: flap (wings beat) | none. The wing root sits on the back at (60,-660).
/* eslint-disable @typescript-eslint/no-explicit-any */
const WHITE = "#FFFFFF", WSHADE = "#E3E7F4", WFAR = "#D6DCEE", HOOF = "#8FA3C8";
const MANE = ["#BFD9F5", "#CFE6F5", "#A8D0F0", "#E6F2FF"];
const feather = (L: number, w: number) =>
  `M ${-w * 0.5} 0 C ${-w * 0.9} ${-L * 0.35} ${-w * 0.6} ${-L * 0.8} 0 ${-L} C ${w * 0.6} ${-L * 0.8} ${w * 0.9} ${-L * 0.35} ${w * 0.5} 0 Z`;
const FEATHERS: [number, number, number][] = [[-8, 390, 70], [-30, 420, 72], [-52, 400, 68], [-74, 350, 60], [-96, 300, 52]];

const Wing = ({ ang, fill, tip, shadeC }: { ang: number; fill: string; tip: string; shadeC: string }) => (
  <g transform={`translate(60 -660) rotate(${ang})`}>
    {FEATHERS.map(([a, L, w], i) => (
      <path key={i} d={feather(L, w)} transform={`rotate(${a})`} fill={i % 2 ? fill : tip} stroke={shadeC} strokeWidth={4} />
    ))}
  </g>
);

const Leg = ({ lx, dx, c }: { lx: number; dx: number; c: string }) => (
  <g>
    <path d={`M ${lx} -450 L ${lx + dx} -70`} stroke={c} strokeWidth={60} strokeLinecap="round" />
    <rect x={lx + dx - 32} y={-62} width={64} height={62} rx={10} fill={HOOF} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const anim: string = p.anim ?? "flap";
  const beat = anim === "flap" ? Math.sin(f * 0.22) : 0;
  const farAng = -10 + beat * 16 - 6, nearAng = -6 + beat * 18;
  const sw = anim === "flap" ? Math.sin(f * 0.06) * 3 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={260} ry={22} fill={C.shadow} />
      <Wing ang={farAng} fill={WFAR} tip={WSHADE} shadeC={WFAR} />
      <Leg lx={-150} dx={10} c={WFAR} />
      <Leg lx={170} dx={14} c={WFAR} />
      <g transform={`rotate(${sw} -225 -600)`}>
        <path d="M -225 -600 Q -340 -560 -330 -420 Q -322 -340 -368 -280" stroke="#BFD9F5" strokeWidth={40} strokeLinecap="round" fill="none" />
      </g>
      <path d="M -230 -560 C -240 -680 -120 -720 0 -700 C 130 -690 220 -640 240 -560 C 250 -500 200 -440 110 -430 L -140 -430 C -200 -430 -226 -490 -230 -560 Z" fill={WHITE} />
      <path d="M -150 -470 L 120 -470 L 110 -430 L -140 -430 Z" fill={WSHADE} />
      <Leg lx={-210} dx={-12} c={WHITE} />
      <Leg lx={120} dx={20} c={WHITE} />
      <path d="M 170 -640 Q 240 -770 300 -860" stroke={WHITE} strokeWidth={150} strokeLinecap="round" fill="none" />
      {[3, 2, 1, 0].map((i) => (
        <path key={i} d="M 250 -860 Q 170 -760 100 -640" transform={`translate(${i * 22} ${-i * 4})`} stroke={MANE[i]} strokeWidth={46} strokeLinecap="round" fill="none" />
      ))}
      <Wing ang={nearAng} fill={WHITE} tip={"#8DBFE8"} shadeC={"#9AB7D9"} />
      <path d="M 260 -960 C 300 -1000 360 -990 390 -950 L 470 -860 C 490 -835 470 -800 440 -800 L 385 -820 C 350 -830 320 -820 300 -840 C 270 -870 240 -920 260 -960 Z" fill={WHITE} />
      <path d="M 270 -975 L 284 -1036 L 326 -982 Z" fill={WSHADE} />
      <circle cx={380} cy={-895} r={18} fill="#F7B6D2" opacity={0.6} />
      <ellipse cx={345} cy={-928} rx={14} ry={12} fill={C.ink} />
      <circle cx={350} cy={-933} r={4} fill="#FFFFFF" />
      <path d="M 328 -942 Q 342 -956 360 -942" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={466} cy={-842} r={6} fill="#9AB7D9" />
      <path d="M 420 -800 Q 440 -790 455 -806" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
}
