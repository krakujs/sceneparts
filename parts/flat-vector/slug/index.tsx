import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector slug crawling on the ground. Origin = bottom centre (y). About 220 px long at s = 1.
// Faces right, honours flip, s and vx. pose idle: slow eye-stalk sway.
// crawl: body stretches and relaxes in a slow wave while the eye stalks swing.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#C7B83E", DK = shade(SH, 0.22), MANTLE_DK = shade(SH, 0.12);
  const crawl = pose === "crawl";
  const st = crawl ? Math.sin(f * 0.12) * 0.05 : 0;
  const sway = Math.sin(f * (crawl ? 0.12 : 0.05)) * (crawl ? 6 : 3);

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${1 + st} ${1 - st * 0.6})`}>
        <path d="M -130 0 L -130 -16 C -130 -30 -116 -40 -96 -40 L 84 -40 C 110 -40 124 -30 124 -12 C 124 -4 120 0 110 0 Z" fill={SH} />
        <path d="M -128 -6 C -40 -14 40 -14 122 -8 C 122 -4 120 0 110 0 L -120 0 Z" fill={DK} />
        <path d="M -118 -22 Q 0 -16 116 -22" fill="none" stroke={DK} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
        <path d="M -100 -40 C -102 -70 -76 -86 -44 -86 C -14 -86 8 -70 16 -40 Z" fill={SH} />
        <path d="M -100 -40 C -98 -52 -88 -58 -72 -60 C -74 -50 -72 -44 -70 -40 Z" fill={MANTLE_DK} />
        <ellipse cx={-64} cy={-62} rx={8} ry={5} fill={DK} />
        <g transform={`rotate(${sway} 104 -38)`}>
          <path d="M 100 -38 C 102 -60 106 -74 108 -88" fill="none" stroke={DK} strokeWidth={7} strokeLinecap="round" />
          <path d="M 112 -38 C 118 -56 122 -68 128 -80" fill="none" stroke={DK} strokeWidth={7} strokeLinecap="round" />
          <g transform="translate(108 -92)">
            <circle r={8} fill="#1F2433" />
            <circle cx={2.5} cy={-2.5} r={2.2} fill="#FFFFFF" />
          </g>
          <g transform="translate(128 -84)">
            <circle r={8} fill="#1F2433" />
            <circle cx={2.5} cy={-2.5} r={2.2} fill="#FFFFFF" />
          </g>
        </g>
      </g>
    </g>
  );
}
