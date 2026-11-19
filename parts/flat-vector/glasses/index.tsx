import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clear-lens eyeglasses in 3/4 front view: two rounded rectangular rims with pale lenses, a bridge and two arms, the
// far arm shorter. Lens glint on both lenses. Origin = bottom centre (the lens bottoms sit on y).
// About 640 px wide (about 440 px lens to lens) and 205 px tall at s = 1.
// anim "shine": a glint sweeps across the left lens; "bob": the glasses bob gently.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : "#3A4157";
  const glass = p.color2 && p.color2 !== "none" ? p.color2 : "#E4F3FB";
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 40)) * 8 : 0;
  // the glint travels from the left edge of the left lens to its right edge and then waits off-lens
  const gx = anim === "shine" ? -150 + ((f % 90) / 90) * 220 : 2000;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <defs>
        <clipPath id="flat-vector-glasses-lens-l">
          <rect x={-226} y={-204} width={196} height={196} rx={48} />
        </clipPath>
        <clipPath id="flat-vector-glasses-lens-r">
          <rect x={30} y={-204} width={196} height={196} rx={48} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={6} rx={300} ry={10} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* arms: the near (left) arm runs back further than the far one */}
        <path d="M -226 -180 L -318 -198 L -326 -170" fill="none" stroke={frame} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 226 -180 L 300 -194" fill="none" stroke={shade(frame, 0.2)} strokeWidth={12} strokeLinecap="round" />
        {/* pale, clear lenses */}
        <rect x={-226} y={-204} width={196} height={196} rx={48} fill={glass} opacity={0.7} />
        <rect x={30} y={-204} width={196} height={196} rx={48} fill={glass} opacity={0.7} />
        {/* lens glints */}
        <g clipPath="url(#flat-vector-glasses-lens-l)">
          <g transform={`translate(${f1(gx)} 0)`}>
            <path d="M -190 -40 L -130 -190 L -100 -190 L -160 -40 Z" fill={C.white} opacity={0.85} />
            <path d="M -92 -40 L -66 -110 L -54 -110 L -80 -40 Z" fill={C.white} opacity={0.6} />
          </g>
        </g>
        <g clipPath="url(#flat-vector-glasses-lens-r)">
          <path d="M 60 -40 L 110 -170 L 128 -170 L 80 -40 Z" fill={C.white} opacity={0.7} />
          <path d="M 140 -40 L 160 -92 L 170 -92 L 152 -40 Z" fill={C.white} opacity={0.55} />
        </g>
        {/* rims */}
        <rect x={-226} y={-204} width={196} height={196} rx={48} fill="none" stroke={frame} strokeWidth={22} />
        <rect x={30} y={-204} width={196} height={196} rx={48} fill="none" stroke={frame} strokeWidth={22} />
        {/* bridge */}
        <path d="M -30 -158 Q 0 -186 30 -158" fill="none" stroke={frame} strokeWidth={16} strokeLinecap="round" />
        {/* hinge dots */}
        <circle cx={-230} cy={-170} r={8} fill={shade(frame, 0.3)} />
        <circle cx={226} cy={-170} r={7} fill={shade(frame, 0.3)} />
      </g>
    </g>
  );
}
