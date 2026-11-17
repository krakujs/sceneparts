import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export const Moon: React.FC<{ x: number; y: number; r?: number; bite?: number }> = ({ x, y, r = 110, bite = 0 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#f2efe6" {...S} />
    {bite > 0 && <circle cx={x + r * (1.4 - bite)} cy={y - r * 0.1} r={r} fill="#e6cb94" />}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Moon x={p.x} y={p.y} r={p.r} bite={p.bite} />;
}
