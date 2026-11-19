import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Striped beach hut on stilts: a two-tone plank hut with a gable roof, a door and two windows on a raised deck,
// standing on a mound of sand. Origin = ground centre. About 540 px wide and 640 px tall at s = 1.
// anim "lights": the hut windows glow one after another.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const win = (key: string, x0: number, y0: number, w: number, h: number, glow: boolean) => (
  <g key={key}>
    <rect x={x0} y={y0} width={w} height={h} rx={4} fill={glow ? C.yellow : C.sky} />
    <rect x={x0 + w / 2 - 3} y={y0} width={6} height={h} fill={C.white} opacity={0.8} />
    <path d={`M ${f1(x0 + w * 0.15)} ${f1(y0 + h)} L ${f1(x0 + w * 0.4)} ${f1(y0)} L ${f1(x0 + w * 0.5)} ${f1(y0)} L ${f1(x0 + w * 0.25)} ${f1(y0 + h)} Z`} fill={C.white} opacity={0.4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stripeA = p.color && p.color !== "none" ? p.color : C.teal;
  const stripeB = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const lit = (k: number) => anim === "lights" && Math.floor(f / 8) % 4 === k;
  const wood = C.brownDark;
  const roof = shade(stripeA, 0.35);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={0} rx={300} ry={16} fill={C.shadow} />
        <ellipse cx={0} cy={-4} rx={270} ry={36} fill={C.sand} />
        {/* stilts and cross braces */}
        {[-200, -90, 90, 200].map((px) => <rect key={`st${px}`} x={px - 11} y={-250} width={22} height={250} fill={wood} />)}
        <rect x={-210} y={-140} width={420} height={14} fill={wood} />
        <rect x={-210} y={-60} width={420} height={12} fill={wood} />
        {/* deck */}
        <rect x={-240} y={-262} width={480} height={22} rx={4} fill={C.brown} />
        {/* striped walls */}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={`sp${i}`} x={-220 + i * 55} y={-490} width={55} height={230} fill={i % 2 ? stripeB : stripeA} />
        ))}
        <rect x={-220} y={-490} width={440} height={230} fill="none" />
        {/* roof with overhang and dark shadow band */}
        <path d="M -270 -470 L 0 -630 L 270 -470 Z" fill={roof} />
        <rect x={-270} y={-492} width={540} height={24} rx={6} fill={shade(stripeA, 0.5)} />
        {/* door and windows */}
        <rect x={-55} y={-420} width={110} height={158} rx={6} fill={wood} />
        <circle cx={38} cy={-340} r={4} fill={C.yellow} />
        {win("wl", -200, -400, 80, 80, lit(0))}
        {win("wr", 120, -400, 80, 80, lit(1))}
        {/* steps to the door */}
        <rect x={-70} y={-266} width={140} height={6} fill={shade(C.brown, 0.2)} />
      </g>
    </g>
  );
}
