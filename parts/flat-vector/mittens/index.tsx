import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pair of thumb-only mittens with ribbed cuffs, joined by a string over the top. Origin = bottom centre (y).
// About 420 px wide and 470 px tall at s = 1. anim "sway": the mittens swing gently on their string.
const f1 = (v: number) => v.toFixed(1);

// One mitten in local coordinates: origin at its bottom centre, thumb on the outside (left mitten).
const Mitten = ({ c, c2 }: { c: string; c2: string }) => (
  <g>
    <path d="M -90 -70 L -90 -230 Q -90 -330 0 -330 Q 90 -330 90 -230 L 90 -70 Z" fill={c} />
    <path d="M 40 -318 Q 90 -296 90 -230 L 90 -80 L 52 -80 Q 60 -200 40 -318 Z" fill={shade(c, 0.2)} opacity={0.55} />
    <ellipse cx={-88} cy={-168} rx={30} ry={60} transform="rotate(-22 -88 -168)" fill={c} />
    <ellipse cx={-92} cy={-168} rx={12} ry={40} transform="rotate(-22 -92 -168)" fill={shade(c, 0.2)} opacity={0.5} />
    <rect x={-96} y={-80} width={192} height={80} rx={16} fill={c2} />
    {[-60, -30, 0, 30, 60].map((rx) => <rect key={rx} x={rx - 3} y={-72} width={6} height={64} rx={3} fill={shade(c2, 0.22)} />)}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 0.9, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={230} ry={14} fill={C.shadow} />
      {/* string joining the two tops */}
      <path d="M -110 -330 Q 0 -470 110 -330" stroke={shade(c2, 0.1)} strokeWidth={8} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${f1(sw)} -110 -330)`}>
        <g transform="translate(-110 0)"><Mitten c={c} c2={c2} /></g>
      </g>
      <g transform={`rotate(${f1(-sw)} 110 -330)`}>
        <g transform="translate(110 0) scale(-1 1)"><Mitten c={c} c2={c2} /></g>
      </g>
    </g>
  );
}
