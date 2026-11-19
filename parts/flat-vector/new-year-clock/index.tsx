import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clock face near midnight: a thick rim, twelve ticks, an hour hand just before twelve and a minute hand
// nearly at twelve, with confetti scattered around. Origin = centre of the face.
const f1 = (v: number) => v.toFixed(1);
const R = 250;
const CONFETTI = [C.pink, C.yellow, C.teal, C.purple, C.orange, C.blue, C.lime];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 800;
  const rim = p.color && p.color !== "none" ? p.color : C.navy;
  const anim: string = p.anim ?? "none";
  // minute hand: starts at 56 minutes (-24 degrees) and ticks to 0 over 40 frames, then stays at 12
  const minDeg = anim === "tick" ? -24 * Math.max(0, 1 - f / 40) : -24;
  const hourDeg = minDeg / 12 - 2;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const big = i % 3 === 0;
    return (
      <line key={i} x1={f1(Math.sin(a) * (R - 36))} y1={f1(-Math.cos(a) * (R - 36))} x2={f1(Math.sin(a) * (R - (big ? 70 : 60)))} y2={f1(-Math.cos(a) * (R - (big ? 70 : 60)))}
        stroke={big ? C.ink : C.grey} strokeWidth={big ? 14 : 8} strokeLinecap="round" />
    );
  });
  const confetti = Array.from({ length: 34 }, (_, i) => {
    const a = (i * 2.399) % (Math.PI * 2);
    const d = R + 40 + ((i * 37) % 180);
    const w = 16 + (i % 4) * 6, h = 8 + (i % 3) * 4;
    return <rect key={i} x={f1(Math.cos(a) * d - w / 2)} y={f1(Math.sin(a) * d - h / 2)} width={w} height={h} rx={3} transform={`rotate(${(i * 47) % 180} ${f1(Math.cos(a) * d)} ${f1(Math.sin(a) * d)})`} fill={CONFETTI[i % CONFETTI.length]} />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {confetti}
      {/* rim and face */}
      <circle cx={0} cy={0} r={R + 26} fill={rim} />
      <circle cx={0} cy={0} r={R + 26} fill="none" stroke={shade(rim, 0.25)} strokeWidth={10} />
      <circle cx={0} cy={0} r={R} fill={C.white} />
      <circle cx={0} cy={0} r={R - 14} fill={C.paper} />
      {ticks}
      {/* hour hand */}
      <g transform={`rotate(${f1(hourDeg)})`}>
        <rect x={-14} y={-140} width={28} height={150} rx={14} fill={C.ink} />
      </g>
      {/* minute hand */}
      <g transform={`rotate(${f1(minDeg)})`}>
        <rect x={-10} y={-200} width={20} height={214} rx={10} fill={C.blue} />
      </g>
      <circle cx={0} cy={0} r={18} fill={C.red} />
    </g>
  );
}
