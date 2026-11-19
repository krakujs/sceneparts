import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Closed hardback book standing at a three-quarter angle: front cover, spine on the left,
// page edges on the right and a top strip. Origin = bottom centre (stands on y). About 380 x 480 px at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cover = p.color && p.color !== "none" ? p.color : C.blue;
  const dark = shade(cover, 0.3);
  const pages = "#F4F1EA", pageShade = "#DCD4BF";
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* spine, receding to the left */}
        <path d="M -150 -480 L -200 -456 L -200 -24 L -150 0 Z" fill={dark} />
        {/* top edge of the pages */}
        <path d="M -150 -480 L 150 -480 L 200 -456 L -200 -456 Z" fill={pageShade} />
        {/* page edges on the right */}
        <path d="M 150 -480 L 200 -456 L 200 -24 L 150 0 Z" fill={pages} />
        {[-430, -370, -310, -250, -190, -130, -70].map((yy) => (
          <path key={yy} d={`M 150 ${yy} L 200 ${yy + 24}`} stroke={pageShade} strokeWidth={4} />
        ))}
        {/* front cover */}
        <rect x={-150} y={-480} width={300} height={480} rx={6} fill={cover} />
        {/* blank label panel */}
        <rect x={-100} y={-330} width={200} height={110} rx={10} fill={C.white} opacity={0.25} />
        {/* ribbon bookmark */}
        <path d="M 70 -480 L 70 -300 L 90 -318 L 110 -300 L 110 -480 Z" fill={C.yellow} />
        {/* shine on the cover */}
        <path d="M -120 -440 L -120 -60" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.3} />
      </g>
    </g>
  );
}
