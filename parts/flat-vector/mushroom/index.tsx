/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector mushroom: a button mushroom (brown cap) or a toadstool (red cap with white spots), cream stalk and gills.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

const CAP = "M -172 -230 C -178 -330 -100 -405 0 -405 C 100 -405 178 -330 172 -230 Z";
const STALK = "M -62 -236 C -62 -170 -78 -90 -108 0 L 108 0 C 78 -90 62 -170 62 -236 Z";
const SPOTS: [number, number, number][] = [[-95, -318, 22], [15, -345, 28], [110, -292, 17], [-32, -268, 14], [62, -270, 12]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const toad = p.variant === "toadstool";
  const cap: string = toad ? C.red : (p.color ?? C.brown);
  const gills: React.ReactNode[] = [];
  for (let i = 0; i < 11; i++) {
    const gx = -150 + i * 30;
    gills.push(<line key={i} x1={gx} y1={-236} x2={gx * 0.9} y2={-208} stroke="#D9C9A4" strokeWidth={4} strokeLinecap="round" />);
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={135} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <path d={STALK} fill={shade("#F4E8CF", 0.1)} />
        <path d="M -52 -236 C -52 -170 -66 -90 -94 0 L 98 0 C 70 -90 56 -170 56 -236 Z" fill="#F4E8CF" />
        <ellipse cx={0} cy={-232} rx={168} ry={24} fill="#EFE3C8" />
        {gills}
        <path d={CAP} fill={shade(cap, 0.22)} />
        <g transform="translate(-7 -5)">
          <path d={CAP} fill={cap} />
          {toad && SPOTS.map(([sx, sy, r], i) => <circle key={i} cx={sx} cy={sy} r={r} fill="#FFFFFF" />)}
          <ellipse cx={-92} cy={-338} rx={38} ry={14} fill="#FFFFFF" opacity={0.35} transform="rotate(-22 -92 -338)" />
        </g>
      </g>
    </g>
  );
}
