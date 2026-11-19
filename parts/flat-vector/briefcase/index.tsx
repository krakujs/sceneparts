import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Leather office briefcase with a carry handle, a lid seam, stitching and two brass clasps.
// Origin = bottom centre (the feet rest on y).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const leather = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={280} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* feet */}
        <rect x={-220} y={-16} width={60} height={16} rx={4} fill={shade(leather, 0.4)} />
        <rect x={160} y={-16} width={60} height={16} rx={4} fill={shade(leather, 0.4)} />
        {/* handle */}
        <path d="M -90 -330 L -90 -380 Q -90 -414 -56 -414 L 56 -414 Q 90 -414 90 -380 L 90 -330" stroke={shade(leather, 0.25)} strokeWidth={30} strokeLinecap="round" fill="none" />
        {/* main body */}
        <rect x={-250} y={-340} width={500} height={330} rx={26} fill={shade(leather, 0.2)} />
        {/* lid */}
        <rect x={-250} y={-340} width={500} height={190} rx={26} fill={leather} />
        <rect x={-250} y={-166} width={500} height={16} fill={shade(leather, 0.25)} />
        {/* stitching */}
        <line x1={-220} y1={-300} x2={220} y2={-300} stroke={C.white} strokeWidth={4} strokeDasharray="14 10" opacity={0.35} />
        <line x1={-220} y1={-40} x2={220} y2={-40} stroke={C.white} strokeWidth={4} strokeDasharray="14 10" opacity={0.25} />
        {/* brass clasps */}
        <rect x={-62} y={-196} width={124} height={62} rx={10} fill={C.yellowDark} />
        <rect x={-46} y={-180} width={92} height={30} rx={8} fill={C.yellow} />
        <rect x={-14} y={-176} width={28} height={22} rx={4} fill={C.yellowDark} />
      </g>
    </g>
  );
}
