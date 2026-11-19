import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Unicorn: white horse with a spiral golden horn and pastel mane and tail; side view facing right.
// Feet at (0,0); about 1100 px tall at s = 1. anim: sway (mane and tail float) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const PASTEL = ["#F7B6D2", "#C7B6F2", "#A8E6D6", "#FFE9A6"];
const WHITE = "#FFFFFF", WSHADE = "#E3E7F4", WFAR = "#D6DCEE", GOLD = "#FFC83D", GOLD_D = "#E0A21F";

const Leg = ({ lx, dx, c }: { lx: number; dx: number; c: string }) => (
  <g>
    <path d={`M ${lx} -450 L ${lx + dx} -70`} stroke={c} strokeWidth={60} strokeLinecap="round" />
    <rect x={lx + dx - 32} y={-62} width={64} height={62} rx={10} fill={GOLD_D} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const anim: string = p.anim ?? "sway";
  const sw = anim === "sway" ? Math.sin(f * 0.06) * 3 : 0;
  const strands = (d: string, w: number, dx: number, dy: number) =>
    [3, 2, 1, 0].map((i) => (
      <path key={i} d={d} transform={`translate(${i * dx} ${i * dy})`} stroke={PASTEL[i]} strokeWidth={w} fill="none" strokeLinecap="round" />
    ));
  const spiral = [0.2, 0.4, 0.6, 0.8].map((h) => {
    const yy = -985 - 165 * h, cx = 336 + 30 * h, w = 20 * (1 - h) + 2;
    return <path key={h} d={`M ${cx - w} ${yy} L ${cx + w} ${yy - 12}`} stroke="#FFF3B0" strokeWidth={7} strokeLinecap="round" />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={260} ry={22} fill={C.shadow} />
      <Leg lx={-150} dx={10} c={WFAR} />
      <Leg lx={170} dx={14} c={WFAR} />
      <g transform={`rotate(${sw} -225 -600)`}>
        {strands("M -225 -600 Q -340 -560 -330 -420 Q -322 -340 -368 -280", 40, 14, -6)}
      </g>
      <path d="M -230 -560 C -240 -680 -120 -720 0 -700 C 130 -690 220 -640 240 -560 C 250 -500 200 -440 110 -430 L -140 -430 C -200 -430 -226 -490 -230 -560 Z" fill={WHITE} />
      <path d="M -150 -470 L 120 -470 L 110 -430 L -140 -430 Z" fill={WSHADE} />
      <Leg lx={-210} dx={-12} c={WHITE} />
      <Leg lx={120} dx={20} c={WHITE} />
      <path d="M 170 -640 Q 240 -770 300 -860" stroke={WHITE} strokeWidth={150} strokeLinecap="round" fill="none" />
      <g transform={`rotate(${-sw} 240 -760)`}>
        {strands("M 250 -860 Q 170 -760 100 -640", 46, 22, -4)}
      </g>
      <path d="M 260 -960 C 300 -1000 360 -990 390 -950 L 470 -860 C 490 -835 470 -800 440 -800 L 385 -820 C 350 -830 320 -820 300 -840 C 270 -870 240 -920 260 -960 Z" fill={WHITE} />
      <path d="M 420 -860 L 470 -860 L 460 -806 L 420 -806 Z" fill="#F7C9DA" opacity={0.6} />
      <path d="M 270 -975 L 284 -1036 L 326 -982 Z" fill={WSHADE} />
      <path d="M 316 -985 Q 338 -1080 366 -1150 Q 376 -1080 356 -985 Z" fill={GOLD} />
      <path d="M 340 -985 Q 355 -1080 366 -1150 Q 376 -1080 356 -985 Z" fill={GOLD_D} opacity={0.35} />
      {spiral}
      <circle cx={380} cy={-895} r={18} fill="#F7B6D2" opacity={0.6} />
      <ellipse cx={345} cy={-928} rx={14} ry={12} fill={C.ink} />
      <circle cx={350} cy={-933} r={4} fill="#FFFFFF" />
      <path d="M 328 -942 Q 342 -956 360 -942" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={466} cy={-842} r={6} fill="#D98FAE" />
      <path d="M 420 -800 Q 440 -790 455 -806" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
}
