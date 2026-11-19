import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Straight microphone stand: round cast-iron base, black tube with a clutch, and a microphone clipped at the top.
// Origin = bottom centre of the base. Room scale: about 920 px tall at s = 1 (1.6 m).
// anim "sway": the mic head tilts gently from the clip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const H = -800; // height of the mic head centre
const R = 46;   // mic head radius

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const tube = p.color && p.color !== "none" ? p.color : C.navy;
  const head = p.head && p.head !== "none" ? p.head : C.greyDark;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 70) * 6 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? easeOutBack(Math.min(1, Math.max(0, f / 20))) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={16} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        {/* round base */}
        <path d="M -150 0 Q -150 -34 -120 -40 L 120 -40 Q 150 -34 150 0 Z" fill={tube} />
        <path d="M -120 -40 L 120 -40 L 110 -52 L -110 -52 Z" fill={shade(tube, 0.25)} />
        {/* tube, with a sheen and a clutch ring */}
        <rect x={-14} y={-780} width={28} height={740} rx={12} fill={tube} />
        <rect x={-6} y={-760} width={6} height={680} rx={3} fill="#FFFFFF" opacity={0.15} />
        <rect x={-30} y={-420} width={60} height={34} rx={10} fill={C.greyDark} />
        {/* boom arm pivot and mic */}
        <g transform={`translate(0 ${H + 40}) rotate(${f1(tilt)})`}>
          <rect x={-24} y={-38} width={48} height={40} rx={12} fill={C.greyDark} />
          <rect x={-8} y={-30} width={16} height={60} rx={6} fill={tube} />
          <g transform="translate(0 -60)">
            <rect x={-14} y={-70} width={28} height={100} rx={12} fill={C.ink} />
            <circle cx={0} cy={-100} r={R} fill={head} />
            {[-24, 0, 24].map((k) => <line key={k} x1={-R + 6} y1={-100 + k} x2={R - 6} y2={-100 + k} stroke={C.grey} strokeWidth={3} opacity={0.7} />)}
            {[-24, 0, 24].map((k) => <line key={`v${k}`} x1={k} y1={-100 - R + 6} x2={k} y2={-100 + R - 6} stroke={C.grey} strokeWidth={3} opacity={0.7} />)}
            <circle cx={0} cy={-100} r={R} fill="none" stroke={shade(head, 0.3)} strokeWidth={6} />
            <circle cx={-16} cy={-116} r={10} fill="#FFFFFF" opacity={0.25} />
          </g>
        </g>
      </g>
    </g>
  );
}
