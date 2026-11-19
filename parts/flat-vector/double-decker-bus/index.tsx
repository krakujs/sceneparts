import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two-storey bus, side view, facing right: tall red body, two rows of windows, front windscreen, lower door.
// Room scale: about 900 px wide and 580 px tall at s = 1. Origin = floor centre; the tyres stand on y.
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
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* wheel arches */}
          <circle cx={-300} cy={-90} r={100} fill={C.ink} opacity={0.85} />
          <circle cx={300} cy={-90} r={100} fill={C.ink} opacity={0.85} />
          {/* tall two-storey body */}
          <rect x={-430} y={-560} width={860} height={440} rx={36} fill={body} />
          <rect x={-430} y={-560} width={860} height={22} rx={11} fill={shade(body, 0.18)} />
          <rect x={-440} y={-140} width={880} height={50} rx={16} fill={shade(body, 0.2)} />
          {/* upper deck windows */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-390 + i * 110} y={-500} width={92} height={120} rx={10} fill={C.sky} />
          ))}
          {/* lower deck windows */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-390 + i * 110} y={-330} width={92} height={120} rx={10} fill={C.sky} />
          ))}
          {/* front windscreen and lower door */}
          <path d="M 340 -500 L 400 -500 L 412 -350 L 340 -350 Z" fill={C.sky} />
          <rect x={320} y={-320} width={80} height={170} rx={8} fill={C.sky} opacity={0.9} />
          <rect x={358} y={-320} width={5} height={170} fill={shade(body, 0.25)} />
          {/* lights and bumper */}
          <rect x={416} y={-200} width={20} height={28} rx={7} fill={C.yellow} />
          <rect x={-436} y={-200} width={18} height={28} rx={6} fill={C.red} />
          <rect x={410} y={-112} width={46} height={20} rx={8} fill={C.greyDark} />
          <rect x={-456} y={-112} width={46} height={20} rx={8} fill={C.greyDark} />
        </g>
        {wheel(-300, -90, 90, rim, spin)}
        {wheel(300, -90, 90, rim, spin)}
      </g>
    </g>
  );
}
