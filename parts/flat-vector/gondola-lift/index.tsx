import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ski-lift gondola: a small round pod hanging from a sheave on a steep diagonal cable, beside a lattice pylon.
// Origin = ground under the lower station. Room scale: about 1020 px wide and 850 px tall at s = 1.
// anim "sway": the pod swings gently from its hanger.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const pod = p.color && p.color !== "none" ? p.color : C.orange;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* stations at both ends */}
        <rect x={-500} y={-120} width={110} height={120} rx={10} fill={frame} />
        <rect x={400} y={-850} width={120} height={60} rx={10} fill={frame} />
        {/* lattice pylon with a saddle under the cable */}
        <path d="M -34 0 L 34 0 L 18 -420 L -18 -420 Z" fill={frame} />
        <rect x={-70} y={-446} width={140} height={26} rx={10} fill={shade(frame, 0.2)} />
        <rect x={-30} y={-260} width={60} height={8} rx={4} fill={shade(frame, 0.2)} />
        <rect x={-24} y={-150} width={48} height={8} rx={4} fill={shade(frame, 0.2)} />
        {/* diagonal cable */}
        <line x1={-440} y1={-60} x2={440} y2={-820} stroke={frame} strokeWidth={8} strokeLinecap="round" />
        {/* round pod on a hanger, swaying from the sheave */}
        <g transform={`rotate(${f1(sway)} 176 -592)`}>
          <rect x={169} y={-596} width={14} height={60} fill={frame} />
          <circle cx={176} cy={-592} r={22} fill={shade(frame, 0.2)} />
          <circle cx={176} cy={-470} r={80} fill={pod} />
          <circle cx={176} cy={-482} r={40} fill={C.sky} />
          <rect x={120} y={-420} width={112} height={14} rx={7} fill={shade(pod, 0.2)} />
        </g>
      </g>
    </g>
  );
}
