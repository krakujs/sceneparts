import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Xylophone: eight coloured bars of falling length on a wooden frame, with two mallets.
// Origin = bottom centre. anim "play" strikes the bars in turn; each bar dips when hit.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const N = 8;
const RAIL = -360;
const BAR_W = 70;
const GAP = 8;
const left0 = -((N * (BAR_W + GAP)) - GAP) / 2;
const barX = (i: number) => left0 + i * (BAR_W + GAP);
const barH = (i: number) => 260 - i * 14;
const barCol = [C.red, C.orange, C.yellow, C.green, C.teal, C.blue, C.purple, C.pink];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const head = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const anim: string = p.anim ?? "none";
  // the bar being struck by each mallet (left and right hands)
  const hitL = anim === "play" ? Math.floor(f / 12) % N : -1;
  const hitR = anim === "play" ? Math.floor(f / 12 + 0.5) % N : -1;
  // mallet pivots above the rail; each mallet points its ball at the middle of its bar
  const mallet = (px: number, bar: number, lift: number) => {
    const bx = barX(bar) + BAR_W / 2, by = RAIL + 40 + 24;
    const dx = bx - px, dy = by - (-520);
    const L = Math.sqrt(dx * dx + dy * dy);
    const ang = (Math.atan2(-dx, dy) * 180) / Math.PI;
    return (
      <g transform={`translate(${f1(px)} -520) rotate(${f1(ang + lift)})`}>
        <line x1={0} y1={0} x2={0} y2={L} stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
        <circle cx={0} cy={L} r={26} fill={head} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={380} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* legs */}
        <rect x={-340} y={-300} width={22} height={300} rx={8} fill={wood} />
        <rect x={318} y={-300} width={22} height={300} rx={8} fill={wood} />
        <rect x={-352} y={-14} width={46} height={14} rx={6} fill={shade(wood, 0.3)} />
        <rect x={306} y={-14} width={46} height={14} rx={6} fill={shade(wood, 0.3)} />
        {/* top rail and under rail */}
        <rect x={-380} y={RAIL - 10} width={760} height={34} rx={12} fill={wood} />
        <rect x={-380} y={RAIL + 14} width={760} height={10} rx={4} fill={shade(wood, 0.3)} />
        {/* bars */}
        {Array.from({ length: N }, (_, i) => {
          const dip = i === hitL || i === hitR ? 8 : 0;
          return (
            <g key={i}>
              <rect x={barX(i)} y={RAIL + 40 + dip} width={BAR_W} height={barH(i)} rx={10} fill={barCol[i]} />
              <rect x={barX(i) + BAR_W - 14} y={RAIL + 40 + dip} width={14} height={barH(i)} rx={6} fill={shade(barCol[i], 0.2)} />
              <rect x={barX(i) + 10} y={RAIL + 50 + dip} width={8} height={barH(i) - 30} rx={4} fill={C.white} opacity={0.35} />
            </g>
          );
        })}
        {/* strings holding the bars to the rails */}
        {Array.from({ length: N }, (_, i) => (
          <rect key={`s${i}`} x={barX(i) + BAR_W / 2 - 3} y={RAIL + 24} width={6} height={18} fill={shade(wood, 0.4)} />
        ))}
        {/* mallets */}
        {anim === "play" ? (
          <>
            {mallet(-200, hitL, 0)}
            {mallet(200, hitR, 0)}
          </>
        ) : (
          <>
            {mallet(-200, 2, 0)}
            {mallet(200, 5, 0)}
          </>
        )}
      </g>
    </g>
  );
}
