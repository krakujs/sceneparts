import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Room, lit, asTime, rnd } from "../backdrop/index";

// Wedding venue background: a floral arch at the back, rows of chairs to either side, an aisle carpet down the
// middle, string lights across the top and flower stands at the sides. The aisle stays clear for characters.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1360, carpet = L(p.carpet ?? C.pink), chair = L(p.chair ?? C.white), leaf = L(C.green);
  const flowers = [C.pink, C.white, C.yellow, C.purple, C.orange, C.red];
  // Points along the floral arch: top half of an ellipse centred on (540, 1200).
  const arch = new Array(15).fill(0).map((_, i) => {
    const a = Math.PI * (i / 14);
    return [540 - Math.cos(a) * 190, 1200 - Math.sin(a) * 320];
  });
  const chairAt = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y - 60} width={44} height={56} rx={8} fill={chair} />
      <rect x={x - 4} y={y} width={52} height={14} rx={5} fill={shade(chair, 0.12)} />
      <rect x={x + 4} y={y + 14} width={6} height={26} fill={L(C.brownDark)} />
      <rect x={x + 34} y={y + 14} width={6} height={26} fill={L(C.brownDark)} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={p.wall ?? "#F7F0E8"} floor={p.floor ?? "#D9C29A"} floorY={floorY} floorKind="boards" panels={false} />
      {/* string lights across the top */}
      <path d="M 0 120 Q 540 230 1080 120" stroke={L(C.greyDark)} strokeWidth={3} fill="none" />
      {new Array(18).fill(0).map((_, i) => {
        const t = (i + 0.5) / 18, x = t * 1080, y = 120 + 4 * t * (1 - t) * 110 + 6;
        const on = time === "night" || time === "dusk" || !drift || Math.sin(f / 18 + i) > -0.2;
        return <circle key={i} cx={x} cy={y} r={7} fill={on ? "#FFE9A8" : L(C.greyLight)} />;
      })}
      {/* floral arch at the back */}
      <path d="M 350 1200 A 190 320 0 0 1 730 1200" stroke={leaf} strokeWidth={40} fill="none" strokeLinecap="round" />
      {arch.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x - 20} cy={y - 6} r={24} fill={L(flowers[i % flowers.length])} />
          <circle cx={x + 18} cy={y + 8} r={20} fill={L(flowers[(i + 2) % flowers.length])} />
        </g>
      ))}
      {/* drapes at the top sides */}
      <path d="M 0 150 L 150 150 Q 100 420 150 760 L 0 760 Z" fill={L("#F5C6D6")} />
      <path d="M 1080 150 L 930 150 Q 980 420 930 760 L 1080 760 Z" fill={L("#F5C6D6")} />
      {/* aisle carpet down the middle */}
      <path d="M 470 1200 L 610 1200 L 760 1360 L 320 1360 Z" fill={carpet} />
      {/* rows of chairs to either side */}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <g key={`l${r}${c}`} transform={`translate(${20 + c * 68} ${900 + r * 78}) scale(1.2) translate(${-20} ${-900})`}>{chairAt(20, 900)}</g>))}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <g key={`r${r}${c}`} transform={`translate(${862 + c * 68} ${900 + r * 78}) scale(1.2) translate(${-20} ${-900})`}>{chairAt(20, 900)}</g>))}
      {/* flower stands at the sides in front */}
      {[[60, 1230], [900, 1230]].map(([x, y], s) => (
        <g key={s}>
          <rect x={x + 18} y={y + 60} width={40} height={120} fill={L(C.greyDark)} />
          <rect x={x} y={y + 40} width={76} height={24} rx={6} fill={L(C.white)} />
          {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={x + 10 + i * 14} cy={y + 20 + (i % 2) * 8} r={13} fill={L(flowers[(i + s * 2) % flowers.length])} />)}
        </g>
      ))}
    </g>
  );
}
