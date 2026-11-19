import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Diamond-frame bicycle, side view, facing right. Frame tubes are thick (stroke 16 px and up) so they read
// at phone size. Chain ring and pedals turn when driving. Room scale: about 480 px wide, 380 px tall at s = 1.
// Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// tyre ring, rim, spokes that turn with spin, hub
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
  const frame = p.color && p.color !== "none" ? p.color : C.red;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 10 : 0;
  const crank = driving ? f * 10 : 0;
  const R = 110, rear = [-190, -R] as const, front = [190, -R] as const, bb = [-10, -R] as const;
  const crankLen = 44;
  const ca = (crank * Math.PI) / 180;
  const p1 = [bb[0] + Math.cos(ca) * crankLen, bb[1] + Math.sin(ca) * crankLen];
  const p2 = [bb[0] - Math.cos(ca) * crankLen, bb[1] - Math.sin(ca) * crankLen];
  const seatTop = [-70, -300], head = [160, -290];
  const tube = (d: string, w = 18) => <path d={d} fill="none" stroke={frame} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(0)})`}>
          {/* wheels first so the frame sits on top of the spokes */}
          {wheel(rear[0], rear[1], R, rim, spin)}
          {wheel(front[0], front[1], R, rim, spin)}
          {/* frame: chain stays, seat stays, seat tube, top tube, down tube, fork */}
          {tube(`M ${rear[0]} ${rear[1]} L ${bb[0]} ${bb[1]} L ${seatTop[0]} ${seatTop[1]} L ${rear[0]} ${rear[1]}`, 14)}
          {tube(`M ${bb[0]} ${bb[1]} L ${seatTop[0]} ${seatTop[1]} L ${head[0]} ${head[1]} L ${bb[0]} ${bb[1]}`, 20)}
          {tube(`M ${seatTop[0]} ${seatTop[1]} L ${head[0]} ${head[1]}`, 20)}
          {tube(`M ${head[0]} ${head[1]} L ${front[0]} ${front[1]}`, 16)}
          {/* seat post and saddle */}
          {tube(`M ${seatTop[0]} ${seatTop[1]} L ${seatTop[0] - 6} ${seatTop[1] - 20}`, 14)}
          <path d="M -110 -334 Q -70 -352 -30 -334 L -40 -322 Q -70 -330 -102 -322 Z" fill={C.ink} />
          {/* handlebar stem and bars */}
          {tube(`M ${head[0]} ${head[1]} L ${head[0] + 14} ${head[1] - 50}`, 14)}
          {tube(`M ${head[0] + 14} ${head[1] - 50} L ${head[0] + 46} ${head[1] - 60}`, 12)}
          <rect x={head[0] + 36} y={head[1] - 74} width={18} height={30} rx={8} fill={C.ink} />
          {/* chain ring with teeth look, and chain */}
          <line x1={bb[0]} y1={bb[1]} x2={rear[0]} y2={rear[1]} stroke={rim} strokeWidth={6} strokeLinecap="round" />
          <circle cx={bb[0]} cy={bb[1]} r={34} fill="none" stroke={rim} strokeWidth={8} />
          <circle cx={bb[0]} cy={bb[1]} r={12} fill={C.ink} />
          {/* crank arms and pedals (turn with crank) */}
          <line x1={bb[0]} y1={bb[1]} x2={p1[0]} y2={p1[1]} stroke={rim} strokeWidth={10} strokeLinecap="round" />
          <line x1={bb[0]} y1={bb[1]} x2={p2[0]} y2={p2[1]} stroke={rim} strokeWidth={10} strokeLinecap="round" />
          <rect x={p1[0] - 14} y={p1[1] - 6} width={28} height={12} rx={5} fill={C.ink} />
          <rect x={p2[0] - 14} y={p2[1] - 6} width={28} height={12} rx={5} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
