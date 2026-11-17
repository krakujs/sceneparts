import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Space shuttle on its launch stack, front view, standing on y: the tall orange external tank in the middle, two slim
// white solid boosters with pointed tops either side, the white orbiter clinging to the front of the tank with a black
// nose, black wing edges, a delta wing spreading out and a tall tail fin. Three engine bells at the bottom.
// Origin = bottom centre (the engines on the ground line). About 640 px wide and 1190 px tall at s = 1.
// anim "fly": flames pour from the engines and the stack lifts off, rising with f (flames flicker and smoke spreads).
// "bob": a gentle hover. "pop": scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const tank = p.color && p.color !== "none" ? p.color : C.orange;
  const white = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const fly = anim === "fly";
  const rise = fly ? -Math.min(f * 4, 1200) : anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8 : 0;
  const flame = (cx: number, len: number, k: number) => {
    const L = len + (fly ? Math.sin(f * 0.9 + k) * 14 : 0);
    return (
      <g key={`${cx}-${k}`}>
        <path d={`M ${f1(cx - 22)} -36 Q ${f1(cx - 18)} ${f1(L * 0.6)} ${f1(cx)} ${f1(L)} Q ${f1(cx + 18)} ${f1(L * 0.6)} ${f1(cx + 22)} -36 Z`} fill={C.orange} />
        <path d={`M ${f1(cx - 11)} -36 Q ${f1(cx - 8)} ${f1(L * 0.5)} ${f1(cx)} ${f1(L * 0.7)} Q ${f1(cx + 8)} ${f1(L * 0.5)} ${f1(cx + 11)} -36 Z`} fill={C.yellow} />
      </g>
    );
  };
  const booster = (cx: number) => (
    <g key={cx}>
      <path d={`M ${cx - 28} -40 L ${cx - 28} -1020 Q ${cx - 22} -1100 ${cx} -1180 Q ${cx + 22} -1100 ${cx + 28} -1020 L ${cx + 28} -40 Z`} fill={white} />
      <rect x={cx + 12} y={-1000} width={16} height={940} fill={shade(white, 0.22)} />
      <rect x={cx - 28} y={-980} width={56} height={10} fill={C.greyLight} />
      <rect x={cx - 22} y={-40} width={44} height={22} rx={6} fill={C.greyDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* launch pad and ground smoke stay on the ground */}
      <rect x={-300} y={-30} width={600} height={30} rx={8} fill={C.greyDark} />
      {fly && (
        <g>
          <circle cx={-230} cy={30} r={60} fill={C.white} opacity={0.6} />
          <circle cx={230} cy={30} r={60} fill={C.white} opacity={0.6} />
          <circle cx={-320} cy={10} r={40} fill={C.white} opacity={0.45} />
          <circle cx={320} cy={10} r={40} fill={C.white} opacity={0.45} />
        </g>
      )}
      <g transform={`translate(0 ${f1(rise)}) scale(${f1(popScale(anim, f))})`}>
        {/* flames from the engines */}
        {(fly || anim === "bob") && [-140, 140].map((bx, k) => flame(bx, 230, k))}
        {(fly || anim === "bob") && [-44, 0, 44].map((bx, k) => flame(bx, 170, k + 2))}
        {/* boosters */}
        {booster(-140)}
        {booster(140)}
        {/* external tank */}
        <path d="M -80 -40 L -80 -1020 Q -80 -1130 0 -1130 Q 80 -1130 80 -1020 L 80 -40 Z" fill={tank} />
        <rect x={50} y={-1000} width={30} height={940} fill={shade(tank, 0.12)} />
        <rect x={-80} y={-600} width={160} height={6} fill={shade(tank, 0.1)} />
        {/* engine bells at the bottom */}
        {[-44, 0, 44].map((ex) => (
          <rect key={ex} x={ex - 14} y={-40} width={28} height={26} rx={6} fill={C.greyDark} />
        ))}
        {/* tail fin clinging to the tank, behind the orbiter's nose */}
        <path d="M 26 -330 L 66 -330 L 66 -880 L 26 -720 Z" fill={white} />
        <path d="M 26 -760 L 66 -880 L 66 -892 L 26 -772 Z" fill={C.ink} />
        {/* orbiter: delta wings, fuselage and black nose */}
        <path d="M -44 -700 L -300 -330 L -300 -310 L -44 -500 Z" fill={white} />
        <path d="M 44 -700 L 300 -330 L 300 -310 L 44 -500 Z" fill={white} />
        <path d="M -44 -700 L -300 -330 L -284 -322 L -44 -690 Z" fill={C.ink} />
        <path d="M 44 -700 L 300 -330 L 284 -322 L 44 -690 Z" fill={C.ink} />
        <path d="M -44 -330 L -44 -1040 Q -44 -1120 0 -1180 Q 44 -1120 44 -1040 L 44 -330 Z" fill={white} />
        <path d="M -44 -1040 Q -44 -1120 0 -1180 Q 44 -1120 44 -1040 Z" fill={C.ink} />
        <rect x={-44} y={-340} width={88} height={10} fill={C.greyLight} />
      </g>
    </g>
  );
}
