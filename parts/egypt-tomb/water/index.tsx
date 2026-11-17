import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Water: React.FC<{ y: number; h?: number; f?: number; color?: string }> = ({ y, h = 160, f = 0, color = P.water }) => (
  <g>
    <rect x={-200} y={y} width={1480} height={h} fill={color} {...S} />
    {Array.from({ length: Math.floor(h / 45) }).map((_, r) => (
      <path key={r} d={Array.from({ length: 34 }).map((__, i) => `${i ? "L" : "M"}${-200 + i * 45 + ((f * 1.5) % 45)} ${y + 28 + r * 45 + (i % 2 ? -14 : 14)}`).join(" ")} fill="none" stroke={INK} strokeWidth={6} />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Water y={p.y} h={p.h} f={p.f} color={p.color ?? P.water} />;
}
