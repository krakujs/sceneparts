import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Boombox: portable stereo with two speakers, a cassette deck and a carry handle. Origin = bottom centre (feet on y).
// anim "pulse": both speaker cones beat in time and throw a soft ring.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const beat = anim === "pulse" ? Math.max(0, Math.sin((f * 2 * Math.PI) / 24)) : 0;
  const speaker = (cx: number) => (
    <g>
      <circle cx={cx} cy={-122} r={80} fill={shade(body, 0.35)} />
      <circle cx={cx} cy={-122} r={64} fill={C.inkSoft} />
      <g transform={`translate(${cx} -122) scale(${f1(1 + 0.08 * beat)})`}>
        <circle cx={0} cy={0} r={40} fill={C.ink} />
        <circle cx={0} cy={0} r={16} fill={C.grey} />
      </g>
      {beat > 0 && <circle cx={cx} cy={-122} r={f1(92 + 16 * beat)} fill="none" stroke={C.white} strokeWidth={6} opacity={f1(0.7 * beat)} />}
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={270} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -150 -262 C -150 -350 150 -350 150 -262" fill="none" stroke={C.inkSoft} strokeWidth={22} strokeLinecap="round" />
        <rect x={-170} y={-278} width={38} height={36} rx={10} fill={C.inkSoft} />
        <rect x={132} y={-278} width={38} height={36} rx={10} fill={C.inkSoft} />
        <rect x={-200} y={-26} width={70} height={26} rx={8} fill={shade(body, 0.4)} />
        <rect x={130} y={-26} width={70} height={26} rx={8} fill={shade(body, 0.4)} />
        <rect x={-240} y={-270} width={480} height={250} rx={30} fill={body} />
        <rect x={-228} y={-262} width={456} height={8} rx={4} fill={C.white} opacity={0.3} />
        {speaker(-145)}
        {speaker(145)}
        <rect x={-60} y={-232} width={120} height={60} rx={10} fill={C.ink} />
        <circle cx={-30} cy={-202} r={14} fill={C.greyLight} />
        <circle cx={30} cy={-202} r={14} fill={C.greyLight} />
        <circle cx={-30} cy={-202} r={5} fill={C.greyDark} />
        <circle cx={30} cy={-202} r={5} fill={C.greyDark} />
        <circle cx={0} cy={-130} r={18} fill={C.greyDark} />
        <rect x={-1} y={-146} width={2} height={12} fill={C.greyLight} />
        {[-32, 0, 32].map((bx) => (
          <rect key={bx} x={bx - 11} y={-84} width={22} height={12} rx={3} fill={C.greyLight} />
        ))}
      </g>
    </g>
  );
}
