import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector birthday cake: two tiers with frosting dots, five candles whose flames flicker (from f).
// Origin = resting point (bottom centre), honours flip and s. Hero size ~460 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function BirthdayCake(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const frost = p.frosting ?? "#FFF6EC";
  const sponge = "#F5C7D6";
  const ry = 32;
  const R1 = 200, R2 = 150;
  const base = 0, L1Top = -130, L2Top = -250;
  const candleColours = [C.blue, C.yellow, C.green, C.purple, C.orange];

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const tier = (R: number, yTop: number, yBot: number, body: string, top: string) => (
    <g>
      <path d={`M ${-R} ${yBot} L ${-R} ${yTop} A ${R} ${ry} 0 0 0 ${R} ${yTop} L ${R} ${yBot} A ${R} ${ry} 0 0 1 ${-R} ${yBot} Z`} fill={body} />
      <path d={`M ${-R} ${yTop} A ${R} ${ry} 0 0 0 ${R} ${yTop} A ${R} ${ry} 0 0 1 ${-R} ${yTop} Z`} fill={top} />
      <path d={`M ${-R} ${yTop + 20} A ${R} ${ry} 0 0 0 ${R} ${yTop + 20} L ${R} ${yTop} A ${R} ${ry} 0 0 1 ${-R} ${yTop} Z`} fill={top} />
    </g>
  );

  // candles on the top tier: stick, flame flickers with f
  const candleXs = [-100, -50, 0, 50, 100];
  const candles = candleXs.map((cx, i) => {
    const flick = Math.sin(f * 0.35 + i * 1.7) * 0.5 + Math.sin(f * 0.91 + i * 0.6) * 0.3;
    const sy = 1 + 0.1 * flick, sx = 1 - 0.06 * flick;
    const topY = L2Top - 96;
    return (
      <g key={i}>
        <rect x={cx - 9} y={topY} width={18} height={L2Top - topY + 6} rx={4} fill={candleColours[i]} />
        <rect x={cx - 9} y={topY + 8} width={18} height={7} fill={shade(candleColours[i], 0.2)} opacity={0.6} />
        <line x1={cx} y1={topY} x2={cx} y2={topY - 8} stroke={C.inkSoft} strokeWidth={3} />
        <g transform={`translate(${cx} ${f1(topY - 8)}) scale(${f1(sx)} ${f1(sy)})`}>
          <path d="M 0 -58 C 16 -40 18 -22 0 0 C -18 -22 -16 -40 0 -58 Z" fill={C.orange} />
          <path d="M 0 -40 C 8 -28 9 -18 0 -4 C -9 -18 -8 -28 0 -40 Z" fill={C.yellow} />
        </g>
      </g>
    );
  });

  const dots = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return <circle key={i} cx={f1(Math.cos(a) * (R1 - 30))} cy={L1Top - 12 + Math.sin(a) * 6} r={8} fill={i % 2 ? C.pink : C.purple} />;
  });
  const dots2 = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return <circle key={i} cx={f1(Math.cos(a) * (R2 - 26))} cy={L2Top - 12 + Math.sin(a) * 5} r={7} fill={i % 2 ? C.teal : C.yellow} />;
  });

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={R1 + 30} ry={22} fill={C.shadow} />
      <g transform={tr}>
        {tier(R1, L1Top, base, sponge, frost)}
        {/* frosting drip band along the bottom tier's top edge */}
        {[-150, -90, -30, 30, 90, 150].map((dx, i) => (
          <g key={i}>
            <rect x={dx - 12} y={L1Top + 2} width={24} height={[26, 40, 20, 46, 30, 22][i]} rx={12} fill={frost} />
          </g>
        ))}
        {dots}
        {tier(R2, L2Top, L1Top, sponge, frost)}
        {[-110, -50, 10, 70, 120].map((dx, i) => (
          <rect key={i} x={dx - 12} y={L2Top + 2} width={24} height={[34, 22, 44, 26, 30][i]} rx={12} fill={frost} />
        ))}
        {dots2}
        {candles}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <BirthdayCake {...p} />;
}
