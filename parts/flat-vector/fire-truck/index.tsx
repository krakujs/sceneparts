import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fire engine, side view, facing right: long red body, cab at the front, ladder rack on the roof, hose reel, roof beacon.
// anim "siren": the roof beacon flashes (the wheels still roll only when vx is not 0).
// Room scale: about 910 px wide and 560 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const lit = anim !== "siren" || Math.floor(f / 8) % 2 === 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={C.greyLight} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={C.grey} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={C.grey} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={470} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* chassis */}
          <rect x={-450} y={-170} width={900} height={40} rx={8} fill={frame} />
          {/* main body */}
          <rect x={-450} y={-340} width={600} height={180} rx={18} fill={body} />
          <rect x={-450} y={-340} width={600} height={22} rx={10} fill={shade(body, 0.2)} />
          {/* cab with windscreen and a bonnet at the front */}
          <path d="M 140 -160 L 140 -360 Q 140 -382 162 -382 L 280 -382 Q 312 -382 330 -354 L 432 -236 Q 450 -214 450 -180 L 450 -160 Z" fill={body} />
          <path d="M 196 -362 L 280 -362 L 350 -264 L 196 -264 Z" fill={C.sky} />
          <rect x={150} y={-268} width={8} height={100} rx={3} fill={shade(body, 0.22)} />
          {/* yellow stripe */}
          <rect x={-450} y={-235} width={900} height={14} fill={C.yellow} />
          {/* compartment door seams */}
          <rect x={-300} y={-330} width={6} height={160} fill={shade(body, 0.25)} />
          <rect x={-206} y={-330} width={6} height={160} fill={shade(body, 0.25)} />
          {/* hose reel on the side */}
          <circle cx={-110} cy={-270} r={46} fill={C.greyDark} />
          <circle cx={-110} cy={-270} r={30} fill={C.greyLight} />
          <circle cx={-110} cy={-270} r={10} fill={C.greyDark} />
          {/* ladder rack on the roof */}
          <rect x={-440} y={-378} width={560} height={14} rx={7} fill={C.greyLight} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((k) => (
            <rect key={k} x={-430 + k * 40} y={-364} width={8} height={24} fill={C.greyDark} />
          ))}
          {/* roof beacon on the cab */}
          <rect x={200} y={-402} width={50} height={20} rx={4} fill={C.greyDark} />
          {lit && <circle cx={225} cy={-418} r={40} fill={C.red} opacity={0.3} />}
          <rect x={206} y={-440} width={38} height={24} rx={11} fill={lit ? C.red : C.redDark} />
          {/* lights and bumpers */}
          <rect x={420} y={-210} width={20} height={18} rx={5} fill={C.yellow} />
          <rect x={-456} y={-320} width={12} height={40} rx={4} fill={C.red} />
          <rect x={440} y={-150} width={30} height={32} rx={8} fill={C.greyDark} />
          {arch(-330, 82)}
          {arch(320, 82)}
        </g>
        {wheel(-330, 82)}
        {wheel(320, 82)}
      </g>
    </g>
  );
}
