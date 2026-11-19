import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gold chain necklace laid in a U on a simple display bust, with a teardrop pendant set in gold, holding a gem.
// Origin = bottom centre (the bust plinth sits on y). About 420 px wide and 340 px tall at s = 1 (hero size).
// anim "sway": the pendant swings on its chain; "sparkle": a glint pulses beside the pendant.
const f1 = (v: number) => v.toFixed(1);

const pendantD = "M 0 -104 C 16 -84 40 -72 40 -46 A 40 40 0 0 1 -40 -46 C -40 -72 -16 -84 0 -104 Z";

const Star = ({ x, y, k, c }: { x: number; y: number; k: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(k)})`} opacity={f1(Math.min(1, k))}>
    <path d="M 0 -22 L 5 -5 L 22 0 L 5 5 L 0 22 L -5 5 L -22 0 L -5 -5 Z" fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const gem = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 70) * 7 : 0;
  const k = anim === "sparkle" ? 0.6 + 0.4 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40)) : 0;
  // chain links along the lower half of an ellipse from the left collar point, through the bottom, to the right
  const N = 24;
  const links = Array.from({ length: N + 1 }, (_, i) => {
    const t = (Math.PI * i) / N;
    return { px: 104 * Math.cos(t), py: -200 + 96 * Math.sin(t), rot: i % 2 ? 90 : 0 };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      {/* plinth */}
      <rect x={-150} y={-60} width={300} height={60} rx={10} fill={C.grey} />
      <rect x={-150} y={-60} width={300} height={12} rx={6} fill={shade(C.grey, 0.15)} />
      {/* simple display bust */}
      <path d="M -200 -60 L -200 -118 Q -200 -180 -140 -196 L -74 -212 L -66 -330 L 66 -330 L 74 -212 L 140 -196 Q 200 -180 200 -118 L 200 -60 Z" fill="#B9C1CF" />
      <path d="M 66 -330 L 74 -212 L 140 -196 Q 200 -180 200 -118 L 200 -60 L 60 -60 Z" fill="#A3ACBC" opacity={0.9} />
      {/* chain */}
      {links.map(({ px, py, rot }, i) => (
        <ellipse key={i} cx={f1(px)} cy={f1(py)} rx={11} ry={7} fill="none" stroke={shade(gold, 0.2)} strokeWidth={5} transform={`rotate(${rot} ${f1(px)} ${f1(py)})`} />
      ))}
      {/* pendant: gold bezel with a gem inside, hanging from the lowest link */}
      <g transform={`translate(0 -104) rotate(${f1(swing)}) scale(1.2) translate(0 104)`}>
        <path d={pendantD} fill={gold} stroke={shade(gold, 0.2)} strokeWidth={4} />
        <path d={pendantD} fill={shade(gold, 0.15)} opacity={0.35} transform="translate(8 6) scale(0.92)" />
        <g transform="translate(0 -60) scale(0.66) translate(0 60)">
          <path d={pendantD} fill={gem} />
        </g>
        <path d="M -18 -64 Q -14 -84 0 -90" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      </g>
      {sparkleStar(anim, k, gold)}
    </g>
  );
}

function sparkleStar(anim: string, k: number, c: string) {
  if (anim !== "sparkle") return null;
  return <Star x={92} y={-150} k={k} c={c} />;
}
