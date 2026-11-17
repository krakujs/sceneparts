import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fireplace: brick fireplace with a mantel, two candles and a burning fire. Origin = floor centre.
// anim "flicker" makes the flames move and the warm glow pulse.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flamePath = (w: number, h: number) => `M ${f1(-w / 2)} 0 C ${f1(-w / 2)} ${f1(-h * 0.4)} ${f1(-w * 0.1)} ${f1(-h * 0.55)} 0 ${f1(-h)} C ${f1(w * 0.1)} ${f1(-h * 0.55)} ${f1(w / 2)} ${f1(-h * 0.4)} ${f1(w / 2)} 0 Z`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brick = p.color && p.color !== "none" ? p.color : "#B5583E";
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const glowK = flicker ? 0.1 + 0.05 * Math.sin(f * 1.9) : 0.1;
  const flame = (i: number) => ({
    rot: flicker ? 4 * Math.sin(f * 1.1 + i * 1.7) : 0,
    sx: flicker ? 1 + 0.07 * Math.sin(f * 1.7 + i * 2.2) : 1,
    sy: flicker ? 1 + 0.1 * Math.sin(f * 2.4 + i * 1.3) : 1,
  });
  // Brick courses: rows of bricks, offset every other row, clipped to the surround.
  const bricks: React.ReactNode[] = [];
  for (let r = 0; r < 13; r++) {
    const yy = -560 + r * 40;
    const off = (r % 2) * 40;
    for (let cIdx = -1; cIdx < 9; cIdx++) {
      const bx = -330 + off + cIdx * 80;
      const x0 = Math.max(-330, bx + 3), x1 = Math.min(330, bx + 77);
      if (x1 - x0 <= 4) continue;
      bricks.push(
        <rect key={`b${r}-${cIdx}`} x={x0} y={yy + 3} width={x1 - x0} height={34} rx={3}
          fill={(r * 7 + cIdx * 3) % 5 === 0 ? shade(brick, 0.14) : brick} />,
      );
    }
  }
  const flames = [
    { cx: -62, w: 110, h: 190, c: C.orange, i: 0, inner: C.yellow },
    { cx: 4, w: 130, h: 250, c: C.orange, i: 1, inner: C.yellow },
    { cx: 78, w: 90, h: 150, c: C.red, i: 2, inner: C.orange },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-330} y={-560} width={660} height={520} rx={6} fill="#EADCC8" />
        {bricks}
        <rect x={-370} y={-600} width={740} height={44} rx={8} fill={wood} />
        <rect x={-370} y={-572} width={740} height={16} rx={6} fill={shade(wood, 0.2)} />
        <path d="M -270 -600 C -280 -640 -250 -660 -240 -672 L -226 -672 C -216 -660 -190 -640 -200 -600 Z" fill={C.teal} />
        {[{ x: 200, h: 80, w: 28 }, { x: 250, h: 60, w: 22 }].map((cd, i) => (
          <g key={`cd${i}`}>
            <rect x={cd.x - cd.w / 2} y={-600 - cd.h} width={cd.w} height={cd.h} rx={6} fill={C.paper} />
            <rect x={cd.x + cd.w * 0.15} y={-600 - cd.h} width={cd.w * 0.3} height={cd.h} rx={4} fill={shade(C.paper, 0.15)} />
            <rect x={cd.x - 2} y={-600 - cd.h - 8} width={4} height={8} fill={C.ink} />
            <g transform={`translate(${f1(cd.x)} ${f1(-600 - cd.h - 8)}) rotate(${f1(flicker ? 3 * Math.sin(f * 1.3 + i) : 0)})`}>
              <path d={flamePath(16, 36)} fill={C.orange} />
            </g>
          </g>
        ))}
        <path d="M -220 -44 V -290 Q -220 -360 -150 -360 H 150 Q 220 -360 220 -290 V -44 Z" fill="#2A2330" />
        <rect x={-200} y={-300} width={400} height={256} rx={0} fill="#3B2A35" />
        <ellipse cx={0} cy={-130} rx={200} ry={140} fill={C.orange} opacity={glowK} />
        <rect x={-150} y={-70} width={260} height={32} rx={16} fill={C.brownDark} transform="rotate(-6 -20 -54)" />
        <rect x={-110} y={-60} width={260} height={32} rx={16} fill={C.brown} transform="rotate(5 20 -44)" />
        {flames.map((fl) => {
          const m = flame(fl.i);
          const fx = fl.cx;
          return (
            <g key={`f${fl.i}`} transform={`translate(${f1(fx)} -60) rotate(${f1(m.rot)}) scale(${f1(m.sx)} ${f1(m.sy)})`}>
              <path d={flamePath(fl.w, fl.h)} fill={fl.c} />
              <path d={flamePath(fl.w * 0.55, fl.h * 0.6)} fill={fl.inner} />
            </g>
          );
        })}
        <rect x={-380} y={-44} width={760} height={44} rx={6} fill="#D9D2C5" />
        <rect x={-380} y={-44} width={760} height={8} rx={4} fill="#EFEBE3" />
      </g>
    </g>
  );
}
