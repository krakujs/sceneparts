import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Stars: React.FC<{ n?: number; seed?: number; f?: number }> = ({ n = 40, seed = 3, f = 0 }) => {
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = r() * 1080, y = r() * 1300 + 100, k = 10 + r() * 14;
        return <path key={i} opacity={0.6 + 0.4 * Math.sin(f * 0.2 + i)} d={`M${x} ${y - k} L${x + k * 0.3} ${y - k * 0.3} L${x + k} ${y} L${x + k * 0.3} ${y + k * 0.3} L${x} ${y + k} L${x - k * 0.3} ${y + k * 0.3} L${x - k} ${y} L${x - k * 0.3} ${y - k * 0.3} Z`} fill={P.gold} />;
      })}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Stars n={p.n} seed={p.seed} f={p.f} />;
}
