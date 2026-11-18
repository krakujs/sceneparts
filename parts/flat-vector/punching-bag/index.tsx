import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Heavy punching bag hanging from a ceiling hook on a chain. Origin = the hook point (x, y), so the
// swing pivots there. The bag is a rounded cylinder with stitched seams and a darker lower band.
const f1 = (v: number) => v.toFixed(1);
const swingAngle = (anim: string, f: number) => (anim === "swing" ? 6 * Math.sin((f * 2 * Math.PI) / 60) : 0);
const pop = (anim: string, f: number) => (anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 700;
  const bagC = p.color && p.color !== "none" ? p.color : C.red;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const ang = swingAngle(anim, f) + (anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 40) * 2 : 0);
  const chainTop = 0, bagTop = 150, bagH = 560, bagW = 280;
  const cx = 0;
  const seams = [0.25, 0.5, 0.75];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* ceiling hook and mount, fixed */}
      <rect x={-70} y={-30} width={140} height={24} rx={10} fill={C.greyDark} />
      <path d="M -10 -6 Q -10 30 0 30 Q 10 30 10 -6" stroke={C.greyDark} strokeWidth={10} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${f1(ang)})`}>
        {/* chains */}
        <line x1={-48} y1={chainTop} x2={-40} y2={bagTop} stroke={metal} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 6" />
        <line x1={48} y1={chainTop} x2={40} y2={bagTop} stroke={metal} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 6" />
        {/* swivel and top strap */}
        <rect x={-60} y={bagTop - 40} width={120} height={28} rx={12} fill={C.inkSoft} />
        <g transform={`translate(0 ${f1(bagTop)}) scale(${pop(anim, f)})`}>
          {/* bag body */}
          <rect x={-bagW / 2 + cx} y={0} width={bagW} height={bagH} rx={bagW / 2} fill={bagC} />
          {/* shaded right side */}
          <path d={`M ${bagW / 2 - 60} 30 Q ${bagW / 2 - 6} ${bagH / 2} ${bagW / 2 - 60} ${bagH - 30} L ${bagW / 2 - 10} ${bagH - 30} Q ${bagW / 2 + 0} ${bagH / 2} ${bagW / 2 - 10} 30 Z`} fill={shade(bagC, 0.2)} />
          {/* stitched seams */}
          {seams.map((t) => (
            <line key={t} x1={-bagW / 2 + 26} y1={bagH * t} x2={bagW / 2 - 26} y2={bagH * t} stroke={shade(bagC, 0.35)} strokeWidth={5} strokeDasharray="10 8" strokeLinecap="round" opacity={0.7} />
          ))}
          {/* lower band */}
          <rect x={-bagW / 2} y={bagH - 70} width={bagW} height={70} rx={0} fill={shade(bagC, 0.15)} />
          <rect x={-bagW / 2} y={bagH - 70} width={bagW} height={18} fill={shade(bagC, 0.3)} opacity={0.6} />
          {/* bottom cap */}
          <rect x={-bagW / 2 + 4} y={bagH - 12} width={bagW - 8} height={12} rx={6} fill={C.ink} opacity={0.35} />
        </g>
      </g>
    </g>
  );
}
