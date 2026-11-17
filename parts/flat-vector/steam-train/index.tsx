import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Old steam locomotive, side view, facing right: coal tender at the back, cab, horizontal boiler with dome,
// tall chimney at the front, big coupled drive wheels and a small leading wheel.
// anim "drive": the wheels turn, the engine bounces and smoke circles rise from the chimney in a loop.
// Room scale: about 900 px wide and 470 px tall at s = 1. Origin = floor centre; the wheels stand on y.
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
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.5} width={r * 0.14} height={r * 0.5} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 60} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 6 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 20)) * -3 : 0;
  // smoke: four circles per 60-frame loop, rising, growing and fading out
  const puffs = driving ? [0, 1, 2, 3].map((k) => {
    const t = (((f + k * 15) % 60) + 60) % 60 / 60;
    return { cx: 178 + t * 60, cy: -470 - t * 260, r: 18 + t * 46, o: (1 - t) * 0.85 };
  }) : [];
  const wheelRim = C.greyLight;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={430} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* smoke from the chimney top (drawn first so it sits behind the engine) */}
        {puffs.map((q, i) => (
          <circle key={i} cx={f1(q.cx)} cy={f1(q.cy)} r={f1(q.r)} fill={C.white} opacity={f1(q.o)} />
        ))}
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* chassis frame */}
          <rect x={-480} y={-118} width={820} height={26} rx={8} fill={dark} />
          {/* tender at the back: coal load and box */}
          <rect x={-480} y={-330} width={160} height={210} rx={12} fill={dark} />
          <rect x={-480} y={-340} width={160} height={24} rx={8} fill={C.ink} />
          <rect x={-470} y={-316} width={140} height={10} rx={4} fill={C.ink} opacity={0.6} />
          {/* cab */}
          <rect x={-330} y={-500} width={170} height={380} rx={20} fill={body} />
          <rect x={-345} y={-520} width={200} height={28} rx={10} fill={shade(body, 0.2)} />
          <rect x={-300} y={-430} width={110} height={100} rx={10} fill={C.sky} />
          {/* boiler */}
          <rect x={-180} y={-345} width={440} height={150} rx={60} fill={body} />
          <rect x={-180} y={-215} width={440} height={20} rx={8} fill={shade(body, 0.25)} />
          {/* dome and smokebox */}
          <rect x={-30} y={-400} width={60} height={60} rx={22} fill={dark} />
          <circle cx={230} cy={-270} r={75} fill={shade(body, 0.12)} />
          {/* chimney with flared cap */}
          <rect x={150} y={-460} width={56} height={120} rx={10} fill={dark} />
          <rect x={136} y={-472} width={84} height={18} rx={8} fill={C.ink} />
          {/* front cowcatcher */}
          <path d="M 280 -200 L 330 -120 L 280 -120 Z" fill={dark} />
          {/* connecting rod between drive wheels */}
          <rect x={-120} y={-106} width={300} height={14} rx={7} fill={C.greyDark} />
        </g>
        {/* drive wheels and leading wheel */}
        {wheel(-40, -110, 110, wheelRim, spin)}
        {wheel(130, -110, 110, wheelRim, spin)}
        {wheel(-400, -60, 60, wheelRim, spin)}
        {wheel(260, -60, 60, wheelRim, spin)}
      </g>
    </g>
  );
}
