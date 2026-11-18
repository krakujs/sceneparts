import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hindu-style shikhara temple: a tall curved, ribbed spire with a kalash finial and a saffron pennant, two small
// flanking spires, a pillared mandapa porch and steps. Stone and sand colours. Origin = centre of the ground line (y).
// About 720 px wide and 1290 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);

/** A shikhara spire: base on y = 0, tip at y = -800, curved sides, ribs and a shaded right half. */
const Spire = ({ stone, rib }: { stone: string; rib: string }) => (
  <g>
    <path d="M -200 0 C -200 -300 -120 -530 -20 -690 Q -6 -770 0 -800 Q 6 -770 20 -690 C 120 -530 200 -300 200 0 Z" fill={stone} />
    <path d="M 0 -800 Q 6 -770 20 -690 C 120 -530 200 -300 200 0 L 0 0 Z" fill={shade(stone, 0.16)} />
    {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => (
      <path key={k} d={`M ${k * 34} -8 Q ${k * 32} -380 ${k * 8} -740`} stroke={rib} strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.45} />
    ))}
    {/* horizontal amalaka rings near the top */}
    <ellipse cx={0} cy={-600} rx={96} ry={14} fill={shade(stone, 0.1)} />
    <ellipse cx={0} cy={-700} rx={48} ry={9} fill={shade(stone, 0.1)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = pick(p.color, "#E9D3A9");
  const saffron = pick(p.color2, "#F2A03D");
  const anim: string = p.anim ?? "none";
  const flutter = anim === "flutter" ? 10 * Math.sin((f * 2 * Math.PI) / 50) : 0;
  const pillar = shade(stone, 0.08);
  const pillars = [-236, -132, 132, 236];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={380} ry={22} fill={C.shadow} />
        {/* plinth and steps */}
        <rect x={-380} y={-60} width={760} height={60} rx={8} fill={shade(stone, 0.12)} />
        <rect x={-150} y={-26} width={300} height={26} rx={6} fill={shade(stone, 0.22)} />
        <rect x={-120} y={-52} width={240} height={26} rx={6} fill={shade(stone, 0.18)} />
        {/* raised mandapa floor and back wall */}
        <rect x={-300} y={-100} width={600} height={40} rx={6} fill={stone} />
        <rect x={-290} y={-300} width={580} height={200} fill={shade(stone, 0.06)} />
        {/* small flanking spires, behind the main one */}
        <g transform="translate(-300 -330) scale(0.42)"><Spire stone={stone} rib={shade(stone, 0.3)} /></g>
        <g transform="translate(300 -330) scale(0.42)"><Spire stone={stone} rib={shade(stone, 0.3)} /></g>
        {/* main spire on the porch roof */}
        <g transform="translate(0 -350)"><Spire stone={stone} rib={shade(stone, 0.3)} /></g>
        {/* kalash finial and saffron pennant */}
        <g transform="translate(0 -1150)">
          <path d="M -16 0 Q 0 -10 16 0 L 10 -24 L -10 -24 Z" fill={C.yellowDark} />
          <circle cx={0} cy={-34} r={12} fill={C.yellowDark} />
          <path d="M -12 -44 Q 0 -66 12 -44 Z" fill={C.yellowDark} />
        </g>
        <rect x={-2} y={-1280} width={4} height={120} fill={C.greyDark} />
        <path d={`M 0 -1280 Q ${f1(50 + flutter)} -1262 ${f1(90 + flutter)} -1250 Q ${f1(60 + flutter)} -1232 0 -1222 Z`} fill={saffron} />
        {/* porch roof slab and pillars */}
        <rect x={-300} y={-350} width={600} height={24} rx={6} fill={shade(stone, 0.15)} />
        <rect x={-290} y={-326} width={580} height={26} fill={shade(stone, 0.25)} opacity={0.4} />
        {pillars.map((px) => (
          <g key={px}>
            <rect x={px - 20} y={-100} width={40} height={-226} rx={4} fill={pillar} />
            <rect x={px - 32} y={-336} width={64} height={18} rx={5} fill={stone} />
            <rect x={px - 30} y={-100} width={60} height={12} rx={4} fill={stone} />
          </g>
        ))}
        {/* dark doorway between the centre pillars */}
        <rect x={-62} y={-232} width={124} height={132} rx={6} fill={shade(stone, 0.45)} />
      </g>
    </g>
  );
}
