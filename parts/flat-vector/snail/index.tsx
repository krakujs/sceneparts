import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector garden snail crawling on the ground. Origin = bottom centre (y). About 200 px long at s = 1.
// Faces right, honours flip, s and vx. pose idle: slow eye-stalk sway.
// crawl: body stretches and relaxes in a slow wave while the eye stalks swing.

const SHELL = "#A46B3C", SHELL_DK = shade(SHELL, 0.35);
// Archimedean spiral around the shell centre (-24, -96), built once.
const SPIRAL = (() => {
  const pts: string[] = [];
  for (let k = 0; k <= 60; k++) {
    const th = k * 0.2, r = 4 + th * 4.2;
    pts.push(`${(-24 + r * Math.cos(th)).toFixed(1)} ${(-96 + r * Math.sin(th)).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
})();

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const BODY = p.color ?? "#BDB09A", DK = shade(BODY, 0.22);
  const crawl = pose === "crawl";
  const st = crawl ? Math.sin(f * 0.12) * 0.05 : 0;
  const sway = Math.sin(f * (crawl ? 0.12 : 0.05)) * (crawl ? 6 : 3);

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s}) scale(0.85)`}>
      <g transform={`scale(${1 + st} ${1 - st * 0.6})`}>
        <path d="M -120 0 L -120 -18 C -120 -32 -104 -38 -80 -38 L 56 -38 C 84 -38 112 -34 116 -18 C 118 -6 114 0 104 0 Z" fill={BODY} />
        <path d="M -118 -12 C -40 -2 40 -4 112 -12 C 112 -6 110 0 104 0 L -116 0 Z" fill={DK} />
        <g transform={`rotate(${sway} 88 -36)`}>
          <path d="M 88 -34 C 90 -60 94 -76 96 -94" fill="none" stroke={DK} strokeWidth={7} strokeLinecap="round" />
          <path d="M 104 -34 C 110 -58 114 -74 120 -88" fill="none" stroke={DK} strokeWidth={7} strokeLinecap="round" />
          <g transform="translate(96 -98)">
            <circle r={9} fill="#1F2433" />
            <circle cx={3} cy={-3} r={2.5} fill="#FFFFFF" />
          </g>
          <g transform="translate(120 -92)">
            <circle r={9} fill="#1F2433" />
            <circle cx={3} cy={-3} r={2.5} fill="#FFFFFF" />
          </g>
        </g>
        <circle cx={-24} cy={-96} r={62} fill={SHELL} />
        <path d={SPIRAL} fill="none" stroke={SHELL_DK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}
