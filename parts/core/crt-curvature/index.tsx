import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// CRT curvature: an old-TV screen border. A dark bezel surrounds a screen whose sides bulge outward,
// with an inner vignette, faint scanlines clipped to the screen, a soft glare and a light rim.

// The screen opening: four bulging sides with rounded corners (quadratic curves bow each side outward).
const SCREEN = "M130 60 Q540 20 950 60 Q1020 60 1020 130 Q1060 960 1020 1790 Q1020 1860 950 1860 Q540 1900 130 1860 Q60 1860 60 1790 Q20 960 60 130 Q60 60 130 60 Z";

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const scan = clamp(Number(p.scan ?? 0.14), 0, 1);
  const vig = clamp(Number(p.vignette ?? 0.6), 0, 1);
  const sd = String(p.seed ?? "crt").replace(/[^a-zA-Z0-9]/g, "_");
  const clipId = `crt-clip-${sd}`;
  const vigId = `crt-vig-${sd}`;
  let lines = "";
  for (let y = 60; y < 1860; y += 9) lines += `M40 ${y}H1040`;
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path d={SCREEN} />
        </clipPath>
        <radialGradient id={vigId} cx="50%" cy="50%" r="70%">
          <stop offset="0.55" stopColor="#000000" stopOpacity={0} />
          <stop offset="1" stopColor="#000000" stopOpacity={1} />
        </radialGradient>
      </defs>
      <path d={`M-40 -40 H1120 V1960 H-40 Z ${SCREEN}`} fillRule="evenodd" fill="#0a0a0a" opacity={0.94} />
      <g clipPath={`url(#${clipId})`}>
        <rect x={0} y={0} width={1080} height={1920} fill={`url(#${vigId})`} opacity={vig} />
        <path d={lines} stroke="#000000" strokeWidth={3} opacity={scan} />
        <ellipse cx={300} cy={380} rx={420} ry={260} fill="#ffffff" opacity={0.05} />
      </g>
      <path d={SCREEN} fill="none" stroke="#2a2a2a" strokeWidth={8} />
    </g>
  );
}
