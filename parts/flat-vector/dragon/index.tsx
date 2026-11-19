import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big four-legged winged dragon, side view facing right. Feet at (0,0); about 900 px tall at s = 1.
// wings: open | folded. anim: breathe (chest rises) | fire (flame burst from the snout) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const spikeTop = (sx: number) => -330 - 140 * Math.sqrt(Math.max(0, 1 - ((sx - 20) / 250) ** 2));
const SPIKES = [-170, -110, -50, 10, 70, 130, 190];
const WING_OPEN = "M 60 -440 C -20 -560 -110 -760 -90 -860 C -40 -800 -10 -790 30 -800 C 40 -840 90 -870 150 -860 C 120 -800 150 -740 230 -690 C 170 -640 130 -560 110 -430 Z";
const WING_FOLDED = "M 60 -440 C 0 -500 -120 -530 -210 -470 C -130 -430 -70 -380 0 -330 Z";
const BONES_OPEN = "M 60 -440 L -90 -860 M 60 -440 L 30 -800 M 60 -440 L 150 -860 M 60 -440 L 230 -690";
const BONES_FOLDED = "M 60 -440 L -210 -470";

const Leg = ({ lx, c, dark, ink }: { lx: number; c: string; dark: string; ink: string }) => (
  <g>
    <path d={`M ${lx} -280 L ${lx + 8} -70`} stroke={c} strokeWidth={64} strokeLinecap="round" />
    <ellipse cx={lx + 30} cy={-34} rx={62} ry={30} fill={dark} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${lx + 56 + i * 14} -44 L ${lx + 72 + i * 14} -22 L ${lx + 52 + i * 14} -26 Z`} fill={ink} />
    ))}
  </g>
);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : "#E0502F";
  const dark = shade(body, 0.22), far = shade(body, 0.36), ink = C.ink;
  const spike = C.yellow, belly = "#FFC46B";
  const anim: string = p.anim ?? "none";
  const breath = anim === "breathe" ? Math.sin(f * 0.08) * 5 : 0;
  const folded = p.wings === "folded";
  const wing = folded ? WING_FOLDED : WING_OPEN;
  const bones = folded ? BONES_FOLDED : BONES_OPEN;
  const flame = (i: number) => 60 + 16 * Math.sin(f * 0.6 + i * 1.7) + i * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={430} ry={22} fill={C.shadow} />
      <g transform="translate(-60 0)">
        <Leg lx={-200} c={far} dark={shade(body, 0.4)} ink={ink} />
        <Leg lx={-130} c={far} dark={shade(body, 0.4)} ink={ink} />
        <path d="M -200 -360 Q -320 -350 -400 -250 Q -320 -300 -200 -270 Z" fill={body} />
        <path d="M -400 -250 L -456 -226 L -392 -270 Z" fill={spike} />
        <path d={wing} fill={far} transform="translate(-30 0)" />
        <g transform={`translate(0 ${breath})`}>
          {SPIKES.map((sx) => (
            <path key={sx} d={`M ${sx - 24} ${spikeTop(sx) + 24} L ${sx + 2} ${spikeTop(sx) - 60} L ${sx + 26} ${spikeTop(sx) + 24} Z`} fill={spike} />
          ))}
          <path d="M -220 -330 C -220 -440 -100 -480 20 -470 C 150 -460 230 -400 230 -330 C 230 -270 170 -240 60 -240 L -160 -240 C -210 -240 -220 -290 -220 -330 Z" fill={body} />
          <ellipse cx={0} cy={-262} rx={165} ry={28} fill={belly} />
          <path d={wing} fill={body} />
          <path d={bones} stroke={dark} strokeWidth={9} strokeLinecap="round" fill="none" />
          <path d="M 130 -400 Q 250 -500 300 -640" stroke={body} strokeWidth={120} strokeLinecap="round" fill="none" />
          <path d="M 320 -745 Q 300 -820 250 -850 Q 275 -790 296 -730 Z" fill={far} />
          <path d="M 290 -725 Q 255 -800 205 -830 Q 240 -760 268 -695 Z" fill="#F4E3B5" />
          <ellipse cx={330} cy={-670} rx={120} ry={85} fill={body} transform="rotate(-12 330 -670)" />
          <ellipse cx={430} cy={-650} rx={72} ry={50} fill={body} />
          <path d="M 360 -628 Q 400 -606 440 -640 Q 420 -596 360 -612 Z" fill={dark} />
          <path d="M 392 -628 Q 425 -612 452 -640" stroke={ink} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M 398 -624 L 406 -608 L 414 -624 Z M 426 -618 L 434 -602 L 442 -618 Z" fill="#FFFFFF" />
          <path d="M 310 -730 Q 345 -760 378 -722" stroke={ink} strokeWidth={10} fill="none" strokeLinecap="round" />
          <ellipse cx={346} cy={-690} rx={26} ry={22} fill="#FFFFFF" />
          <circle cx={352} cy={-688} r={13} fill={ink} />
          <circle cx={458} cy={-664} r={7} fill={dark} />
        </g>
        <Leg lx={110} c={body} dark={dark} ink={ink} />
        <Leg lx={190} c={body} dark={dark} ink={ink} />
        {anim === "fire" ? (
          <g transform="translate(480 -630)">
            {[-16, 0, 16].map((o, i) => {
              const L = flame(i);
              return <path key={i} d={`M 0 ${o - 14} Q ${L * 0.6} ${o - 26} ${L} ${o} Q ${L * 0.6} ${o + 26} 0 ${o + 14} Z`} fill={i === 1 ? "#FFE07A" : C.orange} />;
            })}
          </g>
        ) : null}
      </g>
    </g>
  );
}
