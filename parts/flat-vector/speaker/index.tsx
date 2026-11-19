import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Floor-standing speaker cabinet with a large woofer, a tweeter and a bass port. Room-scale.
// Origin = bottom centre (the feet rest on y). anim "pulse" thumps the woofer cone in time with a beat.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const beat = anim === "pulse" ? Math.pow(Math.max(0, Math.sin((f * 2 * Math.PI) / 24)), 4) : 0;
  const cone = 112 * (1 + 0.05 * beat);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "pulse" ? "" : anim, f)}>
        {/* feet */}
        <rect x={-150} y={-14} width={40} height={14} rx={5} fill={C.ink} />
        <rect x={110} y={-14} width={40} height={14} rx={5} fill={C.ink} />
        {/* cabinet */}
        <rect x={-190} y={-630} width={380} height={620} rx={26} fill={body} />
        <rect x={-190} y={-630} width={380} height={14} rx={7} fill={shade(body, 0.25)} />
        <rect x={-160} y={-598} width={320} height={560} rx={16} fill={shade(body, 0.2)} />
        {/* tweeter */}
        <circle cx={0} cy={-500} r={46} fill={C.greyDark} />
        <circle cx={0} cy={-500} r={30} fill={C.greyLight} />
        <circle cx={0} cy={-500} r={12} fill={C.ink} />
        <circle cx={-10} cy={-510} r={5} fill={C.white} opacity={0.6} />
        {/* woofer */}
        <circle cx={0} cy={-300} r={134} fill={C.greyDark} />
        <circle cx={0} cy={-300} r={cone} fill={C.inkSoft} />
        <circle cx={0} cy={-300} r={cone - 26} fill="none" stroke={C.greyDark} strokeWidth={5} opacity={0.6} />
        <circle cx={0} cy={-300} r={cone - 58} fill="none" stroke={C.greyDark} strokeWidth={4} opacity={0.4} />
        <circle cx={0} cy={-300} r={40} fill={C.greyLight} />
        <circle cx={-12} cy={-312} r={9} fill={C.white} opacity={0.6} />
        {/* bass port */}
        <ellipse cx={0} cy={-100} rx={70} ry={24} fill={C.ink} />
        <ellipse cx={0} cy={-100} rx={52} ry={15} fill={C.greyDark} />
      </g>
    </g>
  );
}
