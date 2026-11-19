import React from "react";
import type { PartProps } from "@sceneparts/core";
import { PAL } from "../style/index";
import { PixText, rnd, snap } from "../backdrop/index";

// Game over screen: full-frame dark screen (reference for end-of-life screens). A big red message, a CONTINUE
// countdown that ticks down from p.f, and small grey specks drifting down the frame.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fall = (p.anim ?? "fall") === "fall";
  const text: string = p.text ?? "GAME OVER";
  const count = Math.max(0, (p.countFrom ?? 9) - Math.floor(p.f / 30));
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill="#07071a" />
      <rect x={0} y={0} width={1080} height={1920} fill="#1b1b2e" opacity={0.35} />
      {Array.from({ length: 48 }).map((_, i) => {
        const x = snap(rnd(21, i) * 1068);
        const y0 = rnd(22, i) * 1920;
        const y = fall ? (y0 + p.f * (3 + (i % 4) * 2)) % 1920 : y0;
        return <rect key={i} x={x} y={snap(y)} width={i % 3 ? 6 : 12} height={i % 3 ? 6 : 12} fill={i % 2 ? PAL.d : PAL.g} opacity={i % 2 ? 0.8 : 0.5} />;
      })}
      <PixText x={540} y={780} text={text} size={124} fill={PAL.r} />
      <PixText x={540} y={1000} text={`CONTINUE? ${count}`} size={56} fill={PAL.w} />
    </g>
  );
}
