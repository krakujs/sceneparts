import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cricket ball: a red leather ball with one raised white seam across the front and red stitch marks along it.
// Origin = bottom centre; the ball rests on y. Hero size about 260 px across at s = 1.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const R = 130, cy = -R - 4;
  const leather = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const lift = anim === "bounce" ? Math.abs(Math.sin((f * 2 * Math.PI) / 30)) * 80 : 0;
  const spin = anim === "spin" ? f * 6 : 0;
  const k = 1 - 0.3 * (lift / 80);
  const seam = "M -112 -30 Q -40 30 0 6 Q 40 -18 112 -30";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={116 * k} ry={10 * k} fill={C.shadow} />
      <g transform={`translate(0 ${f1(cy - lift)}) rotate(${f1(spin)})`}>
        <circle cx={0} cy={0} r={R} fill={shade(leather, 0.22)} />
        <circle cx={-6} cy={-8} r={R - 6} fill={leather} />
        {/* raised seam: white ridge with red stitches */}
        <path d={seam} fill="none" stroke={C.white} strokeWidth={18} strokeLinecap="round" />
        <path d={seam} fill="none" stroke={C.red} strokeWidth={4} strokeDasharray="3 13" strokeLinecap="round" transform="translate(0 -9)" />
        <path d={seam} fill="none" stroke={C.red} strokeWidth={4} strokeDasharray="3 13" strokeLinecap="round" transform="translate(0 9)" />
        <path d={seam} fill="none" stroke={shade(C.white, 0.12)} strokeWidth={4} transform="translate(0 9)" />
      </g>
    </g>
  );
}
