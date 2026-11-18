import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dead tree: a bare grey-brown trunk with a branching network of leafless limbs. Origin = centre of the trunk base on the ground.
// About 800 px wide and 1000 px tall at s = 1. anim sway moves the upper branches a little.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = (p.s ?? 1) * 0.68, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : "#7D6A58";
  const twig = p.color2 && p.color2 !== "none" ? p.color2 : "#A08C78";
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? 1 * Math.sin((f * 2 * Math.PI) / 110) : 0;

  // Recursive branching: each limb splits into two shorter, thinner limbs.
  const limbs: React.ReactNode[] = [];
  const grow = (bx: number, by: number, a: number, len: number, w: number, depth: number, k: number) => {
    const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len;
    limbs.push(
      <line key={k} x1={f1(bx)} y1={f1(by)} x2={f1(ex)} y2={f1(ey)} stroke={w < 9 ? twig : wood} strokeWidth={w} strokeLinecap="round" />
    );
    if (depth <= 0) return;
    const spread = 0.38 + 0.22 * hash(k);
    grow(ex, ey, a - spread + (hash(k + 5) - 0.5) * 0.2, len * 0.74, w * 0.66, depth - 1, k * 2 + 1);
    grow(ex, ey, a + spread * (0.8 + 0.4 * hash(k + 9)), len * 0.7, w * 0.66, depth - 1, k * 2 + 2);
  };
  grow(0, -470, -Math.PI / 2 - 0.05, 420, 40, 5, 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={16} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <path d="M -48 0 Q -26 -10 -24 -60 L -30 -470 L 30 -470 L 24 -60 Q 26 -10 48 0 Z" fill={wood} />
        <path d="M 0 0 L 48 0 Q 26 -10 24 -60 L 30 -470 L 0 -470 Z" fill={shade(wood, 0.2)} />
        <path d="M -20 -60 Q -70 -20 -110 -6" stroke={wood} strokeWidth={14} strokeLinecap="round" fill="none" />
        <path d="M 20 -60 Q 70 -20 120 -6" stroke={wood} strokeWidth={14} strokeLinecap="round" fill="none" />
        <g transform={`rotate(${f1(sway)} 0 -470)`}>{limbs}</g>
      </g>
    </g>
  );
}
