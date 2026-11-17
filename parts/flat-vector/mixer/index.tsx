import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic stand mixer: motor head on a curved neck, a steel bowl on the base and a wire whisk.
// anim "whisk" turns the whisk about its axis. Not a known brand silhouette. Origin = bottom centre, hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.pink;
  const dk = shade(c, 0.2);
  const whiskScale = Math.cos((f * 2 * Math.PI) / 30);
  const wx = p.anim === "whisk" ? f1(Math.max(0.15, Math.abs(whiskScale))) : "1";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={175} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* base plate and body */}
        <rect x={-150} y={-130} width={300} height={130} rx={34} fill={c} />
        <rect x={-150} y={-130} width={300} height={24} rx={12} fill={dk} />
        <rect x={-160} y={-14} width={320} height={14} rx={7} fill={C.greyDark} />

        {/* neck and head */}
        <rect x={60} y={-330} width={72} height={210} rx={30} fill={c} />
        <rect x={-120} y={-460} width={262} height={150} rx={64} fill={c} />
        <rect x={-120} y={-460} width={262} height={40} rx={20} fill={dk} />
        <rect x={-120} y={-330} width={262} height={20} rx={10} fill={dk} />
        {/* speed dial on the head */}
        <circle cx={60} cy={-392} r={24} fill={C.white} />
        <rect x={59} y={-404} width={4} height={14} rx={2} fill={C.ink} />

        {/* steel bowl */}
        <path d="M -130 -250 Q -130 -130 -10 -130 Q 110 -130 110 -250 Z" fill={C.greyLight} />
        <path d="M 40 -250 Q 110 -250 110 -250 Q 110 -130 10 -130 Q 50 -170 40 -250 Z" fill={shade(C.greyLight, 0.2)} />
        <ellipse cx={-10} cy={-250} rx={120} ry={18} fill={C.white} />
        <ellipse cx={-10} cy={-250} rx={106} ry={12} fill={shade(C.greyLight, 0.12)} />

        {/* whisk hanging from the head into the bowl */}
        <g transform={`translate(-10 -236) scale(${wx} 1)`}>
          <rect x={-4} y={-72} width={8} height={30} rx={4} fill={C.greyDark} />
          <ellipse cx={0} cy={0} rx={46} ry={68} fill="none" stroke={C.greyDark} strokeWidth={9} />
          <ellipse cx={0} cy={0} rx={18} ry={68} fill="none" stroke={C.greyDark} strokeWidth={8} />
        </g>
      </g>
    </g>
  );
}
