import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ramadan lantern (fanous style): an ornate metal lantern with a domed top and ring, four coloured glass
// panels and a candle glowing inside. Origin = the top ring (the lantern hangs from y).
// About 300 px wide and 480 px tall at s = 1.
// anim "flicker": the candle flame and glow pulse. anim "sway": the lantern swings on its ring.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 300;
  const glass = p.color && p.color !== "none" ? p.color : C.red;
  const metal = p.color2 && p.color2 !== "none" ? p.color2 : "#C9963A";
  const glass2 = p.color3 && p.color3 !== "none" ? p.color3 : C.teal;
  const anim: string = p.anim ?? "none";
  const wave = 0.5 + 0.5 * Math.sin(f * 0.9) * 0.6 + 0.5 * Math.sin(f * 2.3) * 0.4;
  const flicker = anim === "flicker";
  const fh = flicker ? 0.9 + wave * 0.2 : 1;
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 100) * 4 : 0;
  const panels: [number, string][] = [[-130, glass], [-65, C.yellow], [0, glass], [65, glass2]];
  const bars = [-130, -65, 0, 65, 130];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(sway)} 0 0)`}>
        {/* ring and dome */}
        <circle cx={0} cy={20} r={20} fill="none" stroke={shade(metal, 0.1)} strokeWidth={8} />
        <path d="M -130 112 Q -130 40 0 40 Q 130 40 130 112 Z" fill={metal} />
        <rect x={-146} y={102} width={292} height={22} rx={8} fill={shade(metal, 0.1)} />
        {/* glass panels */}
        {panels.map(([px, col], i) => (
          <path key={i} d={`M ${px} 124 L ${px + 65} 124 L ${px + 59} 402 L ${px + 6} 402 Z`} fill={col} />
        ))}
        {/* glow inside the glass */}
        <circle cx={0} cy={300} r={150} fill={C.yellow} opacity={flicker ? 0.14 + wave * 0.1 : 0.2} />
        {/* candle and flame */}
        <rect x={-16} y={300} width={32} height={96} rx={6} fill={"#F4E3C1"} />
        <g transform={`translate(0 298) scale(1 ${f1(fh)})`}>
          <path d="M 0 0 C -15 -10 -18 -36 0 -58 C 18 -36 15 -10 0 0 Z" fill={C.orange} />
          <path d="M 0 -6 C -7 -16 -8 -32 0 -44 C 8 -32 7 -16 0 -6 Z" fill={C.yellow} />
        </g>
        {/* metal frame bars and cross rails */}
        {bars.map((bx) => <rect key={bx} x={bx - 7} y={110} width={14} height={300} rx={5} fill={metal} />)}
        <rect x={-138} y={116} width={276} height={12} rx={6} fill={metal} />
        <rect x={-138} y={384} width={276} height={12} rx={6} fill={metal} />
        {/* base cone and finial */}
        <path d="M -128 404 L 128 404 L 74 440 L -74 440 Z" fill={metal} />
        <circle cx={0} cy={456} r={16} fill={shade(metal, 0.1)} />
      </g>
    </g>
  );
}
