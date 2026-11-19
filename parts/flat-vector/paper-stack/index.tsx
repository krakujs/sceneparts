import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Neat stack of white paper sheets seen from slightly above, the top sheet a little askew.
// anim "flutter": the top sheet lifts and flaps gently. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paper = p.color && p.color !== "none" ? p.color : C.white;
  const edge = shade(paper, 0.1);
  const anim: string = p.anim ?? "none";
  const wave = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const lift = anim === "flutter" ? -wave * 46 : 0;
  const tilt = anim === "flutter" ? Math.sin((f * 2 * Math.PI) / 50) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* stack body: front face with the layered edges of the sheets */}
        <path d="M -190 -120 L 0 -50 L 190 -120 L 190 0 L -190 0 Z" fill={edge} />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={-190} y={-110 + i * 12} width={380} height={4} fill={C.white} opacity={0.8} />
        ))}
        {/* top face of the stack */}
        <path d="M -190 -120 L 0 -190 L 190 -120 L 0 -50 Z" fill={shade(paper, 0.04)} />
        {/* top sheet, slightly askew and able to flutter up */}
        <g transform={`translate(0 ${f1(lift)}) rotate(${f1(-4 + tilt)} 0 -120)`}>
          <path d="M -184 -120 L 0 -184 L 184 -120 L 0 -56 Z" fill={paper} />
          <path d="M -184 -120 L 0 -56 L 184 -120 L 184 -116 L 0 -52 L -184 -116 Z" fill={C.greyLight} />
          <rect x={-90} y={-132} width={120} height={8} rx={4} fill={C.grey} transform="rotate(26 -30 -128)" />
          <rect x={-40} y={-108} width={110} height={8} rx={4} fill={C.grey} transform="rotate(26 15 -104)" />
        </g>
      </g>
    </g>
  );
}
