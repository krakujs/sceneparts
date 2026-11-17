import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Refractor telescope on a three-leg tripod, tube angled up and to the right. Origin = bottom centre between the legs.
// About 560 px wide and 600 px tall at s = 1. anim "track": the tube slowly pans up and down.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const angle = anim === "track" ? -35 + 4 * Math.sin((f * 2 * Math.PI) / 120) : -35;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tripod legs */}
        <line x1={-14} y1={-380} x2={-190} y2={0} stroke={C.greyDark} strokeWidth={18} strokeLinecap="round" />
        <line x1={14} y1={-380} x2={190} y2={0} stroke={C.greyDark} strokeWidth={18} strokeLinecap="round" />
        <line x1={0} y1={-380} x2={40} y2={0} stroke={shade(C.greyDark, 0.25)} strokeWidth={16} strokeLinecap="round" />
        <line x1={-95} y1={-190} x2={95} y2={-190} stroke={C.greyDark} strokeWidth={10} strokeLinecap="round" />
        <rect x={-18} y={-412} width={36} height={40} rx={10} fill={C.greyDark} />
        <circle cx={0} cy={-380} r={34} fill={C.greyDark} />
        {/* tube, rotated about the head */}
        <g transform={`translate(0 -380) rotate(${f1(angle)})`}>
          <rect x={-250} y={-24} width={70} height={48} rx={10} fill={C.greyDark} />
          <rect x={-262} y={-20} width={16} height={40} rx={6} fill={C.ink} />
          <rect x={-190} y={-46} width={380} height={92} rx={46} fill={body} />
          <rect x={-170} y={-36} width={320} height={10} rx={5} fill={C.white} opacity={0.4} />
          <rect x={-150} y={-66} width={36} height={22} rx={8} fill={shade(body, 0.3)} />
          <rect x={-26} y={-62} width={52} height={124} rx={18} fill={C.greyDark} />
          <rect x={170} y={-54} width={40} height={108} rx={14} fill={shade(body, 0.25)} />
          <ellipse cx={214} cy={0} rx={12} ry={44} fill={C.skyDeep} />
          <ellipse cx={210} cy={-14} rx={4} ry={14} fill={C.white} opacity={0.6} />
        </g>
      </g>
    </g>
  );
}
