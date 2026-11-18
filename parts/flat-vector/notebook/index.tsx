import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Spiral-bound notebook standing upright: coil rings along the top edge, ruled white pages with a red margin,
// and an optional ballpoint pen clipped to the right edge of the cover. Origin = bottom centre (stands on y).
// About 360 px wide and 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cover = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const rule = "#8EC5E8";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* back cover, offset to suggest thickness */}
        <rect x={-172} y={-466} width={360} height={466} rx={18} fill={shade(cover, 0.25)} />
        {/* front cover */}
        <rect x={-180} y={-476} width={360} height={466} rx={18} fill={cover} />
        {/* label tab */}
        <rect x={-96} y={-330} width={150} height={70} rx={10} fill={C.white} opacity={0.22} />
        {/* pages */}
        <rect x={-160} y={-456} width={316} height={436} rx={8} fill={C.white} />
        <rect x={-160} y={-26} width={316} height={16} rx={6} fill={C.greyLight} />
        {/* ruled lines and red margin */}
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={-142} y={-414 + i * 36} width={280} height={3} fill={rule} />
        ))}
        <rect x={-112} y={-456} width={3} height={436} fill={C.red} opacity={0.6} />
        {/* spiral coil along the top edge */}
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <ellipse cx={-140 + i * 31} cy={-456} rx={11} ry={24} fill="none" stroke={C.greyDark} strokeWidth={6} />
            <circle cx={-140 + i * 31} cy={-456} r={4} fill={shade(cover, 0.4)} />
          </g>
        ))}
        {/* clipped pen on the right edge */}
        {p.pen && (
          <g transform="translate(176 -424) rotate(6)">
            <rect x={-14} y={-18} width={28} height={270} rx={12} fill={C.navy} />
            <rect x={-14} y={-18} width={28} height={58} rx={12} fill={C.red} />
            <rect x={-6} y={40} width={6} height={180} rx={3} fill={C.white} opacity={0.3} />
            <path d="M -14 250 L 0 292 L 14 250 Z" fill={C.greyDark} />
            <rect x={6} y={-6} width={8} height={150} rx={4} fill={C.greyLight} />
          </g>
        )}
      </g>
    </g>
  );
}
