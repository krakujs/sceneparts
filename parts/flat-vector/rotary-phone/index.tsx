import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rotary phone: dial base with the handset resting on its cradles. Origin = bottom centre of the base.
// anim "ring": the handset shakes side to side with motion lines.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const ring = anim === "ring";
  const shake = ring ? 6 * Math.sin((f * 2 * Math.PI) / 8) : 0;
  const lineOp = (i: number) => (ring ? (Math.sin((f * 2 * Math.PI) / 8 + i * 1.3) > 0 ? 0.9 : 0.15) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* cradles (behind the handset) */}
        <rect x={-165} y={-196} width={52} height={50} rx={16} fill={shade(body, 0.2)} />
        <rect x={113} y={-196} width={52} height={50} rx={16} fill={shade(body, 0.2)} />
        {/* base body with dial face */}
        <rect x={-200} y={-160} width={400} height={160} rx={44} fill={body} />
        <rect x={-200} y={-50} width={400} height={50} rx={24} fill={shade(body, 0.22)} />
        <path d="M -150 -150 Q -120 -170 -60 -168" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.3} />
        {/* dial */}
        <circle cx={0} cy={-80} r={78} fill={shade(body, 0.3)} />
        <circle cx={0} cy={-80} r={68} fill={C.white} />
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * 36 - 90) * (Math.PI / 180);
          return <circle key={i} cx={f1(Math.cos(a) * 44) as any} cy={f1(-80 + Math.sin(a) * 44) as any} r={9} fill={C.ink} />;
        })}
        <circle cx={0} cy={-80} r={14} fill={C.greyLight} />
        {/* handset resting across the cradles, shaking when ringing */}
        <g transform={`translate(${f1(shake)} 0) rotate(${f1(shake * 0.4)} 0 -220)`}>
          <rect x={-215} y={-254} width={430} height={50} rx={25} fill={shade(body, 0.1)} />
          <circle cx={-205} cy={-229} r={40} fill={body} />
          <circle cx={205} cy={-229} r={40} fill={body} />
          <ellipse cx={-205} cy={-229} rx={18} ry={14} fill={C.white} opacity={0.35} />
          <ellipse cx={205} cy={-229} rx={18} ry={14} fill={C.white} opacity={0.35} />
          <path d="M -150 -240 Q 0 -262 150 -240" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.3} />
        </g>
        {ring && [0, 1, 2].map((i) => (
          <g key={i} stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={lineOp(i)}>
            <line x1={-250 - i * 14} y1={-300 + i * 30} x2={-280 - i * 14} y2={-300 + i * 30} />
            <line x1={250 + i * 14} y1={-300 + i * 30} x2={280 + i * 14} y2={-300 + i * 30} />
          </g>
        ))}
      </g>
    </g>
  );
}
