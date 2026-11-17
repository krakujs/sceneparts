import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { Txt } from "../text/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <g opacity={clamp((p.f - (p.at ?? 0.3) * p.d) / 3)}>
      <Txt x={p.x} y={p.y} text={p.text} size={p.size} c={p.c ?? p.style.accent} ink={p.style.ink} font={p.style.font} />
    </g>
  );
}
