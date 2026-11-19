import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Christmas tree: a decorated fir with four green tiers, a yellow garland, coloured baubles and a star on top.
// Origin = centre of the trunk base on the ground. About 700 px wide and 1180 px tall at s = 1.
// anim lights makes the baubles twinkle.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

// Tiers from the bottom up: [skirt y, half width at the skirt, tip y]
const TIERS: [number, number, number][] = [[-220, 340, -560], [-420, 280, -760], [-600, 220, -930], [-760, 150, -1060]];
// Baubles: [x, y, radius, colour]
const BAUBLES: [number, number, number, string][] = [
  [-170, -330, 16, C.red], [120, -300, 15, C.yellow], [-40, -250, 16, C.blue], [170, -360, 14, C.pink], [-250, -260, 14, C.yellow],
  [-120, -470, 15, C.pink], [90, -520, 16, C.red], [-150, -540, 14, C.blue], [170, -460, 14, C.yellow], [20, -640, 14, C.red],
  [-80, -650, 15, C.yellow], [110, -700, 16, C.blue], [-120, -740, 14, C.red], [40, -820, 13, C.pink],
  [-30, -900, 12, C.red], [30, -980, 11, C.yellow],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : C.greenDark;
  const trunkC = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const lights = anim === "lights";
  // Garland: a smile-shaped yellow swag across each tier.
  const garland = TIERS.map(([base, hw, top]) => {
    const y0 = base - (base - top) * 0.12;
    const w = (hw * (y0 - top)) / (base - top) * 0.8;
    return `M ${f1(-w)} ${f1(y0)} Q ${f1(-w / 2)} ${f1(y0 + 50)} 0 ${f1(y0 + 10)} Q ${f1(w / 2)} ${f1(y0 + 50)} ${f1(w)} ${f1(y0)}`;
  });
  const starPts = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? 34 : 80, a = ((-90 + i * 36) * Math.PI) / 180;
    return `${f1(Math.cos(a) * r)} ${f1(-1120 + Math.sin(a) * r)}`;
  }).join(" L ");
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <rect x={-40} y={-240} width={80} height={240} rx={8} fill={trunkC} />
        {TIERS.map(([base, hw, top], i) => {
          const body = `M ${-hw} ${base} L 0 ${top} L ${hw} ${base} Q 0 ${base + 28} ${-hw} ${base} Z`;
          const half = `M 0 ${top} L ${hw} ${base} Q 0 ${base + 28} 0 ${base} Z`;
          return (
            <g key={i}>
              <path d={body} fill={green} />
              <path d={half} fill={shade(green, 0.22)} />
            </g>
          );
        })}
        {garland.map((d, i) => <path key={i} d={d} stroke={C.yellow} strokeWidth={10} strokeLinecap="round" fill="none" />)}
        {BAUBLES.map(([bx, by, r0, col], i) => {
          const r = r0 * 1.3;
          const tw = lights ? 0.15 + 0.85 * Math.max(0, Math.sin((f * 2 * Math.PI) / 36 + i * 1.3)) : 0.5;
          return (
            <g key={i}>
              <circle cx={bx} cy={by} r={r} fill={shade(col, 0.2)} />
              <circle cx={bx} cy={by} r={r * 0.85} fill={col} />
              <circle cx={f1(bx - r * 0.35) as any} cy={f1(by - r * 0.35) as any} r={r * 0.3} fill={C.white} opacity={f1(tw) as any} />
            </g>
          );
        })}
        <polygon points={starPts} fill={C.yellow} stroke={C.yellowDark} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </g>
  );
}
