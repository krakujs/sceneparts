import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Marigold-style flower garland hung in a U swag between two attach points, with green leaves and a
// tassel at the lowest point. Origin = centre of the garland at the attach height: y is the height of
// the two hooks where the ends hang. About 960 px wide and 420 px tall at s = 1 (the swag sags 300 px).
// anim "sway" makes the swag breathe and the tassel swing.
const f1 = (v: number) => v.toFixed(1);
const N = 26;
const LEFT = -460, RIGHT = 460;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 520;
  const c1 = p.color && p.color !== "none" ? p.color : C.orange;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 60) : 0;
  const sag = 600 + 14 * sway;
  // quadratic curve from the left hook, through (0, sag/2 * 2 * ...), to the right hook
  const at = (t: number) => {
    const px = LEFT + (RIGHT - LEFT) * t;
    const py = 2 * sag * t * (1 - t);
    const dx = RIGHT - LEFT, dy = 2 * sag * (1 - 2 * t);
    const len = Math.hypot(dx, dy);
    return { x: px, y: py, tx: dx / len, ty: dy / len };
  };
  const balls = Array.from({ length: N }, (_, i) => at((i + 0.5) / N));
  const leaves = Array.from({ length: N - 1 }, (_, i) => at((i + 1) / N));
  const tassel = at(0.5);
  const sw = sway * 6;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* hooks at the two ends */}
      <circle cx={LEFT} cy={-6} r={12} fill="none" stroke={C.greyDark} strokeWidth={6} />
      <circle cx={RIGHT} cy={-6} r={12} fill="none" stroke={C.greyDark} strokeWidth={6} />
      {/* string running under the flowers */}
      <path d={`M ${LEFT} 0 Q 0 ${f1(sag)} ${RIGHT} 0`} fill="none" stroke={shade(C.green, 0.2)} strokeWidth={5} />
      {/* leaves: a pair at each gap between flowers */}
      {leaves.map((l, i) => {
        const ang = (Math.atan2(l.ty, l.tx) * 180) / Math.PI;
        return (
          <g key={i} transform={`translate(${f1(l.x)} ${f1(l.y)})`}>
            <ellipse cx={0} cy={0} rx={34} ry={12} transform={`rotate(${f1(ang + 38)})`} fill={i % 2 ? C.green : C.greenDark} />
            <ellipse cx={0} cy={0} rx={34} ry={12} transform={`rotate(${f1(ang - 150)})`} fill={i % 2 ? C.greenDark : C.green} />
          </g>
        );
      })}
      {/* tassel hanging from the lowest point */}
      <g transform={`rotate(${f1(sw)} ${f1(tassel.x)} ${f1(tassel.y)})`}>
        <path d={`M ${f1(tassel.x)} ${f1(tassel.y)} L ${f1(tassel.x)} ${f1(tassel.y + 50)}`} stroke={c2} strokeWidth={6} strokeLinecap="round" />
        <rect x={tassel.x - 14} y={tassel.y + 46} width={28} height={34} rx={10} fill={c2} />
        {[-10, -4, 4, 10].map((dx, i) => (
          <path key={i} d={`M ${f1(tassel.x + dx)} ${f1(tassel.y + 78)} L ${f1(tassel.x + dx * 1.2)} ${f1(tassel.y + 118)}`} stroke={shade(c2, 0.15)} strokeWidth={5} strokeLinecap="round" />
        ))}
      </g>
      {/* marigold flowers: a ruffled ball of petals, alternating colours */}
      {balls.map((b, i) => {
        const col = i % 2 ? c2 : c1;
        return (
          <g key={i} transform={`translate(${f1(b.x)} ${f1(b.y)})`}>
            <circle cx={0} cy={0} r={34} fill={shade(col, 0.12)} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
              const a = (k * Math.PI) / 4;
              return <circle key={k} cx={f1(Math.cos(a) * 20)} cy={f1(Math.sin(a) * 20)} r={12} fill={col} />;
            })}
            <circle cx={0} cy={0} r={8} fill={shade(col, 0.3)} />
          </g>
        );
      })}
    </g>
  );
}
