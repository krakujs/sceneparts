import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tied cloth money sack with a coin emblem (a star in a round badge) and a few coins at its base.
// Origin = bottom centre (the bag rests on y). About 480 px wide and 560 px tall at s = 1.
// anim "bounce": the sack hops a little and the shadow shrinks as it rises.
const f1 = (v: number) => v.toFixed(1);

// A flat coin seen slightly from above: top face at (x, y), 12 px thick.
const Coin = ({ x, y, c = C.yellow }: { x: number; y: number; c?: string }) => (
  <g>
    <rect x={x - 60} y={y} width={120} height={12} fill={shade(c, 0.3)} />
    <ellipse cx={x} cy={y + 12} rx={60} ry={22} fill={shade(c, 0.3)} />
    <ellipse cx={x} cy={y} rx={60} ry={22} fill={c} />
    <ellipse cx={x} cy={y} rx={36} ry={12} fill={shade(c, 0.12)} />
  </g>
);
// A stack of n coins whose bottom coin's top face is at (x, y).
const Stack = ({ x, y, n, c }: { x: number; y: number; n: number; c: string }) => (
  <g>{Array.from({ length: n }, (_, i) => <Coin key={i} x={x} y={y - i * 12} c={c} />)}</g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const hop = anim === "bounce" ? Math.abs(Math.sin((f * Math.PI) / 30)) : 0;
  const sh = 1 - 0.18 * hop;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250 * sh} ry={16 * sh} fill={C.shadow} />
      {/* coins at the base: two stacks behind the bag, a loose coin in front */}
      <Stack x={-262} y={-34} n={2} c={C.yellow} />
      <Stack x={262} y={-34} n={3} c={C.yellow} />
      <g transform={`translate(0 ${f1(-hop * 62)})`}>
        <g>
          {/* tie gathers at the neck: a wrapped band and two little lobes above it */}
          <path d="M -70 -420 Q -92 -478 -36 -470 Q 0 -500 36 -470 Q 92 -478 70 -420 Z" fill={shade(cloth, 0.12)} />
          <path d="M -210 -150 C -200 -40 -150 0 0 0 C 150 0 200 -40 210 -150 C 222 -260 170 -372 62 -398 L -62 -398 C -170 -372 -222 -260 -210 -150 Z" fill={cloth} />
          {/* shade on the right side of the bag */}
          <path d="M 120 -360 C 190 -280 200 -120 170 -28 C 196 -60 214 -120 210 -150 C 222 -260 170 -372 120 -360 Z" fill={shade(cloth, 0.2)} />
          {/* fold highlight */}
          <path d="M -150 -240 Q -168 -160 -150 -90" stroke={C.white} strokeWidth={16} strokeLinecap="round" fill="none" opacity={0.35} />
          {/* tie band */}
          <rect x={-78} y={-430} width={156} height={38} rx={14} fill={shade(cloth, 0.28)} />
          <rect x={-78} y={-430} width={156} height={10} rx={5} fill={shade(cloth, 0.4)} />
          {/* coin emblem: round badge with a star */}
          <circle cx={0} cy={-190} r={92} fill={shade(cloth, 0.2)} />
          <circle cx={0} cy={-190} r={76} fill={C.yellow} />
          <path d="M 0 -244 L 14 -210 L 50 -208 L 21 -186 L 32 -150 L 0 -171 L -32 -150 L -21 -186 L -50 -208 L -14 -210 Z" fill={C.yellowDark} />
        </g>
      </g>
      {/* the loose coin rests in front of the bag */}
      <Coin x={-30} y={-22} c={C.yellow} />
    </g>
  );
}
