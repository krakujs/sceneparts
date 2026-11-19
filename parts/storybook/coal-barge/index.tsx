import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Coal barge: long low wooden canal barge heaped with coal, a small cabin and a smoking chimney. Stands on (x, y) at the waterline.
export const CoalBarge: React.FC<{ x: number; y: number; s?: number; f?: number; smoke?: boolean; hull?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, smoke = true, hull = C.sepia, flip = false }) => {
  const bob = Math.sin(f / 25) * 4;
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const coal: [number, number, number][] = [[-300, -240, 36], [-230, -280, 40], [-150, -270, 42], [-70, -300, 44], [10, -290, 42], [90, -270, 40], [160, -250, 34], [-260, -210, 30], [-180, -220, 32], [-100, -235, 34], [-20, -230, 34], [60, -225, 32], [130, -215, 30]];
  const puffs = [0, 1, 2].map((i) => {
    const t = ((f + i * 50) % 150) / 150;
    return { cx: 258 + t * 60, cy: -450 - t * 230, r: 26 + t * 52, op: 0.9 * (1 - t) };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={6} rx={460} ry={22} fill="#000" opacity={0.18} />
      <path d="M -500 -40 Q -250 -60 0 -40 T 500 -40 L 500 40 L -500 40 Z" fill={C.teal} opacity={0.85} />
      <g transform={`translate(0 ${bob})`}>
        {smoke ? puffs.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={C.cream} stroke={C.ink} strokeWidth={4} opacity={p.op} />) : null}
        <path d="M -420 -200 L 420 -200 L 362 -40 Q 336 0 286 0 L -330 0 Q -382 0 -404 -40 Z" fill={hull} {...o} />
        <path d="M -380 -165 L 380 -165" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} strokeLinecap="round" />
        <rect x={-428} y={-214} width={856} height={22} rx={6} fill={C.brick} {...o} />
        <path d="M -380 -200 Q -360 -300 -230 -300 Q -140 -340 -40 -300 Q 60 -330 160 -290 L 180 -200 Z" fill={C.stoneDark} {...o} />
        {coal.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={C.stone} stroke={C.ink} strokeWidth={4} />)}
        {[[-240, -262], [-40, -284], [120, -248]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={6} fill="#FFFFFF" opacity={0.7} />)}
        <rect x={200} y={-330} width={150} height={130} fill={C.cream} {...o} />
        <path d="M 185 -330 L 275 -392 L 365 -330 Z" fill={C.brickDark} {...o} />
        <rect x={224} y={-300} width={44} height={40} fill={C.glow} stroke={C.ink} strokeWidth={5} />
        <rect x={290} y={-292} width={40} height={92} fill={C.navy} stroke={C.ink} strokeWidth={5} />
        <rect x={240} y={-440} width={34} height={110} fill={C.ink} />
        <rect x={232} y={-450} width={50} height={16} rx={4} fill={C.ink} />
      </g>
      <path d="M -500 -14 Q -250 -34 0 -14 T 500 -14 L 500 60 L -500 60 Z" fill={C.teal} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" opacity={0.92} />
      <path d="M -380 14 q 40 -18 80 0 M 120 26 q 40 -18 80 0 M -40 40 q 40 -18 80 0" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <CoalBarge x={p.x} y={p.y} s={p.s} f={p.f} smoke={p.smoke} hull={p.hull} flip={p.flip} />;
}
