import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Smart speaker: fabric-covered cylinder with a light ring round the top rim.
// Origin = bottom centre (the speaker stands on y). anim "pulse": the light ring breathes with a soft halo.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const WEAVE = Array.from({ length: 15 }, (_, i) => -140 + i * 20);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const light = p.light && p.light !== "none" ? p.light : C.teal;
  const anim: string = p.anim ?? "none";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const pulsing = anim === "pulse";
  const haloOp = pulsing ? 0.12 + 0.28 * breathe : 0;
  const ringOp = pulsing ? 0.55 + 0.45 * breathe : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-150} y={-360} width={300} height={344} fill={body} />
        <ellipse cx={0} cy={-16} rx={150} ry={16} fill={shade(body, 0.2)} />
        {WEAVE.map((wx) => (
          <line key={wx} x1={wx} y1={-340} x2={wx} y2={-30} stroke={shade(body, 0.2)} strokeWidth={3} strokeDasharray="10 6" opacity={0.7} />
        ))}
        {[-300, -240, -180, -120, -60].map((hy) => (
          <path key={hy} d={`M -150 ${hy} Q 0 ${hy + 14} 150 ${hy}`} fill="none" stroke={shade(body, 0.15)} strokeWidth={2} opacity={0.6} />
        ))}
        <ellipse cx={0} cy={-360} rx={150} ry={26} fill={shade(body, -0.12)} />
        {pulsing && <ellipse cx={0} cy={-360} rx={172} ry={40} fill={light} opacity={haloOp} />}
        <ellipse cx={0} cy={-360} rx={146} ry={22} fill="none" stroke={light} strokeWidth={10} opacity={ringOp} />
        <ellipse cx={-30} cy={-362} rx={60} ry={10} fill={C.white} opacity={0.12} />
      </g>
    </g>
  );
}
