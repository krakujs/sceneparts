import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL } from "../style/index";
import { Panel, PixText } from "../backdrop/index";

// Score panel: pixel-art score box (reference for HUD panels). A SCORE label, a six-digit score that counts up from
// zero at `speed` points per frame, and a HI line below. Centred on x, y; transparent around the panel.

const W = 480, H = 240;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  if (p.f < (p.at ?? 0)) return <g />;
  const target = Math.max(0, p.score ?? 12450);
  const count = (p.anim ?? "count") === "count";
  const t = Math.max(0, p.f - (p.at ?? 0));
  const value = count ? Math.min(target, Math.floor(t * (p.speed ?? 400))) : target;
  const hi = String(Math.max(0, p.hi ?? 98000)).padStart(6, "0");
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Panel x={-W / 2} y={-H / 2} w={W} h={H} />
      <PixText x={0} y={-H / 2 + 84} text="SCORE" size={40} fill={PAL.w} />
      <PixText x={0} y={-H / 2 + 170} text={String(value).padStart(6, "0")} size={72} fill={PAL.y} />
      <PixText x={0} y={H / 2 - 36} text={`HI ${hi}`} size={34} fill={PAL.m} shadow={false} />
    </g>
  );
}
