import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tall rocky sea-cliff on the right half, with a grass lip on top and a little surf at the foot on the left.
// Irregular angular facets in two warm tones. Origin = centre of the base. About 1000 px wide and 1000 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const poly = (pts: number[][]) => `M ${pts.map(([a, b]) => `${a} ${b}`).join(" L ")} Z`;

// Main face silhouette, from the base on the left, up and round the top, down the right side.
const FACE = [
  [-150, 0], [-178, -120], [-132, -232], [-188, -342], [-122, -470], [-152, -598], [-72, -716], [-82, -828],
  [-20, -930], [60, -984], [170, -1000], [262, -968], [342, -1010], [432, -958], [482, -902], [502, -780],
  [470, -642], [522, -520], [482, -380], [526, -232], [502, -100], [522, 0],
];
// Grass lip lying on the top edge.
const LIP = [
  [-44, -924], [60, -982], [170, -998], [262, -964], [342, -1006], [432, -956], [482, -900], [468, -876],
  [430, -928], [340, -966], [262, -926], [170, -956], [60, -942], [-10, -896],
];
// Lighter sand facets (lit from the upper left).
const SAND_A = [[-120, -470], [-152, -598], [-72, -716], [-82, -828], [-20, -930], [40, -804], [-12, -692], [40, -556], [-24, -446]];
const SAND_B = [[-132, -232], [-188, -342], [-122, -470], [-24, -446], [-64, -336], [-70, -250]];
const SAND_C = [[-150, 0], [-132, -232], [-70, -250], [-42, -120], [-100, 0]];
const SAND_D = [[262, -968], [342, -1010], [432, -958], [482, -902], [502, -780], [420, -820], [330, -858], [280, -900]];
const SAND_E = [[470, -642], [522, -520], [482, -380], [400, -500], [430, -590]];
// Darker facet on the shadow side of the right face.
const SHADOW = [[430, -590], [400, -500], [482, -380], [526, -232], [470, -190], [380, -330], [350, -470]];
// Cracks, drawn as angular strokes.
const CRACKS: number[][][] = [
  [[-40, -560], [10, -520], [-20, -470], [30, -420]],
  [[250, -700], [300, -660], [280, -600]],
  [[380, -400], [330, -350], [360, -290]],
  [[-110, -760], [-70, -720], [-86, -676]],
];
// Small rocks at the foot on the left.
const ROCKS: number[][][] = [
  [[-262, 0], [-232, -44], [-190, -52], [-158, -30], [-150, 0]],
  [[-438, 0], [-404, -30], [-362, -36], [-330, -12], [-318, 0]],
  [[-300, 0], [-282, -18], [-256, -20], [-246, 0]],
];
// Sea and surf. Each foam blob pulses in flow mode.
const SURF: [number, number, number][] = [[-132, -40, 62], [-214, -24, 46], [-318, -30, 36], [-420, -18, 28]];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const rock = col(p.color, "#C68A55");
  const sand = col(p.color2, "#E9C990");
  const anim: string = p.anim ?? "none";
  const flow = anim === "flow";
  const rockDark = shade(rock, 0.22);
  const crack = shade(rock, 0.35);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* sea at the foot, on the left */}
      <path d="M -530 -96 Q -330 -118 -120 -84 L -120 0 L -530 0 Z" fill={C.skyDeep} />
      <path d="M -530 -50 Q -330 -70 -150 -40" stroke={C.white} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.7}
        strokeDasharray={flow ? "50 40" : undefined} strokeDashoffset={flow ? -f * 2 : 0} />
      {/* rocks in the surf */}
      {ROCKS.map((r, i) => <path key={i} d={poly(r)} fill={i === 1 ? rockDark : rock} />)}
      {/* the face */}
      <path d={poly(FACE)} fill={rock} />
      <path d={poly(SAND_A)} fill={sand} />
      <path d={poly(SAND_B)} fill={sand} />
      <path d={poly(SAND_C)} fill={sand} />
      <path d={poly(SAND_D)} fill={sand} />
      <path d={poly(SAND_E)} fill={sand} />
      <path d={poly(SHADOW)} fill={rockDark} />
      {CRACKS.map((c, i) => (
        <path key={i} d={`M ${c.map(([a, b]) => `${a} ${b}`).join(" L ")}`} stroke={crack} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
      {/* grass lip */}
      <path d={poly(LIP)} fill={C.green} />
      <path d="M 170 -956 L 262 -926 L 340 -966 L 430 -928 L 468 -876 L 430 -918 L 340 -948 L 262 -908 L 170 -940 Z" fill={shade(C.green, 0.2)} />
      {/* surf at the foot */}
      {SURF.map(([sx, sy, r], i) => {
        const pulse = flow ? 1 + 0.15 * Math.sin(f / 12 + i * 1.7) : 1;
        return <ellipse key={i} cx={sx} cy={sy} rx={r * pulse} ry={r * 0.34 * pulse} fill={C.white} />;
      })}
    </g>
  );
}
