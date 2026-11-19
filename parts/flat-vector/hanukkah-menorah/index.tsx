import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hanukkah menorah (hanukkiah): nine candles on a gold base. The centre candle is the shamash (helper),
// set higher. Origin = bottom centre (it stands on y). About 600 px wide and 560 px tall at s = 1.
// lit (0-9): how many candles are flaming. Candles are lit from the right-hand end, the shamash last of the
// first five. anim "flicker": the flames sway and pulse.
const f1 = (v: number) => v.toFixed(1);
const ORDER = [8, 7, 6, 5, 4, 3, 2, 1, 0]; // order in which candles are lit

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : "#E0A21F";
  const candle = p.color2 && p.color2 !== "none" ? p.color2 : "#F4E3C1";
  const lit = Math.max(0, Math.min(9, Math.round(Number(p.lit ?? 9))));
  const anim: string = p.anim ?? "none";
  const flicker = anim === "flicker";
  const candles = Array.from({ length: 9 }, (_, i) => {
    const xc = (i - 4) * 72;
    const central = i === 4;
    const yEnd = central ? -372 : -300 - Math.abs(i - 4) * 4;
    const h = central ? 150 : 118;
    const isLit = ORDER.indexOf(i) < lit;
    const k = flicker ? 0.5 + 0.5 * Math.sin(f * 0.9 + i) : 0.6;
    const sway = flicker ? Math.sin(f * 1.6 + i * 0.7) * 3 : 0;
    return { xc, yEnd, h, isLit, k, sway, central, i };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={16} fill={C.shadow} />
      {/* base and stem */}
      <rect x={-250} y={-34} width={500} height={34} rx={12} fill={shade(gold, 0.15)} />
      <rect x={-200} y={-72} width={400} height={40} rx={14} fill={gold} />
      <rect x={-16} y={-212} width={32} height={150} rx={8} fill={gold} />
      <ellipse cx={0} cy={-212} rx={42} ry={14} fill={gold} />
      <circle cx={0} cy={-240} r={24} fill={shade(gold, 0.1)} />
      {/* branches */}
      {candles.map((c) => (
        <path key={`arm${c.i}`} d={`M 0 -206 C ${f1(c.xc * 0.2)} -206 ${f1(c.xc)} ${f1(c.yEnd + 70)} ${f1(c.xc)} ${f1(c.yEnd)}`} fill="none" stroke={gold} strokeWidth={14} strokeLinecap="round" />
      ))}
      {/* candles, cups and flames */}
      {candles.map((c) => (
        <g key={`c${c.i}`}>
          <ellipse cx={f1(c.xc)} cy={f1(c.yEnd)} rx={26} ry={10} fill={shade(gold, 0.1)} />
          <rect x={f1(c.xc - 12) as any} y={f1(c.yEnd - c.h) as any} width={24} height={c.h} rx={5} fill={candle} />
          <rect x={f1(c.xc + 4) as any} y={f1(c.yEnd - c.h) as any} width={8} height={c.h} rx={4} fill={shade(candle, 0.12)} opacity={0.6} />
          {c.isLit ? (
            <g transform={`translate(${f1(c.xc + c.sway)} ${f1(c.yEnd - c.h - 4)}) scale(1 ${f1(flicker ? 0.9 + c.k * 0.2 : 1)})`}>
              <circle cx={0} cy={-26} r={30} fill={C.yellow} opacity={0.25} />
              <path d="M 0 0 C -16 -12 -18 -38 0 -62 C 18 -38 16 -12 0 0 Z" fill={C.orange} />
              <path d="M 0 -6 C -7 -16 -8 -34 0 -46 C 8 -34 7 -16 0 -6 Z" fill={C.yellow} />
            </g>
          ) : (
            <line x1={f1(c.xc)} y1={f1(c.yEnd - c.h)} x2={f1(c.xc)} y2={f1(c.yEnd - c.h - 10)} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          )}
        </g>
      ))}
    </g>
  );
}
