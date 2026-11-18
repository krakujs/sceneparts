import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden-framed hourglass (sand timer). Origin = bottom centre (the base rests on y). About 300 px wide
// and 560 px tall at s = 1. anim "flow": the top sand drains into the bottom bulb over the shot and a
// thin falling stream runs through the neck. Motion uses p.f and p.d.
const f1 = (v: number) => v.toFixed(1);

// Glass geometry: upper bulb from y -520 (top) to -280 (neck), lower bulb from -280 to -40 (bottom).
const NECK = -280, TOP = -520, BOT = -40, NECK_HW = 14, RIM_HW = 118;
// Half width of the glass at height y (the upper bulb narrows to the neck; the lower one widens).
const hw = (y: number) => (y <= NECK
  ? NECK_HW + (RIM_HW - NECK_HW) * ((NECK - y) / (NECK - TOP))
  : NECK_HW + (RIM_HW - NECK_HW) * ((y - NECK) / (BOT - NECK)));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, d = p.d ?? 120, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const sand = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  // a = how much sand is still in the top bulb (1 = full). flow drains it over the whole shot.
  const prog = Math.min(1, Math.max(0, f / Math.max(1, d - 1)));
  const a = anim === "flow" ? 1 - 0.97 * prog : 1;
  const topY = NECK - a * 200; // surface of the top sand
  const botY = BOT - (1 - a) * 200 * 0.97 - 2; // surface of the bottom sand (rises as the top drains)
  const topSand = a > 0.01
    ? `M ${f1(-hw(topY))} ${f1(topY)} L ${f1(hw(topY))} ${f1(topY)} L ${NECK_HW} ${NECK} L ${-NECK_HW} ${NECK} Z`
    : "";
  const botSand = (1 - a) > 0.01
    ? `M ${f1(-hw(botY))} ${f1(botY)} L ${f1(hw(botY))} ${f1(botY)} L ${RIM_HW - 4} ${BOT} L ${-(RIM_HW - 4)} ${BOT} Z`
    : "";
  const flowing = anim === "flow" && a > 0.02 && a < 0.99;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={14} fill={C.shadow} />
      {/* glass bulbs */}
      <path d={`M ${-RIM_HW} ${TOP} L ${RIM_HW} ${TOP} Q ${RIM_HW} ${TOP + 60} ${NECK_HW} ${NECK} Q ${RIM_HW} ${BOT - 60} ${RIM_HW} ${BOT} L ${-RIM_HW} ${BOT} Q ${-RIM_HW} ${BOT - 60} ${-NECK_HW} ${NECK} Q ${-RIM_HW} ${TOP + 60} ${-RIM_HW} ${TOP} Z`}
        fill={C.sky} />
      {/* sand */}
      {topSand && <path d={topSand} fill={sand} />}
      {botSand && <path d={botSand} fill={sand} />}
      {/* falling stream through the neck and a few drops */}
      {flowing && (
        <g>
          <rect x={-3} y={NECK} width={6} height={Math.max(1, botY - NECK)} fill={sand} />
          {[0, 1, 2].map((i) => {
            const span = Math.max(10, botY - NECK);
            const yy = NECK + 10 + (((f * 5 + i * (span / 3)) % span));
            return <circle key={i} cx={0} cy={yy} r={5} fill={sand} />;
          })}
        </g>
      )}
      {/* glass shine */}
      <path d={`M ${-RIM_HW + 30} ${TOP + 70} Q ${-RIM_HW + 40} ${NECK - 60} ${-NECK_HW - 10} ${NECK - 20}`} stroke={C.white} strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.6} />
      {/* wooden frame: top and bottom plates and four posts */}
      <rect x={-150} y={TOP - 40} width={300} height={40} rx={12} fill={wood} />
      <rect x={-150} y={TOP - 40} width={300} height={12} rx={6} fill={shade(wood, 0.2)} />
      <rect x={-150} y={BOT} width={300} height={40} rx={12} fill={wood} />
      <rect x={-150} y={BOT + 28} width={300} height={12} rx={6} fill={shade(wood, 0.2)} />
      <rect x={-130} y={TOP} width={22} height={BOT - TOP} rx={8} fill={shade(wood, 0.12)} />
      <rect x={108} y={TOP} width={22} height={BOT - TOP} rx={8} fill={shade(wood, 0.12)} />
      {/* neck collar */}
      <rect x={-30} y={NECK - 10} width={60} height={20} rx={8} fill={shade(wood, 0.25)} />
    </g>
  );
}
