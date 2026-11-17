import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Picnic basket (standalone): woven wicker basket with lid flaps, a handle, red-white gingham cloth
// peeking out of the top and a baguette end sticking out of the side. Origin = base centre.
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

/** Half-width of the trapezoid body at height y (y goes up from 0 to -200). */
const hw = (y: number) => 170 - 0.15 * y;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1560, s = p.s ?? 1, f: number = p.f ?? 0;
  const wicker: string = p.wickerColor ?? "#C9975C";
  const cloth: string = p.clothColor ?? "#E8503F";
  const weave = shade(wicker, 0.3);
  const rows = [-170, -140, -110, -80, -50, -20];
  const slats = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
  // gingham: 8 x 5 cells of 19 px, red where the row and column sum is even
  const check: React.ReactNode[] = [];
  for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) {
    if ((i + j) % 2 === 0) check.push(<rect key={`${i}-${j}`} x={-76 + i * 19} y={-300 + j * 19} width={19} height={19} fill={cloth} />);
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={22} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f, 400)}>
        {/* baguette: lies behind the basket, one end sticks out at the right */}
        <g transform="translate(120 -150) rotate(-14)">
          <rect x={-130} y={-24} width={260} height={48} rx={24} fill="#E0A24A" />
          <rect x={-130} y={8} width={260} height={16} rx={8} fill="#C97D2A" />
          {[-90, -30, 30].map((d) => <line key={d} x1={d - 10} y1={-14} x2={d + 10} y2={6} stroke="#F5D08A" strokeWidth={6} strokeLinecap="round" />)}
        </g>
        {/* gingham cloth peeking out of the top */}
        <path d="M -84 -196 L -78 -304 Q 0 -318 78 -304 L 84 -196 Z" fill="#FFFFFF" />
        {check}
        {/* basket body: wicker main colour, right half in the shade */}
        <path d="M -170 0 L 170 0 L 200 -200 L -200 -200 Z" fill={wicker} />
        <path d="M 0 0 L 170 0 L 200 -200 L 0 -200 Z" fill={shade(wicker, 0.2)} />
        {slats.map((sx) => <line key={sx} x1={sx} y1={-198} x2={sx * 0.85} y2={-2} stroke={weave} strokeWidth={5} />)}
        {rows.map((ry) => <line key={ry} x1={-hw(ry) + 4} y1={ry} x2={hw(ry) - 4} y2={ry} stroke={weave} strokeWidth={7} strokeLinecap="round" />)}
        {/* lid flaps, open a gap in the middle for the cloth */}
        <rect x={-214} y={-236} width={144} height={36} rx={6} fill={shade(wicker, 0.1)} />
        <rect x={70} y={-236} width={144} height={36} rx={6} fill={shade(wicker, 0.1)} />
        <line x1={-200} y1={-222} x2={-80} y2={-222} stroke={weave} strokeWidth={5} />
        <line x1={80} y1={-222} x2={200} y2={-222} stroke={weave} strokeWidth={5} />
        {/* carry handle */}
        <path d="M -150 -236 C -150 -400 150 -400 150 -236" stroke="#8A5A3C" strokeWidth={22} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
