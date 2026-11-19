import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metro subway carriage, side view, facing right: boxy body with rounded corners, a row of windows,
// three sliding doors along the side, and a small front window.
// Room scale: about 900 px wide and 380 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.58} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.lime;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* carriage body */}
          <rect x={-450} y={-330} width={900} height={230} rx={40} fill={body} />
          <rect x={-450} y={-330} width={900} height={22} rx={11} fill={shade(body, 0.15)} />
          <rect x={-460} y={-130} width={920} height={36} rx={14} fill={shade(body, 0.25)} />
          {/* window band */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-410 + i * 104} y={-290} width={84} height={90} rx={10} fill={C.sky} />
          ))}
          {/* sliding doors: two closed, one slightly open */}
          {[-330, 60, 330].map((dx, i) => (
            <g key={i}>
              <rect x={dx - 60} y={-196} width={120} height={60} rx={6} fill={shade(body, 0.3)} opacity={0.45} />
            </g>
          ))}
          {/* front window and lights */}
          <rect x={380} y={-300} width={56} height={120} rx={12} fill={C.sky} />
          <rect x={432} y={-196} width={18} height={28} rx={6} fill={C.yellow} />
          <rect x={-450} y={-196} width={18} height={28} rx={6} fill={C.red} />
        </g>
        {wheel(-300, -70, 70, rim, spin)}
        {wheel(300, -70, 70, rim, spin)}
      </g>
    </g>
  );
}
