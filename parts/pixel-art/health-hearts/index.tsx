import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Icon } from "../backdrop/index";

// Health hearts: pixel-art health row (reference for HUD bars). Full, half and empty hearts for max / value; when
// health drops low the row beats up and down so the player notices. Transparent around the hearts.

const CELL = 10;
const PITCH = 112;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  if (p.f < (p.at ?? 0)) return <g />;
  const max = Math.max(1, Math.round(p.max ?? 5));
  const value = Math.max(0, Math.min(max, p.value ?? 3.5));
  const low = value <= Math.max(1, max * 0.4);
  const beat = (p.anim ?? "beat") === "beat" && low ? (Math.floor(p.f / 12) % 2) * -10 : 0;
  const width = (max - 1) * PITCH + 100;
  const left = -width / 2;
  const hearts = Array.from({ length: max }, (_, i) => {
    if (value >= i + 1) return "heart";
    if (value >= i + 0.5) return "half";
    return "empty";
  });
  const pop = (p.s ?? 1);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${pop})`}>
      {hearts.map((name, i) => (
        <Icon key={i} name={name} x={left + i * PITCH} y={-50 + beat} cell={CELL} />
      ))}
    </g>
  );
}
