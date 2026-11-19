import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, font } from "../style/index";

// Calendar: wall or desk calendar page with a ring binding, a coloured header band (no month word) and a grid of day
// numbers 1–30 with one day circled. param `day` (1–30) picks the circled day.
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Hero size.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const GX0 = -160, GW = 320, COLS = 7, ROW_Y0 = -250, ROW_H = 44;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const head = p.color && p.color !== "none" ? p.color : C.red;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const day = Math.min(30, Math.max(1, Math.round(Number(p.day ?? 17) || 17)));
  const colW = GW / COLS;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* card */}
        <rect x={-190} y={-360} width={380} height={360} rx={26} fill={C.white} />
        <rect x={-190} y={-360} width={380} height={90} rx={26} fill={head} />
        <rect x={-190} y={-290} width={380} height={20} fill={head} />
        <rect x={-190} y={-300} width={380} height={12} fill={shade(head, 0.2)} opacity={0.5} />
        {/* ring binding */}
        {[-110, 110].map((rx) => (
          <rect key={rx} x={rx - 11} y={-392} width={22} height={64} rx={11} fill={C.greyDark} />
        ))}
        {/* day grid */}
        {Array.from({ length: 30 }, (_, i) => {
          const d = i + 1;
          const col = i % COLS, row = Math.floor(i / COLS);
          const cx = GX0 + colW * (col + 0.5);
          const cy = ROW_Y0 + ROW_H * (row + 0.5);
          const isDay = d === day;
          return (
            <g key={d}>
              {isDay && <circle cx={cx} cy={cy} r={19} fill={accent} />}
              <text x={cx} y={cy + 9} textAnchor="middle" fontFamily={font} fontWeight={isDay ? 800 : 600} fontSize={24} fill={isDay ? C.white : C.ink}>
                {d}
              </text>
            </g>
          );
        })}
        {/* faint bottom rule */}
        <rect x={-160} y={-30} width={320} height={4} rx={2} fill={C.greyLight} />
      </g>
    </g>
  );
}
