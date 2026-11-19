import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Draped saree on a wooden hanger: a matching short blouse, a pleated skirt panel with a gold border at
// the hem, and the pallu (the long end) draped diagonally over the front with the same gold border.
// Origin = bottom centre (the hem rests on y). About 520 px wide and 740 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.purple;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const pleats = Array.from({ length: 8 }, (_, i) => {
    const t0 = -136 + i * 34, t1 = t0 + 34, b0 = -212 + i * 53, b1 = b0 + 53;
    return <path key={i} d={`M ${t0} -330 L ${t1} -330 L ${b1} -36 L ${b0} -36 Z`} fill={i % 2 ? shade(main, 0.12) : main} />;
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* matching blouse with short sleeves */}
          <path d="M -72 -586 L 72 -586 L 150 -560 L 166 -470 L 150 -440 L 136 -330 L -136 -330 L -150 -440 L -166 -470 L -150 -560 Z" fill={main} />
          <path d="M -72 -586 Q 0 -500 72 -586" stroke={gold} strokeWidth={12} strokeLinecap="round" fill="none" />
          {/* pleated skirt panel */}
          {pleats}
          <rect x={-138} y={-338} width={276} height={12} rx={4} fill={gold} />
          {/* gold hem border */}
          <rect x={-214} y={-36} width={428} height={36} fill={gold} />
          <path d="M -214 -24 L 214 -24" stroke={shade(gold, 0.25)} strokeWidth={3} strokeDasharray="12 8" />
          {/* pallu: a wide band over the front, with a gold border on both edges */}
          <path d="M -112 -572 Q -30 -430 118 -330 Q 176 -250 170 -40" stroke={gold} strokeWidth={124} strokeLinecap="butt" fill="none" />
          <path d="M -112 -572 Q -30 -430 118 -330 Q 176 -250 170 -40" stroke={main} strokeWidth={100} strokeLinecap="butt" fill="none" />
          <path d="M 120 -250 L 150 -40 M 146 -250 L 170 -40" stroke={shade(main, 0.3)} strokeWidth={4} fill="none" opacity={0.6} />
        </g>
      </g>
    </g>
  );
}
