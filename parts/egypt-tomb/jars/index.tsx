import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";
import { Jar } from "../jar/index";

const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <>{Array.from({ length: p.rows }).map((_, r) => Array.from({ length: p.cols }).map((__, c) => <Jar key={`${r}-${c}`} x={p.x + c * p.dx + (r % 2) * 40} y={p.y + r * p.dy} s={p.s} red={p.red} />))}</>;
}
