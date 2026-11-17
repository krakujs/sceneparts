import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const NutArch: React.FC<{ f?: number; sun?: number }> = ({ f = 0, sun = 0.5 }) => {
  // Nut arched over the earth, stars on her body; a sun travels along her (sun 0 = swallowed in the west, 1 = born in the east)
  const sx = 140 + sun * 800, sy = 520 + Math.abs(sun - 0.5) * 900;
  return (
    <g>
      <path d="M90 1500 L90 600 Q90 330 540 330 Q990 330 990 600 L990 1500 L900 1500 L900 620 Q900 430 540 430 Q180 430 180 620 L180 1500 Z" fill="#2c4f9e" stroke={INK} strokeWidth={10} />
      {Array.from({ length: 22 }).map((_, i) => {
        const a = Math.PI * (i / 21);
        const cx = 540 - Math.cos(a) * 405, cy = 600 - Math.sin(a) * 220;
        return <circle key={i} cx={cx} cy={cy} r={9} fill={P.gold} opacity={0.6 + 0.4 * Math.sin(f * 0.3 + i)} />;
      })}
      <circle cx={70} cy={1500} r={0} />
      <circle cx={sx} cy={sy} r={70} fill={P.scarlet} stroke={INK} strokeWidth={8} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <NutArch f={p.f} sun={p.sun} />;
}
