import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Jetpack, front view: twin fuel tanks on a harness with shoulder straps, a hip belt and two flame nozzles.
// Origin = bottom of the nozzles; about 380 px wide and 480 px tall at s = 1 (the flames add about 160 px).
// anim "fly": a gentle bob with the flames flickering.
const f1 = (v: number) => v.toFixed(1);
const bob = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8;
  if (anim === "bob") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6;
  return 0;
};
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1500;
  const x = p.x ?? 540;
  const tank = p.color && p.color !== "none" ? p.color : C.orange;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const fly = anim === "fly";
  const flame = (cx: number, k: number) => {
    const L = fly ? 150 * (1 + 0.2 * Math.sin(f * 0.8 + k * 1.7) + 0.08 * Math.sin(f * 2.1 + k)) : 0;
    if (!fly) return null;
    return (
      <g key={k}>
        <path d={`M ${cx - 28} 0 Q ${cx - 18} ${f1(L * 0.55)} ${cx} ${f1(L)} Q ${cx + 18} ${f1(L * 0.55)} ${cx + 28} 0 Z`} fill={C.orange} />
        <path d={`M ${cx - 13} 0 Q ${cx - 8} ${f1(L * 0.4)} ${cx} ${f1(L * 0.6)} Q ${cx + 8} ${f1(L * 0.4)} ${cx + 13} 0 Z`} fill={C.yellow} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {flame(-80, 0)}
        {flame(80, 1)}
        {/* shoulder straps behind the tanks */}
        <path d="M -92 -478 Q -170 -380 -170 -250 L -134 -250 Q -134 -360 -66 -478 Z" fill={trim} />
        <path d="M 92 -478 Q 170 -380 170 -250 L 134 -250 Q 134 -360 66 -478 Z" fill={trim} />
        {/* twin tanks with shaded right edges */}
        <rect x={-132} y={-480} width={104} height={440} rx={52} fill={tank} />
        <rect x={28} y={-480} width={104} height={440} rx={52} fill={tank} />
        <rect x={-54} y={-460} width={22} height={400} rx={11} fill={shade(tank, 0.2)} />
        <rect x={98} y={-460} width={22} height={400} rx={11} fill={shade(tank, 0.2)} />
        {/* connector and control unit */}
        <rect x={-150} y={-360} width={300} height={30} rx={15} fill={trim} />
        <rect x={-40} y={-300} width={80} height={56} rx={10} fill={C.greyDark} />
        <circle cx={0} cy={-272} r={8} fill={C.green} />
        {/* hip belt */}
        <rect x={-190} y={-230} width={380} height={26} rx={13} fill={C.ink} />
        <rect x={-14} y={-232} width={28} height={30} rx={6} fill={C.greyLight} />
        {/* flame nozzles */}
        <path d="M -128 -40 L -32 -40 L -44 0 L -116 0 Z" fill={trim} />
        <path d="M 32 -40 L 128 -40 L 116 0 L 44 0 Z" fill={trim} />
      </g>
    </g>
  );
}
