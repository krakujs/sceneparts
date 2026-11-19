import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gold coins: two stacks on the floor, a few loose coins lying in front. anim "drop": a coin falls onto
// the left stack every 60 frames and fades as it lands. Frame 0 shows the coin high above the stack.
// Origin = floor centre (1 m ~ 560 px). Stacks are about 0.2 m tall at s = 1.
const f1 = (v: number) => v.toFixed(1);

// A flat coin: a top face at (x, y) with a 12 px edge below it.
const Coin = ({ x, y, c, op = 1 }: { x: number; y: number; c: string; op?: number }) => (
  <g opacity={op}>
    <rect x={x - 60} y={y} width={120} height={12} fill={shade(c, 0.3)} />
    <ellipse cx={x} cy={y + 12} rx={60} ry={22} fill={shade(c, 0.3)} />
    <ellipse cx={x} cy={y} rx={60} ry={22} fill={c} />
    <ellipse cx={x} cy={y} rx={36} ry={12} fill={shade(c, 0.12)} />
  </g>
);
// A stack of n coins standing on the floor: the bottom coin's edge touches y = 0.
const Stack = ({ x, n, c }: { x: number; n: number; c: string }) => (
  <g>{Array.from({ length: n }, (_, i) => <Coin key={i} x={x} y={-34 - i * 12} c={c} />)}</g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const left = -200, n1 = 4, n2 = 6;
  const landY = -34 - (n1 - 1) * 12; // top face of the left stack
  // drop: fall from 600 px above the stack, accelerating; fade out on landing; repeat every 60 frames.
  const t = Math.min(1, (f % 60) / 50);
  const fallY = -640 + (landY + 640) * t * t;
  const fallOp = t < 0.9 ? 1 : Math.max(0, (1 - t) / 0.1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={430} ry={18} fill={C.shadow} />
      <Stack x={left} n={n1} c={gold} />
      <Stack x={130} n={n2} c={gold} />
      {anim === "drop" && <Coin x={left} y={fallY} c={gold} op={fallOp} />}
      {/* loose coins lying in front */}
      <Coin x={-40} y={-22} c={gold} />
      <Coin x={60} y={-14} c={gold} />
      <Coin x={320} y={-14} c={gold} />
    </g>
  );
}
