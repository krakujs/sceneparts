import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";
import { Pyramid } from "../pyramid/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <>{[0, 1, 2].map((i) => <Pyramid key={i} x={p.x + i * 300} y={p.y} s={p.s * [1, 0.75, 0.55][i]} />)}</>;
}
