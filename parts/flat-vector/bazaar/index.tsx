import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, rnd } from "../backdrop/index";

// Bazaar: a covered stone lane with a draped canopy of hanging fabrics, arches in the back wall, lanterns on
// cords, sacks of spices and rolled rugs at the sides and a rug on the floor. Abstract patterns only.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const ff = drift ? f : 0, glow = time === "dusk" || time === "night";
  const accent = lit(p.accent ?? "#F27BA6", time, true), wall = lit("#E9D3A9", time, true), floorC = lit("#C9A57E", time, true);
  const fabrics = [accent, lit(C.teal, time, true), lit(C.yellow, time, true), lit(C.blue, time, true), lit(C.orange, time, true), lit(C.purple, time, true)];
  const floorY = 1280;
  const arch = (x: number, w: number) => (
    <g>
      <path d={`M ${x} ${floorY} L ${x} 640 Q ${x + w / 2} 430 ${x + w} 640 L ${x + w} ${floorY} Z`} fill={lit(C.brownDark, time, true)} />
      <path d={`M ${x + 22} ${floorY} L ${x + 22} 660 Q ${x + w / 2} 500 ${x + w - 22} 660 L ${x + w - 22} ${floorY} Z`} fill={lit(C.navy, time, true)} />
      <path d={`M ${x - 14} ${floorY} L ${x - 14} 630 Q ${x + w / 2} 412 ${x + w + 14} 630 L ${x + w + 14} ${floorY} L ${x + w} ${floorY} L ${x + w} 640 Q ${x + w / 2} 430 ${x} 640 L ${x} ${floorY} Z`} fill={shade(wall, 0.12)} />
    </g>
  );
  return (
    <g>
      {/* back wall */}
      <rect x={0} y={0} width={1080} height={floorY} fill={wall} />
      {new Array(6).fill(0).map((_, i) => <rect key={i} x={i * 190 + 80} y={0} width={20} height={floorY} fill={shade(wall, 0.08)} />)}
      {arch(40, 230)}
      {arch(420, 240)}
      {arch(810, 230)}
      {/* hanging fabric strips across the top */}
      <rect x={0} y={0} width={1080} height={120} fill={shade(wall, 0.2)} />
      {new Array(18).fill(0).map((_, i) => {
        const x = i * 62 - 10, h = 170 + rnd(31, i) * 60, col = fabrics[i % fabrics.length];
        return (
          <g key={i}>
            <path d={`M ${x} 100 L ${x + 58} 100 L ${x + 54} ${100 + h} L ${x + 30} ${100 + h + 26} L ${x + 4} ${100 + h} Z`} fill={col} />
            <path d={`M ${x + 14} ${100 + h * 0.4} L ${x + 44} ${100 + h * 0.4} L ${x + 44} ${100 + h * 0.4 + 6} L ${x + 14} ${100 + h * 0.4 + 6} Z`} fill={shade(col, 0.25)} />
          </g>
        );
      })}
      {/* lanterns on cords */}
      {p.lanterns !== false && [150, 540, 930].map((x, i) => {
        const sway = Math.sin(ff / 30 + i) * 4, cy = 300 + (i % 2) * 40;
        return (
          <g key={i} transform={`rotate(${f1(sway)} ${x} ${cy})`}>
            <line x1={x} y1={120} x2={x} y2={cy} stroke={C.ink} strokeWidth={3} />
            {glow && <circle cx={x} cy={cy + 40} r={110} fill="#FFD66B" opacity={0.2} />}
            <rect x={x - 30} y={cy} width={60} height={8} rx={3} fill={lit(C.brownDark, time, true)} />
            <path d={`M ${x - 34} ${cy + 8} Q ${x} ${cy + 96} ${x + 34} ${cy + 8} Z`} fill={glow ? "#FFD66B" : lit(C.orange, time, true)} />
            {[-14, 0, 14].map((d, j) => <line key={j} x1={x + d} y1={cy + 10} x2={x + d * 1.2} y2={cy + 80} stroke={shade(C.orange, 0.2)} strokeWidth={3} opacity={0.5} />)}
            <rect x={x - 12} y={cy + 96} width={24} height={10} rx={3} fill={lit(C.brownDark, time, true)} />
          </g>
        );
      })}
      {/* floor */}
      <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={floorC} />
      {new Array(9).fill(0).map((_, i) => <rect key={i} x={0} y={floorY + i * 70 + 20} width={1080} height={3} fill={shade(floorC, 0.12)} />)}
      <rect x={0} y={floorY} width={1080} height={12} fill={shade(floorC, 0.15)} />
      {/* rug on the floor at the front-left, abstract bands */}
      <g>
        <path d="M 0 1560 L 170 1520 L 170 1700 L 0 1750 Z" fill={lit(C.red, time, true)} />
        <path d="M 0 1600 L 170 1566 L 170 1576 L 0 1610 Z" fill={lit(C.yellow, time, true)} />
        <path d="M 0 1660 L 170 1624 L 170 1634 L 0 1670 Z" fill={lit(C.teal, time, true)} />
      </g>
      {/* spice sacks, right side */}
      {[[930, 1480, 70], [1000, 1560, 80], [900, 1640, 74]].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.92} fill={lit("#D8B98A", time, true)} />
          <rect x={x - 16} y={y - r * 0.92 - 16} width={32} height={22} rx={6} fill={lit(C.brownDark, time, true)} />
          <path d={`M ${x - r * 0.6} ${y - r * 0.3} Q ${x} ${y + r * 0.2} ${x + r * 0.6} ${y - r * 0.3}`} fill="none" stroke={shade(lit("#D8B98A", time, true), 0.25)} strokeWidth={5} />
          <circle cx={x - r * 0.3} cy={y + r * 0.35} r={6} fill={lit(C.orange, time, true)} />
          <circle cx={x + r * 0.2} cy={y + r * 0.45} r={5} fill={lit(C.red, time, true)} />
        </g>
      ))}
      {/* rolled rugs leaning at the left wall */}
      {[[40, 1330], [96, 1344]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={44} height={230} rx={22} fill={lit(i ? C.purple : C.pink, time, true)} />
          <rect x={x + 8} y={y + 40} width={28} height={6} fill={shade(lit(C.yellow, time, true), 0.1)} />
          <rect x={x + 8} y={y + 70} width={28} height={6} fill={shade(lit(C.yellow, time, true), 0.1)} />
        </g>
      ))}
      {/* a low brass-look lamp stand on the far right, lit at dusk and night */}
      <path d="M 1000 1400 L 1020 1340 L 1060 1340 L 1080 1400 Z" fill={glow ? "#FFE9A8" : lit(C.yellow, time, true)} />
      <rect x={1030} y={1400} width={10} height={90} fill={lit(C.brownDark, time, true)} />
    </g>
  );
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
