import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tandem bicycle, side view, facing right: a long frame with two saddles on two seat posts, long top tube,
// handlebars at the front, thick tubes (16 px and up). Wheels and pedals turn when driving.
// Room scale: about 760 px wide and 400 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={C.ink} strokeWidth={16} />
    <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={rim} strokeWidth={4} opacity={0.6} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <line key={k} x1={cx} y1={cy} x2={cx} y2={cy - r + 14} stroke={rim} strokeWidth={3}
          transform={`rotate(${k * 45} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={9} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const frame = p.color && p.color !== "none" ? p.color : C.blue;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 10 : 0;
  const R = 110, rear = [-270, -R], front = [270, -R], bb = [-10, -R];
  const crankLen = 44, ca = (spin * Math.PI) / 180;
  const p1 = [bb[0] + Math.cos(ca) * crankLen, bb[1] + Math.sin(ca) * crankLen];
  const p2 = [bb[0] - Math.cos(ca) * crankLen, bb[1] - Math.sin(ca) * crankLen];
  const seatRear = [-200, -300], seatFront = [-60, -300], head = [240, -290];
  const tube = (d: string, w = 18) => <path d={d} fill="none" stroke={frame} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  const bench = (sx: number, sy: number) => (
    <g>
      {tube(`M ${sx} ${sy} L ${sx - 6} ${sy - 22}`, 14)}
      <path d={`M ${sx - 42} ${sy - 36} Q ${sx - 6} ${sy - 56} ${sx + 26} ${sy - 36} L ${sx + 20} ${sy - 24} Q ${sx - 6} ${sy - 40} ${sx - 34} ${sy - 24} Z`} fill={C.ink} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {wheel(rear[0], rear[1], R, rim, spin)}
        {wheel(front[0], front[1], R, rim, spin)}
        {/* long frame */}
        {tube(`M ${rear[0]} ${rear[1]} L ${bb[0]} ${bb[1]} L ${seatRear[0]} ${seatRear[1]} L ${rear[0]} ${rear[1]}`, 14)}
        {tube(`M ${bb[0]} ${bb[1]} L ${seatFront[0]} ${seatFront[1]} L ${head[0]} ${head[1]} L ${bb[0]} ${bb[1]}`, 20)}
        {tube(`M ${seatRear[0]} ${seatRear[1]} L ${head[0]} ${head[1]}`, 20)}
        {tube(`M ${head[0]} ${head[1]} L ${front[0]} ${front[1]}`, 16)}
        {bench(seatRear[0], seatRear[1])}
        {bench(seatFront[0], seatFront[1])}
        {/* handlebar */}
        {tube(`M ${head[0]} ${head[1]} L ${head[0] + 12} ${head[1] - 56}`, 14)}
        {tube(`M ${head[0] + 12} ${head[1] - 56} L ${head[0] + 50} ${head[1] - 66}`, 12)}
        <rect x={head[0] + 40} y={head[1] - 80} width={18} height={30} rx={8} fill={C.ink} />
        {/* chain and chain ring */}
        <line x1={bb[0]} y1={bb[1]} x2={rear[0]} y2={rear[1]} stroke={rim} strokeWidth={6} strokeLinecap="round" />
        <circle cx={bb[0]} cy={bb[1]} r={34} fill="none" stroke={rim} strokeWidth={8} />
        <circle cx={bb[0]} cy={bb[1]} r={12} fill={C.ink} />
        <line x1={bb[0]} y1={bb[1]} x2={p1[0]} y2={p1[1]} stroke={rim} strokeWidth={10} strokeLinecap="round" />
        <line x1={bb[0]} y1={bb[1]} x2={p2[0]} y2={p2[1]} stroke={rim} strokeWidth={10} strokeLinecap="round" />
        <rect x={p1[0] - 14} y={p1[1] - 6} width={28} height={12} rx={5} fill={C.ink} />
        <rect x={p2[0] - 14} y={p2[1] - 6} width={28} height={12} rx={5} fill={C.ink} />
      </g>
    </g>
  );
}
