import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Umbrella stand: a cylinder hall stand holding two closed, folded umbrellas. Each umbrella has a tapered fabric canopy
// (wide at the top, narrowing to a tip hidden in the stand), a strap, and a handle at the top: a J-hook on one, a straight knob on the other.
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Room scale.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** Closed umbrella: teardrop canopy (top y = -520, tip at y = -290, hidden in the stand), strap, shaft and handle. */
const Umbrella = ({ cx, tilt, c, hook }: { cx: number; tilt: number; c: string; hook: boolean }) => {
  const dk = shade(c, 0.22);
  const shaft = C.greyDark;
  return (
    <g transform={`rotate(${tilt} ${cx} -300)`}>
      {/* shaft above the canopy */}
      <rect x={cx - 5} y={-610} width={10} height={100} rx={5} fill={shaft} />
      {hook ? (
        // J-hook handle
        <path d={`M ${cx} -612 Q ${cx} -652 ${cx + 26} -652 Q ${cx + 46} -652 ${cx + 46} -630`} fill="none" stroke={shaft} strokeWidth={12} strokeLinecap="round" />
      ) : (
        // straight knob handle
        <rect x={cx - 20} y={-626} width={40} height={20} rx={10} fill={shaft} />
      )}
      {/* tapered canopy: wide at the top, tip inside the stand */}
      <path d={`M ${cx - 38} -520 Q ${cx - 26} -400 ${cx} -290 Q ${cx + 26} -400 ${cx + 38} -520 Z`} fill={c} />
      {/* shaded half for depth */}
      <path d={`M ${cx} -520 L ${cx + 38} -520 Q ${cx + 26} -400 ${cx} -290 Z`} fill={dk} opacity={0.7} />
      {/* strap with snap */}
      <rect x={cx - 9} y={-520} width={18} height={80} rx={6} fill={dk} />
      <circle cx={cx} cy={-500} r={5} fill={C.yellow} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const dk = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <Umbrella cx={-40} tilt={-4} c={c2} hook />
        <Umbrella cx={40} tilt={4} c={C.blue} hook={false} />
        {/* cylinder stand, drawn over the umbrella tips */}
        <rect x={-90} y={-330} width={180} height={330} fill={c} />
        <rect x={40} y={-330} width={50} height={330} fill={dk} opacity={0.7} />
        <rect x={-90} y={-230} width={180} height={18} fill={dk} />
        <rect x={-90} y={-120} width={180} height={18} fill={dk} />
        <ellipse cx={0} cy={-2} rx={100} ry={18} fill={dk} />
        {/* open top rim */}
        <ellipse cx={0} cy={-330} rx={90} ry={20} fill={shade(c, 0.4)} />
      </g>
    </g>
  );
}
