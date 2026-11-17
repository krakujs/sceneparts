import React from "react";
import type { PartProps } from "@sceneparts/core";

// A falling sweat drop: nervous, scared, hot. Loops every 12 frames.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const y = p.y + (p.f % 12) * 3;
  return <path transform={`translate(${p.x} ${y}) scale(${p.s})`} d="M0 0 q10 20 0 30 q-10 -10 0 -30" fill={p.c} stroke={p.style.ink} strokeWidth={4} />;
}
