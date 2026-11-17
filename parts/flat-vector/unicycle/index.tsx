import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Unicycle, side view, facing right: one large wheel, a short fork post going up to a saddle, and a small
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.purple;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 8 : 0;
  const R = 150, cy = -R;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* big wheel: tyre, rim, spokes that turn */}
        <circle cx={0} cy={cy} r={R - 10} fill="none" stroke={C.ink} strokeWidth={20} />
        <circle cx={0} cy={cy} r={R - 10} fill="none" stroke={rim} strokeWidth={4} opacity={0.6} />
        <g transform={`rotate(${f1(spin)} 0 ${cy})`}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
            <line key={k} x1={0} y1={cy} x2={0} y2={cy - R + 24} stroke={rim} strokeWidth={3}
              transform={`rotate(${k * 36} 0 ${cy})`} />
          ))}
        </g>
        <circle cx={0} cy={cy} r={16} fill={C.greyDark} />
        {/* fork post and saddle */}
        <rect x={-9} y={-340} width={18} height={190} rx={8} fill={body} />
        <rect x={-14} y={-360} width={28} height={24} rx={8} fill={shade(body, 0.2)} />
        <path d="M -70 -376 Q 0 -400 70 -376 L 66 -352 Q 0 -364 -66 -352 Z" fill={C.ink} />
      </g>
    </g>
  );
}
