import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Zz: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => (
  <g fontFamily="Georgia, serif" fontWeight={700} fill={INK}>
    {[0, 1, 2].map((i) => {
      const t = ((f + i * 12) % 36) / 36;
      return <text key={i} x={x + i * 40 + t * 30} y={y - i * 60 - t * 80} fontSize={60 + i * 14} opacity={1 - t * 0.6}>Z</text>;
    })}
  </g>
);

// decorative register bands (top sky band with stars, bottom ground line + zigzag)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Zz x={p.x} y={p.y} f={p.f} />;
}
