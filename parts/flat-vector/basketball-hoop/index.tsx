import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Basketball hoop, front view: a grey pole on a foot, a white backboard with a red square, an orange rim
// and a white net that can sway. Origin = bottom centre of the base; the base rests on y.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const rim = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const rock = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 50) * 1.2 : 0;
  const sway = anim === "swish" ? Math.sin((f * 2 * Math.PI) / 36) * 14 : 0;
  const rimY = -660, rimRx = 110, rimRy = 26, netBottom = -582;
  const tops = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => -rimRx + (i * 2 * rimRx) / 8);
  const ringY = [-618, -600];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={`rotate(${f1(rock)})`}>
        {/* base and pole */}
        <rect x={-140} y={-36} width={280} height={36} rx={14} fill={C.greyDark} />
        <rect x={-18} y={-720} width={36} height={690} fill={C.greyDark} />
        <rect x={6} y={-720} width={12} height={690} fill={C.ink} opacity={0.35} />
        {/* support arm from pole to backboard */}
        <rect x={-14} y={-712} width={28} height={58} fill={C.greyDark} />
        {/* backboard with square */}
        <rect x={-210} y={-1000} width={420} height={300} rx={22} fill={C.greyLight} />
        <rect x={-196} y={-986} width={392} height={272} rx={16} fill={C.white} />
        <rect x={-90} y={-860} width={180} height={120} fill={C.red} />
        <rect x={-72} y={-848} width={144} height={96} fill={C.white} />
        <rect x={-210} y={-712} width={420} height={12} rx={6} fill={shade(C.greyLight, 0.1)} />
        {/* net */}
        {tops.map((tx, i) => {
          const bx = tx * 0.55 + sway * ((netBottom - rimY) / 80);
          return <line key={i} x1={tx} y1={rimY + rimRy * Math.sqrt(1 - (tx / rimRx) ** 2)} x2={bx} y2={netBottom} stroke={C.greyDark} strokeWidth={3} opacity={0.7} />;
        })}
        {ringY.map((ry, j) => {
          const t = (ry - rimY) / (netBottom - rimY);
          return (
            <path key={j} d={`M ${f1(-rimRx + 6 * t * 2)} ${ry} Q 0 ${f1(ry + 14)} ${f1(rimRx - 6 * t * 2)} ${ry}`}
              stroke={C.greyDark} strokeWidth={3} opacity={0.7} fill="none" transform={`translate(${f1(sway * t * 0.8)} 0)`} />
          );
        })}
        {/* rim, front half drawn over the net */}
        <ellipse cx={0} cy={rimY} rx={rimRx} ry={rimRy} fill="none" stroke={shade(rim, 0.2)} strokeWidth={20} />
        <ellipse cx={0} cy={rimY} rx={rimRx} ry={rimRy} fill="none" stroke={rim} strokeWidth={14} />
      </g>
    </g>
  );
}
