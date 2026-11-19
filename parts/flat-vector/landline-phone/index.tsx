import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Push-button desk phone: a base with a 3 by 4 keypad and a status light, a handset resting in the cradle,
// and a coiled cord from the handset to the base. Origin = bottom centre of the base. anim "ring" shakes it with ring lines.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const COLS = [-90, 0, 90];
const ROWS = [-128, -98, -68, -38];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const handset = p.handset && p.handset !== "none" ? p.handset : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const ringing = anim === "ring";
  const shake = ringing ? 2.5 * Math.sin((f * 2 * Math.PI) / 6) : 0;
  const lines = [0, 1, 2];
  const lineOp = (i: number, side: number) => (ringing ? 0.25 + 0.75 * (Math.sin((f * 2 * Math.PI) / 8 + i * 1.2 + side) > 0 ? 1 : 0.2) : 0);
  // coiled cord from the handset's left end down to the base
  const cord: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const cx = -236 + (-200 + 236) * t + 14 * Math.sin(i * 1.1);
    const cy = -160 + (-40 + 160) * t;
    cord.push(`${i === 0 ? "M" : "L"} ${f1(cx)} ${f1(cy)}`);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={230} ry={12} fill={C.shadow} />
      <g transform={`${motion(anim === "ring" ? "" : anim, f)} translate(0 0) rotate(${f1(shake)} 0 -100)`}>
        {ringing &&
          lines.map((i) => (
            <g key={i} stroke={C.ink} strokeWidth={10} strokeLinecap="round" fill="none">
              <line x1={-300 - i * 14} y1={-180 + i * 30} x2={-328 - i * 14} y2={-180 + i * 30} opacity={lineOp(i, 0)} />
              <line x1={300 + i * 14} y1={-180 + i * 30} x2={328 + i * 14} y2={-180 + i * 30} opacity={lineOp(i, 2)} />
            </g>
          ))}
        <path d={cord.join(" ")} fill="none" stroke={C.greyDark} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        {/* base */}
        <rect x={-200} y={-150} width={400} height={150} rx={28} fill={body} />
        <rect x={-200} y={-30} width={400} height={30} rx={14} fill={shade(body, 0.25)} />
        {/* cradle prongs */}
        <rect x={-120} y={-172} width={22} height={28} rx={5} fill={shade(body, 0.2)} />
        <rect x={98} y={-172} width={22} height={28} rx={5} fill={shade(body, 0.2)} />
        {/* keypad */}
        <rect x={-130} y={-140} width={260} height={112} rx={16} fill={shade(body, 0.2)} />
        {ROWS.map((ry) => COLS.map((cx) => (
          <rect key={`${cx}${ry}`} x={cx - 26} y={ry - 9} width={52} height={18} rx={6} fill={C.greyLight} />
        )))}
        <circle cx={168} cy={-120} r={7} fill={C.green} />
        {/* handset resting in the cradle */}
        <rect x={-200} y={-204} width={400} height={34} rx={16} fill={handset} />
        <rect x={-270} y={-222} width={90} height={62} rx={26} fill={handset} />
        <rect x={180} y={-222} width={90} height={62} rx={26} fill={handset} />
        <rect x={-258} y={-214} width={40} height={10} rx={5} fill={C.white} opacity={0.2} />
        <rect x={218} y={-214} width={40} height={10} rx={5} fill={C.white} opacity={0.2} />
      </g>
    </g>
  );
}
