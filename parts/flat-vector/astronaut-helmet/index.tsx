import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Astronaut helmet: a round white space helmet with a gold reflective visor, a grey neck ring and a small status light.
// No markings. Prop: origin = bottom centre of the neck ring; about 560 px wide at s = 1.
const GOLD = "#FFC83D";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, visor = GOLD, shell = "#F4F7FB", anim = "glint" } = p as any;
  const gid = "astronaut-helmet-visor";
  const cid = "astronaut-helmet-clip";
  // The glint band sweeps across the visor every 120 frames.
  const t = (f % 120) / 120;
  const bx = -360 + t * 720;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(visor, 0.22)} />
          <stop offset="0.45" stopColor={visor} />
          <stop offset="1" stopColor={shade(visor, 0.32)} />
        </linearGradient>
        <clipPath id={cid}>
          <rect x={-196} y={-466} width={392} height={272} rx={138} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={6} rx={200} ry={16} fill={C.shadow} />
      {/* neck ring */}
      <rect x={-180} y={-70} width={360} height={70} rx={30} fill="#8E99AA" />
      <rect x={-160} y={-60} width={320} height={12} rx={6} fill={C.white} opacity={0.5} />
      <circle cx={-150} cy={-30} r={7} fill="#5D6578" />
      <circle cx={150} cy={-30} r={7} fill="#5D6578" />
      {/* shell: a lit crescent on a shaded base */}
      <circle cx={0} cy={-330} r={280} fill={shade(shell, 0.14)} />
      <circle cx={-10} cy={-340} r={270} fill={shell} />
      <path d="M -200 -460 Q -232 -330 -192 -200" stroke={C.white} strokeWidth={22} strokeLinecap="round" fill="none" opacity={0.6} />
      <circle cx={232} cy={-150} r={14} fill="#3DE0A0" />
      {/* visor frame and gold visor */}
      <rect x={-210} y={-480} width={420} height={300} rx={150} fill="#C2CAD6" />
      <rect x={-196} y={-466} width={392} height={272} rx={138} fill={`url(#${gid})`} />
      {anim === "glint" && (
        <g clipPath={`url(#${cid})`}>
          <path d={`M ${bx.toFixed(1)} -500 L ${(bx + 70).toFixed(1)} -500 L ${(bx - 150).toFixed(1)} 300 L ${(bx - 220).toFixed(1)} 300 Z`} fill={C.white} opacity={0.35} />
        </g>
      )}
      <path d="M -150 -420 Q -110 -440 -60 -440 L -150 -360 Z" fill={C.white} opacity={0.5} />
      <path d="M -120 -300 Q -90 -320 -70 -320 L -120 -270 Z" fill={C.white} opacity={0.35} />
      {/* chest light */}
      <circle cx={-200} cy={-180} r={16} fill={C.red} />
      <circle cx={-200} cy={-180} r={7} fill={C.white} opacity={0.6} />
    </g>
  );
}
