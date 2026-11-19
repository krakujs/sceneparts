import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// City single-decker bus, side view, facing right: long rounded body, a row of windows, front door and windscreen.
// Room scale: about 980 px wide and 420 px tall at s = 1. Origin = floor centre; the tyres stand on y.
// anim "drive": wheels spin and the body bounces; vx moves the bus along x (px per frame).
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
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const winY = -330, winH = 130;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={470} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* wheel arches (behind wheels) */}
          <circle cx={-330} cy={-90} r={102} fill={C.ink} opacity={0.85} />
          <circle cx={330} cy={-90} r={102} fill={C.ink} opacity={0.85} />
          {/* main body with roof band and skirt */}
          <rect x={-480} y={-420} width={960} height={320} rx={44} fill={body} />
          <rect x={-480} y={-420} width={960} height={24} rx={12} fill={shade(body, 0.15)} />
          <rect x={-490} y={-140} width={980} height={50} rx={18} fill={shade(body, 0.2)} />
          {/* side windows */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={-440 + i * 100} y={winY} width={80} height={winH} rx={10} fill={C.sky} />
          ))}
          {/* windscreen and door at the front */}
          <path d="M 170 -340 L 250 -340 L 250 -200 L 170 -200 Z" fill={C.sky} />
          <rect x={300} y={-340} width={120} height={210} rx={10} fill={C.sky} />
          <rect x={358} y={-340} width={6} height={210} fill={shade(body, 0.25)} />
          {/* lights and bumpers */}
          <rect x={448} y={-190} width={28} height={30} rx={8} fill={C.yellow} />
          <rect x={-478} y={-190} width={22} height={30} rx={7} fill={C.red} />
          <rect x={440} y={-112} width={44} height={20} rx={8} fill={C.greyDark} />
          <rect x={-484} y={-112} width={44} height={20} rx={8} fill={C.greyDark} />
          {/* destination panel stays blank: plain dark strip */}
          <rect x={-420} y={-400} width={300} height={40} rx={10} fill={shade(body, 0.3)} opacity={0.5} />
        </g>
        {wheel(-330, -90, 90, rim, spin)}
        {wheel(330, -90, 90, rim, spin)}
      </g>
    </g>
  );
}
