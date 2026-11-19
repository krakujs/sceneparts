import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dragon egg: a large, smooth, tall oval shell covered in overlapping scales, a few glowing golden cracks and a
// golden aura, resting in a nest of rocks. Origin = bottom centre of the nest; about 580 px tall at s = 1.
// anim wobble: the egg rocks gently in its nest and the cracks and aura pulse.
/* eslint-disable @typescript-eslint/no-explicit-any */
const TEAL = "#1FA39A", GOLD = "#FFC83D", STRAW = "#E9D3A9", ROCK = "#9AA3B5";
const f1 = (v: number) => v.toFixed(1);

// Smooth egg outline, taller than wide, centred on x = 0, bottom at y = -20 and top at y = -560.
const EGG = "M 0 -560 C 110 -560 165 -400 165 -270 C 165 -120 90 -20 0 -20 C -90 -20 -165 -120 -165 -270 C -165 -400 -110 -560 0 -560 Z";

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const shell: string = p.color && p.color !== "none" ? p.color : "#7B5CD6";
  const shellD = shade(shell, 0.2);
  const on = p.anim === "wobble";
  const rock = on ? Math.sin((f * 2 * Math.PI) / 56) * 4 : 0;
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40);
  const aura = on ? 0.6 + 0.4 * pulse : 0.6;
  const cid = "dragon-egg-shell-clip";

  // Scales: rows of overlapping half-discs, alternating colours; clipped to the egg outline.
  const scales: React.ReactNode[] = [];
  let k = 0;
  for (let row = 0; row < 9; row++) {
    const yy = -530 + row * 36;
    const off = row % 2 ? 24 : 0;
    for (let col = -5; col <= 5; col++) {
      const xx = col * 48 + off;
      const fill = k % 3 === 0 ? TEAL : k % 3 === 1 ? shell : shellD;
      scales.push(<path key={`${row}-${col}`} d={`M ${xx - 26} ${yy} A 26 26 0 0 0 ${xx + 26} ${yy} Z`} fill={fill} stroke={shellD} strokeWidth={3} />);
      k++;
    }
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      {/* golden aura and ground shadow */}
      <ellipse cx={0} cy={-6} rx={230} ry={26} fill={C.shadow} />
      <circle cx={0} cy={-300} r={270} fill={GOLD} opacity={0.12 * aura} />
      <circle cx={0} cy={-300} r={220} fill={GOLD} opacity={0.2 * aura} />
      {/* egg, rocking about its base */}
      <g transform={`rotate(${f1(rock)} 0 -20)`}>
        <defs>
          <clipPath id={cid}>
            <path d={EGG} />
          </clipPath>
        </defs>
        <path d={EGG} fill={shell} />
        <g clipPath={`url(#${cid})`}>
          {scales}
          {/* shade on the right side for depth */}
          <path d="M 70 -560 C 150 -500 190 -360 150 -200 C 130 -110 90 -40 40 -20 L 200 -20 L 200 -560 Z" fill={shellD} opacity={0.35} />
        </g>
        {/* glowing golden cracks */}
        <g opacity={0.55 + 0.45 * pulse} stroke={GOLD} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -40 -380 L -8 -352 L -30 -318 L 6 -286" />
          <path d="M 58 -250 L 30 -218 L 50 -186" />
        </g>
        <g opacity={0.25 + 0.3 * pulse} stroke={C.white} strokeWidth={3} fill="none" strokeLinecap="round">
          <path d="M -40 -380 L -8 -352 L -30 -318 L 6 -286" />
          <path d="M 58 -250 L 30 -218 L 50 -186" />
        </g>
      </g>
      {/* straw and rocks nest in front of the egg base */}
      <path d="M -200 -48 Q 0 -112 200 -48 L 200 -6 Q 0 -20 -200 -6 Z" fill={STRAW} />
      <path d="M -120 -30 L -60 -60 M 40 -40 L 110 -72 M 110 -26 L 170 -46" stroke={shade(STRAW, 0.2)} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={-130} cy={-30} rx={44} ry={32} fill={ROCK} stroke={shade(ROCK, 0.25)} strokeWidth={5} />
      <ellipse cx={-30} cy={-16} rx={52} ry={38} fill={shade(ROCK, 0.1)} stroke={shade(ROCK, 0.3)} strokeWidth={5} />
      <ellipse cx={70} cy={-22} rx={48} ry={34} fill={ROCK} stroke={shade(ROCK, 0.25)} strokeWidth={5} />
      <ellipse cx={156} cy={-34} rx={38} ry={28} fill={shade(ROCK, 0.1)} stroke={shade(ROCK, 0.3)} strokeWidth={5} />
    </g>
  );
}
