import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic bank card lying at an angle: gold chip, contactless arcs, grey number dots. No brand, no logo.
// Origin = bottom centre of the shadow on the table or floor (y). About 480 px wide at s = 1.
// anim "tilt": the card rocks gently about its centre.
const f1 = (v: number) => v.toFixed(1);

// Contactless symbol: three arcs bulging to the right of (cx, cy).
const Contactless = ({ cx, cy, c }: { cx: number; cy: number; c: string }) => (
  <g>
    {[26, 44, 62].map((r) => (
      <path key={r} d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r}`} stroke={c} strokeWidth={10} strokeLinecap="round" fill="none" />
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "tilt" ? Math.sin((f * 2 * Math.PI) / 120) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={16} fill={C.shadow} />
      <g transform={`translate(0 -190) rotate(${f1(-12 + tilt)})`}>
        {/* card body with a darker lower band */}
        <rect x={-230} y={-145} width={460} height={290} rx={26} fill={body} />
        <rect x={-230} y={-145} width={460} height={290} rx={26} fill={C.white} opacity={0.08} />
        <path d="M -230 60 H 230 V 119 Q 230 145 204 145 H -204 Q -230 145 -230 119 Z" fill={shade(body, 0.25)} />
        {/* gold chip */}
        <rect x={-180} y={-40} width={92} height={70} rx={14} fill={C.yellow} />
        <rect x={-180} y={-5} width={92} height={8} fill={C.yellowDark} />
        <rect x={-146} y={-40} width={8} height={70} fill={C.yellowDark} />
        {/* contactless arcs to the right of the chip */}
        <Contactless cx={-50} cy={-5} c={C.white} />
        {/* grey number dots: four groups of four, no digits */}
        {[0, 1, 2, 3].map((g) =>
          [0, 1, 2, 3].map((d) => (
            <circle key={`${g}-${d}`} cx={-185 + g * 100 + d * 26} cy={-86} r={9} fill={C.greyLight} />
          )),
        )}
        {/* a soft highlight across the top-right corner */}
        <circle cx={200} cy={-110} r={90} fill={C.white} opacity={0.12} />
      </g>
    </g>
  );
}
