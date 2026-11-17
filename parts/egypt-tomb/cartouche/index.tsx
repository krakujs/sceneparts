import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { Cartouche } from "../style/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Cartouche x={p.x} y={p.y} lines={p.lines} accent={p.accent} size={p.size} pop={p.pop === false ? 1 : pop(p.f, (p.at ?? 0) * p.d + 2)} />;
}
