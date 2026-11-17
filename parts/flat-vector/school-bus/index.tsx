import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// School bus, side view, facing right: yellow box body, long bonnet at the front, black stripes,
// row of windows, folded stop-sign arm on the side (blank red octagon, no words).
// Room scale: about 900 px wide and 430 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={480} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* wheel arches */}
          <circle cx={-310} cy={-90} r={102} fill={C.ink} opacity={0.85} />
          <circle cx={300} cy={-90} r={102} fill={C.ink} opacity={0.85} />
          {/* long bonnet at the front (right) and box body */}
          <rect x={-440} y={-400} width={640} height={300} rx={36} fill={body} />
          <rect x={160} y={-300} width={300} height={200} rx={44} fill={body} />
          <rect x={-440} y={-400} width={640} height={22} rx={11} fill={shade(body, 0.12)} />
          {/* black stripes along the side */}
          <rect x={-440} y={-260} width={640} height={16} fill={C.ink} />
          <rect x={-440} y={-232} width={600} height={8} fill={C.ink} opacity={0.8} />
          {/* skirt */}
          <rect x={-450} y={-140} width={920} height={50} rx={16} fill={shade(body, 0.2)} />
          {/* windows */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-410 + i * 120} y={-380} width={96} height={100} rx={10} fill={C.sky} />
          ))}
          {/* windscreen and door */}
          <path d="M 170 -290 L 240 -290 L 252 -200 L 170 -200 Z" fill={C.sky} />
          {/* front lights and bumper */}
          <rect x={436} y={-210} width={22} height={30} rx={7} fill={C.white} />
          <rect x={-445} y={-210} width={18} height={28} rx={6} fill={C.red} />
          <rect x={430} y={-112} width={48} height={20} rx={8} fill={C.greyDark} />
          <rect x={-470} y={-112} width={40} height={20} rx={8} fill={C.greyDark} />
          {/* folded stop-sign arm on the side: blank red octagon on a short arm */}
          <rect x={-180} y={-300} width={10} height={60} rx={4} fill={C.greyDark} />
          <g transform="translate(-175 -210)">
            <polygon points="-34,-14 -14,-34 14,-34 34,-14 34,14 14,34 -14,34 -34,14" fill={C.red} />
            <polygon points="-28,-10 -10,-28 10,-28 28,-10 28,10 10,28 -10,28 -28,10" fill="none" stroke={C.white} strokeWidth={4} />
          </g>
        </g>
        {wheel(-310, -90, 90, rim, spin)}
        {wheel(300, -90, 90, rim, spin)}
      </g>
    </g>
  );
}
