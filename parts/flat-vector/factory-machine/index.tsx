import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic industrial press machine: plinth, main body with a control panel of gauges and indicator lights,
// a yellow press head with a ram, a dome beacon and an output slot. Room scale, about 830 px tall at s = 1.
// Origin = floor centre under the plinth. anim "press": the ram drops and rises, the gauge needle moves and
// the indicator lights blink.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const ramp = anim === "press" ? (1 - Math.cos((f * 2 * Math.PI) / 60)) / 2 : 0;
  const down = 50 * ramp;
  const needle = -60 + 120 * ramp;
  const blink = anim === "press" && Math.floor(f / 15) % 2 === 1;
  const rad = (d: number) => (d * Math.PI) / 180;
  const gauge = (gx: number, gy: number, a: number) => (
    <g>
      <circle cx={gx} cy={gy} r={40} fill={C.white} />
      <circle cx={gx} cy={gy} r={40} fill="none" stroke={C.greyLight} strokeWidth={8} />
      <line x1={gx} y1={gy} x2={gx + 28 * Math.cos(rad(a))} y2={gy + 28 * Math.sin(rad(a))} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
      <circle cx={gx} cy={gy} r={7} fill={C.ink} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* plinth and main body */}
        <rect x={-300} y={-120} width={600} height={120} rx={14} fill={shade(body, 0.25)} />
        <rect x={-240} y={-560} width={480} height={450} rx={26} fill={body} />
        <rect x={-240} y={-200} width={480} height={22} fill={shade(body, 0.2)} />
        {/* control panel with gauges and lights */}
        <rect x={-190} y={-420} width={230} height={190} rx={16} fill={C.ink} />
        {gauge(-115, -340, needle)}
        {gauge(-15, -340, -20)}
        {[-140, -90, -40].map((lx, i) => (
          <circle key={lx} cx={lx} cy={-270} r={16} fill={i === 0 ? C.green : i === 1 ? C.yellow : C.red}
            opacity={blink && i !== 0 ? 0.35 : 1} />
        ))}
        {/* output slot */}
        <rect x={-150} y={-150} width={300} height={30} rx={8} fill={C.ink} />
        {/* press: ram rod and head move together */}
        <g transform={`translate(0 ${f1(down)})`}>
          <rect x={-28} y={-620} width={56} height={60} fill={shade(accent, 0.25)} />
          <rect x={-80} y={-560} width={160} height={40} rx={8} fill={shade(accent, 0.25)} />
          <rect x={-200} y={-760} width={400} height={140} rx={22} fill={accent} />
          <rect x={-180} y={-742} width={360} height={14} rx={7} fill={C.white} opacity={0.35} />
        </g>
        {/* dome beacon on top */}
        <circle cx={0} cy={-786} r={22} fill={blink ? C.redDark : C.red} />
        <circle cx={-6} cy={-792} r={6} fill={C.white} opacity={0.6} />
      </g>
    </g>
  );
}
