import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime, skyColours, mix } from "../backdrop/index";

// Mall interior (flat-vector background): a multi-level atrium with shopfronts on two levels, blank signs,
// an escalator, a skylight and potted plants. The stage in the middle of the ground floor stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const floorY = 1340, wall = L(p.wall ?? "#F1ECE4"), accent = p.accent ?? C.purple;
  const shopCols = [C.teal, C.orange, C.blue, C.pink, C.green];
  const [top, , hz] = skyColours(time, "clear");
  const sheen = drift ? Math.sin(f / 80) * 0.08 : 0;
  const shopfront = (x: number, y: number, w: number, h: number, i: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} fill={L(C.greyDark)} />
      <rect x={x + 10} y={y + 10} width={w - 20} height={h - 10} fill={L(shopCols[i % shopCols.length])} />
      <rect x={x + 30} y={y + 30} width={w - 60} height={32} rx={8} fill={L(C.white)} opacity={0.9} />
      <rect x={x + 10} y={y + h - 36} width={w - 20} height={26} fill={shade(L(shopCols[i % shopCols.length]), 0.2)} />
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={wall} />
      {/* skylight across the top */}
      <path d="M 140 0 L 940 0 L 980 150 L 100 150 Z" fill={L(C.greyLight)} />
      <path d="M 170 14 L 910 14 L 940 130 L 140 130 Z" fill={mix(top, hz, 0.3)} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={250 + i * 160} y={14} width={8} height={120} fill={L(C.greyDark)} />)}
      <rect x={0} y={150} width={1080} height={20} fill={shade(wall, 0.1)} />
      {/* upper level: shopfronts and railing */}
      {[60, 340, 620, 900].map((x, i) => shopfront(x, 240, 160, 300, i))}
      <rect x={0} y={560} width={1080} height={16} fill={L(C.greyDark)} />
      {new Array(22).fill(0).map((_, i) => <rect key={i} x={i * 50} y={560} width={12} height={90} fill={L(C.greyDark)} />)}
      <rect x={0} y={640} width={1080} height={10} rx={5} fill={L(C.greyDark)} />
      {/* ground level shopfronts on the back wall */}
      {[0, 1, 2, 3].map((i) => shopfront(20 + i * 270, 740, 240, 280, i + 1))}
      {/* light strip across the back */}
      <rect x={0} y={1010} width={1080} height={12} fill={L("#FFFFFF")} opacity={0.5 + sheen} />
      {/* escalator on the left, diagonal */}
      <g>
        <path d="M 0 1020 L 260 1220 L 260 1260 L 0 1080 Z" fill={L(C.greyDark)} />
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 40} y={1040 + i * 36} width={28} height={10} rx={3} fill={L(C.yellow)} />)}
        <rect x={0} y={1000} width={260} height={14} rx={6} fill={L(accent)} />
      </g>
      {/* second escalator on the right */}
      <g>
        <path d="M 1080 1020 L 820 1220 L 820 1260 L 1080 1080 Z" fill={L(C.greyDark)} opacity={0.9} />
        <rect x={820} y={1000} width={260} height={14} rx={6} fill={L(accent)} />
      </g>
      {/* floor */}
      <rect x={0} y={floorY} width={1080} height={580} fill={L("#DCD3C4")} />
      <rect x={0} y={floorY} width={1080} height={12} fill={shade(L("#DCD3C4"), 0.14)} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={0} y={floorY + 40 + i * 80} width={1080} height={3} fill={shade(L("#DCD3C4"), 0.1)} />)}
      {/* potted plants at the sides */}
      {[[60, 1460], [1000, 1440]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M ${x - 50} ${y} L ${x + 50} ${y} L ${x + 36} ${y + 120} L ${x - 36} ${y + 120} Z`} fill={L(C.orange)} />
          {[-60, -20, 20, 60].map((dx, k) => <ellipse key={k} cx={x + dx} cy={y - 60 - (k % 2) * 30} rx={26} ry={70} fill={L(k % 2 ? C.green : C.greenDark)} transform={`rotate(${dx / 2} ${x + dx} ${y})`} />)}
        </g>
      ))}
    </g>
  );
}
