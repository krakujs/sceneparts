import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic space rocket, front view: pointed nose, round porthole, three-fin tail, engine bell.
// Origin = bottom of the engine bell (on the pad); about 300 px wide and 1220 px tall at s = 1.
// anim "launch": the flame burns and the rocket accelerates upward; anim "bob": a small wobble.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1600;
  const x = p.x ?? 540;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const accent = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const launch = anim === "launch";
  const rise = launch ? -0.125 * f * f : 0;
  const wobble = anim === "bob" ? Math.sin((f * 2 * Math.PI) / 60) * 1.2 : 0;
  const L = launch ? 150 * (1 + 0.16 * Math.sin(f * 0.9) + 0.05 * Math.sin(f * 2.7)) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${f1(rise)}) rotate(${f1(wobble)}) scale(${f1(popScale(anim, f))})`}>
        {/* exhaust flame */}
        {launch && (
          <g>
            <path d={`M -74 -2 Q -62 ${f1(L * 0.6)} 0 ${f1(L)} Q 62 ${f1(L * 0.6)} 74 -2 Z`} fill={C.orange} />
            <path d={`M -38 -2 Q -30 ${f1(L * 0.4)} 0 ${f1(L * 0.7)} Q 30 ${f1(L * 0.4)} 38 -2 Z`} fill={C.yellow} />
          </g>
        )}
        {/* fins */}
        <path d="M -140 -380 L -270 -200 L -270 -40 Q -270 -20 -250 -20 L -150 -20 L -140 -110 Z" fill={accent} />
        <path d="M 140 -380 L 270 -200 L 270 -40 Q 270 -20 250 -20 L 150 -20 L 140 -110 Z" fill={accent} />
        {/* engine bell */}
        <path d="M -120 -120 L -90 0 L 90 0 L 120 -120 Z" fill={C.greyDark} />
        {/* body, shaded side and bands */}
        <path d="M -150 -880 L -150 -150 Q -150 -120 -120 -120 L 120 -120 Q 150 -120 150 -150 L 150 -880 Z" fill={body} />
        <rect x={96} y={-880} width={54} height={730} fill={C.ink} opacity={0.08} />
        <rect x={-150} y={-560} width={300} height={40} fill={C.greyLight} />
        <rect x={-150} y={-300} width={300} height={22} fill={C.greyLight} />
        {/* nose cone */}
        <path d="M -150 -880 Q -150 -1000 0 -1220 Q 150 -1000 150 -880 Z" fill={accent} />
        {/* porthole */}
        <circle cx={0} cy={-700} r={74} fill={C.greyDark} />
        <circle cx={0} cy={-700} r={58} fill={C.sky} />
        <circle cx={-18} cy={-716} r={14} fill={C.white} opacity={0.7} />
      </g>
    </g>
  );
}
