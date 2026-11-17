import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round pressure gauge on a short pipe stub: thick case, large face, red danger zone, bold ticks and a needle.
// Origin = bottom centre (the floor line, under the pipe). Hero scale: at s = 1 about 440 px wide and 550 px tall. Use s about 0.3 next to a person.
// anim sweep = the needle swings across the dial; otherwise it sits at value (0 = lowest, 1 = highest).
const f1 = (v: number) => v.toFixed(1);
const rad = (d: number) => (d * Math.PI) / 180;
// point on a circle of radius r around the dial centre; d = 0 is straight up, -135 lower left, 135 lower right
const pt = (r: number, d: number) => `${f1(r * Math.sin(rad(d)))},${f1(-r * Math.cos(rad(d)))}`;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const face = p.color && p.color !== "none" ? p.color : C.white;
  const caseCol = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "sweep";
  const value = Math.max(0, Math.min(1, Number(p.value ?? 0.6)));
  const angle = anim === "sweep" ? -135 + 270 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 90)) : -135 + 270 * value;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={16} fill={C.shadow} />
      <g transform={motion(anim === "sweep" ? "none" : anim, f)}>
        {/* pipe with flanges, stub up to the dial */}
        <rect x={-220} y={-70} width={440} height={70} rx={12} fill={C.grey} />
        <rect x={-200} y={-62} width={400} height={8} rx={4} fill={C.white} opacity={0.3} />
        <rect x={-220} y={-90} width={22} height={110} rx={6} fill={C.greyDark} />
        <rect x={198} y={-90} width={22} height={110} rx={6} fill={C.greyDark} />
        <rect x={-30} y={-220} width={60} height={160} fill={C.grey} />
        {/* dial */}
        <g transform="translate(0 -380)">
          <circle cx={0} cy={0} r={170} fill={caseCol} />
          <circle cx={0} cy={0} r={142} fill={face} />
          <path d={`M${pt(128, 90)} A128,128 0 0 1 ${pt(128, 135)}`} fill="none" stroke={C.red} strokeWidth={18} />
          {TICKS.map((k) => {
            const d = -135 + k * 33.75;
            return <path key={k} d={`M${pt(118, d)} L${pt(100, d)}`} fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />;
          })}
          <path d={`M0,0 L${pt(112, angle)}`} fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
          <circle cx={0} cy={0} r={16} fill={C.ink} />
          <ellipse cx={-60} cy={-60} rx={50} ry={22} fill={C.white} opacity={0.25} transform="rotate(-40 -60 -60)" />
        </g>
      </g>
    </g>
  );
}
