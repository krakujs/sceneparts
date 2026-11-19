import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hover car: a low, wheel-less futuristic car in side view, facing right, floating on two glowing pads.
// Origin = bottom of the pads (the car hovers above y); about 720 px long and 300 px tall at s = 1.
// anim "hover": the car bobs up and down and the pad glow pulses.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const PADS = [-200, 200];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1400;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const glow = p.glow && p.glow !== "none" ? p.glow : "#6FE7FF";
  const hover = p.anim === "hover";
  const dy = hover ? -(Math.sin((f * 2 * Math.PI) / 80) + 1) * 12 : 0;
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40);
  return (
    <g transform={`translate(${f1(x)} ${f1(y + dy)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* light spilling down onto the ground */}
      <ellipse cx={0} cy={36} rx={330} ry={26} fill={glow} opacity={0.08 + 0.06 * pulse} />
      {/* pads with struts */}
      {PADS.map((px) => (
        <g key={px}>
          <rect x={px - 9} y={-70} width={18} height={56} fill={C.greyDark} />
          <ellipse cx={px} cy={-14} rx={96} ry={22} fill={glow} opacity={0.25 + 0.15 * pulse} />
          <ellipse cx={px} cy={-14} rx={78} ry={13} fill={shade(glow, 0.35)} />
          <ellipse cx={px} cy={-16} rx={58} ry={7} fill={C.white} opacity={0.6} />
        </g>
      ))}
      {/* body shell */}
      <path d="M -330 -110 Q -330 -150 -280 -158 L -170 -170 Q -60 -200 60 -205 L 130 -200 Q 200 -180 250 -130 L 330 -100 Q 360 -92 360 -60 L 360 -40 Q 360 -30 340 -30 L -300 -30 Q -330 -30 -330 -60 Z" fill={body} />
      <path d="M -330 -60 L 360 -60 L 360 -40 Q 360 -30 340 -30 L -300 -30 Q -330 -30 -330 -60 Z" fill={shade(body, 0.22)} />
      {/* glowing side strip */}
      <rect x={-300} y={-96} width={600} height={10} rx={5} fill={glow} opacity={0.9} />
      {/* canopy */}
      <path d="M -40 -150 Q 20 -250 140 -210 L 190 -140 L -40 -140 Z" fill={C.skyDeep} opacity={0.92} />
      <path d="M 10 -170 Q 50 -220 110 -206" stroke={C.white} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* lights */}
      <rect x={342} y={-132} width={16} height={24} rx={6} fill={C.yellow} />
      <rect x={-332} y={-132} width={12} height={26} rx={5} fill={C.red} />
    </g>
  );
}
