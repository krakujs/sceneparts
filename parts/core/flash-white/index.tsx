import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Flash white: a quick full-frame flash. It ramps up over `attack` frames, then decays over `decay` frames.
// Overlay: drawn on top of the scene, and it fades back to nothing.

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const a = Math.max(0, Number(p.attack ?? 2));
  const d = Math.max(1, Number(p.decay ?? 10));
  const peak = clamp(Number(p.peak ?? 1), 0, 1);
  const op = lf < a ? (lf + 1) / (a + 1) : Math.max(0, 1 - (lf - a) / d);
  if (op <= 0.001) return null;
  return <rect x={-40} y={-40} width={1160} height={2000} fill={String(p.color || "#ffffff")} opacity={op * peak} />;
}
