/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cucumber: a long dark-green cucumber with small bumps, plus a round slice standing beside it
// showing pale seeds. Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

const SLICE = { x: 200, y: -72, r: 72 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const skin: string = p.color ?? "#3A8F55";
  const pulp = "#D7EDB0";
  const seeds = "#F4F1C9";

  const bumps: React.ReactNode[] = [];
  for (let i = 0; i < 10; i++) {
    const bx = -180 + i * 28, by = i % 2 ? -44 : -84;
    bumps.push(<circle key={i} cx={bx} cy={by} r={5} fill={C.lime} opacity={0.4} />);
  }
  const seedDots: React.ReactNode[] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI * 2) / 8;
    const sx = Math.cos(a) * 36, sy = Math.sin(a) * 36;
    seedDots.push(<ellipse key={k} cx={sx} cy={sy} rx={5} ry={9} fill={seeds} transform={`rotate(${f1((a * 180) / Math.PI)} ${f1(sx)} ${f1(sy)})`} />);
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <g transform="translate(-26 0)">
          {/* stem end */}
          <rect x={-222} y={-74} width={26} height={22} rx={8} fill="#8E7B4F" />
          {/* body */}
          <rect x={-200} y={-118} width={290} height={118} rx={59} fill={shade(skin, 0.2)} />
          <rect x={-200} y={-118} width={282} height={110} rx={55} fill={skin} />
          <rect x={-172} y={-104} width={236} height={14} rx={7} fill={C.green} opacity={0.6} />
          {bumps}
          {/* slice standing upright, face towards the viewer */}
          <g transform={`translate(${SLICE.x} ${SLICE.y})`}>
            <circle cx={0} cy={0} r={SLICE.r} fill={C.greenDark} />
            <circle cx={0} cy={0} r={SLICE.r - 10} fill={pulp} />
            <circle cx={0} cy={0} r={SLICE.r - 28} fill="#EEF8D9" />
            {seedDots}
            <circle cx={0} cy={0} r={6} fill={pulp} />
          </g>
        </g>
      </g>
    </g>
  );
}
