import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Snowmobile, side view, facing right: low body with a seat and handlebars, front ski, rear track with rollers.
// Origin = floor centre; the ski and the track stand on y. About 750 px wide and 270 px tall at s = 1.
// anim "drive": the track rollers turn and the machine bounces a little; vx moves it along.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 12 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const roller = (cx: number, cy: number) => (
    <g>
      <circle cx={cx} cy={cy} r={22} fill={C.greyLight} />
      <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
        <rect x={cx - 4} y={cy - 18} width={8} height={36} rx={3} fill={C.greyDark} />
        <rect x={cx - 18} y={cy - 4} width={36} height={8} rx={3} fill={C.greyDark} />
      </g>
      <circle cx={cx} cy={cy} r={6} fill={C.ink} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={370} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* rear track */}
          <rect x={-340} y={-70} width={360} height={70} rx={35} fill={dark} />
          {roller(-300, -35)}
          {roller(-40, -35)}
          {/* front ski and its strut */}
          <rect x={80} y={-110} width={20} height={90} fill={C.greyDark} />
          <path d="M 60 -28 L 300 -26 Q 370 -26 400 -56 L 410 -44 Q 380 0 300 0 L 60 0 Q 40 0 40 -14 Q 40 -28 60 -28 Z" fill={dark} />
          {/* body, seat, windscreen, bars and lights */}
          <path d="M -290 -75 Q -300 -130 -230 -140 L -40 -150 Q 60 -150 120 -120 L 190 -90 Q 215 -80 200 -60 L 120 -50 L -240 -50 Z" fill={body} />
          <rect x={-180} y={-112} width={220} height={14} rx={7} fill={shade(body, 0.22)} />
          <path d="M 110 -140 L 150 -250 L 176 -250 L 170 -130 Z" fill={C.sky} opacity={0.85} />
          <rect x={-200} y={-186} width={150} height={40} rx={18} fill={C.ink} />
          <rect x={140} y={-262} width={14} height={150} fill={C.greyDark} />
          <rect x={120} y={-272} width={100} height={14} rx={7} fill={C.greyDark} />
          <circle cx={214} cy={-78} r={12} fill={C.yellow} />
          <rect x={-300} y={-112} width={16} height={22} rx={5} fill={C.red} />
        </g>
      </g>
    </g>
  );
}
