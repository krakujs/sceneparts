import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Compact point-and-shoot camera seen from the front: lens in the middle, flash window and viewfinder on top.
// Origin = bottom centre. anim "flash" fires the flash with a burst of rays every few seconds.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const firing = anim === "flash" && f % 90 < 8;
  const flashCol = firing ? C.yellow : C.white;
  const rays = [-150, -120, -90, -60, -30];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-200} y={-250} width={400} height={250} rx={40} fill={body} />
        <rect x={-200} y={-20} width={400} height={20} rx={8} fill={shade(body, 0.3)} />
        <rect x={-200} y={-200} width={30} height={140} rx={14} fill={shade(body, 0.2)} />
        <rect x={120} y={-266} width={50} height={18} rx={6} fill={C.ink} />
        {/* lens */}
        <circle cx={0} cy={-130} r={96} fill={C.ink} />
        <circle cx={0} cy={-130} r={80} fill={C.greyDark} />
        <circle cx={0} cy={-130} r={62} fill={C.navy} />
        <circle cx={0} cy={-130} r={36} fill={C.blue} opacity={0.8} />
        <circle cx={-20} cy={-150} r={14} fill={C.white} opacity={0.55} />
        {/* flash window */}
        {firing &&
          rays.map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line key={a} x1={-135 + Math.cos(rad) * 40} y1={-214 + Math.sin(rad) * 40} x2={-135 + Math.cos(rad) * 70} y2={-214 + Math.sin(rad) * 70}
                stroke={C.yellow} strokeWidth={9} strokeLinecap="round" />
            );
          })}
        <rect x={-170} y={-232} width={70} height={36} rx={10} fill={flashCol} />
        <rect x={-160} y={-226} width={50} height={8} rx={4} fill={C.white} opacity={0.6} />
        {/* viewfinder */}
        <rect x={100} y={-228} width={58} height={32} rx={8} fill={C.ink} />
        <rect x={108} y={-222} width={20} height={8} rx={4} fill={C.skyDeep} />
      </g>
    </g>
  );
}
