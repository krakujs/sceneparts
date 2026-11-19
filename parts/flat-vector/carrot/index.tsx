/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector carrot: a long tapered orange carrot lying diagonally on the ground, with ring lines and a leafy top.
// The carrot is built along +x, rotated, then shifted so its lowest point touches y. Honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
const leaf = (L: number, W: number) => `M 0 0 Q ${f1(L / 2)} ${f1(-W)} ${f1(L)} 0 Q ${f1(L / 2)} ${f1(W)} 0 0 Z`;

const LEN = 330, H = 46, TILT = 28, N = 40;
const hw = (xx: number) => H * Math.pow(Math.max(0, 1 - xx / LEN), 0.85);
const rot = (px: number, py: number, deg: number): [number, number] => {
  const r = (deg * Math.PI) / 180;
  return [px * Math.cos(r) - py * Math.sin(r), px * Math.sin(r) + py * Math.cos(r)];
};
const FRONDS: [number, number, number][] = [[-8, 150, 26], [10, 185, 30], [26, 170, 28], [40, 130, 24]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const col: string = p.color ?? C.orange;

  const top: [number, number][] = [], bot: [number, number][] = [];
  for (let i = 0; i <= N; i++) { const xx = (i / N) * LEN; top.push([xx, -hw(xx)]); bot.push([xx, hw(xx)]); }
  const bodyD = "M " + [...top, ...bot.slice().reverse()].map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";
  const shadeD = "M " + [...bot.map(([a]) => [a, 0] as [number, number]), ...bot.slice().reverse()].map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";

  // fit: find the rotated bounds (body plus frond tips) and shift so the lowest point sits on y
  const pool: [number, number][] = [...top, ...bot];
  FRONDS.forEach(([a, L]) => { const r = (180 + a) * Math.PI / 180; pool.push([Math.cos(r) * L, Math.sin(r) * L]); });
  const rp = pool.map(([a, b]) => rot(a, b, TILT));
  const minX = Math.min(...rp.map((q) => q[0])), maxX = Math.max(...rp.map((q) => q[0])), maxY = Math.max(...rp.map((q) => q[1]));
  const cx = (minX + maxX) / 2;

  const rings = [70, 120, 170, 220, 265, 300];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={(maxX - minX) * 0.36} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <g transform={`translate(${f1(-cx)} ${f1(-maxY)}) rotate(${TILT})`}>
          {FRONDS.map(([a, L, W], i) => (
            <g key={i} transform={`rotate(${f1(180 + a)})`}>
              <path d={leaf(L, W)} fill={i % 2 ? shade(C.green, 0.15) : C.green} />
              <path d={`M 0 0 L ${f1(L * 0.85)} 0`} stroke={shade(C.green, 0.35)} strokeWidth={4} strokeLinecap="round" />
            </g>
          ))}
          <path d={bodyD} fill={col} />
          <path d={shadeD} fill={shade(col, 0.2)} />
          {rings.map((xx, i) => (
            <line key={i} x1={xx} y1={-hw(xx)} x2={xx} y2={hw(xx)} stroke={shade(col, 0.3)} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
          ))}
          <circle cx={0} cy={0} r={H} fill={col} />
          <path d={`M 40 ${f1(-hw(40) * 0.45)} L 150 ${f1(-hw(150) * 0.45)}`} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.35} />
        </g>
      </g>
    </g>
  );
}
