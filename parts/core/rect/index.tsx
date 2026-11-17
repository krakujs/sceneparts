import React from "react";
import type { PartProps } from "@sceneparts/core";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.rx} fill={p.c ?? p.style.ink} opacity={p.o} />;
}
