import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";
import { Scorpion } from "../scorpion/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <>{Array.from({ length: p.n }).map((_, i) => <Scorpion key={i} x={p.x + i * p.dx + (p.vx ?? 0) * p.f} y={p.y - (i % 2) * 30} s={p.s} f={p.f + i * 3} flip={p.flip} />)}</>;
}
