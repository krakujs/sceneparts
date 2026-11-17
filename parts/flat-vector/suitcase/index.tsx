import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Suitcase: rolling hard-shell suitcase standing upright on two wheels, with a telescopic handle extended, a centre
// ridge and corner guards. Origin = bottom centre (under the wheels); faces the viewer. anim "roll" turns the wheels
// and rocks the case. Room scale (about 540 px tall with the handle).
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "roll") return `translate(${f1(Math.sin((f * 2 * Math.PI) / 90) * 10)} 0)`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const Wheel = ({ cx, angle }: { cx: number; angle: number }) => (
  <g transform={`translate(${cx} -36) rotate(${f1(angle)})`}>
    <circle cx={0} cy={0} r={36} fill={C.ink} />
    <circle cx={0} cy={0} r={14} fill={C.greyLight} />
    <rect x={-3} y={-30} width={6} height={60} rx={3} fill={C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.purple;
  const dk = shade(c, 0.2);
  const spin = p.anim === "roll" ? (f * 9) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* telescopic handle, extended at the back */}
        <rect x={96} y={-520} width={22} height={380} rx={8} fill={C.greyDark} />
        <rect x={76} y={-540} width={62} height={30} rx={12} fill={C.ink} />
        {/* wheels */}
        <Wheel cx={-120} angle={spin} />
        <Wheel cx={120} angle={spin} />
        {/* hard shell body */}
        <rect x={-170} y={-440} width={340} height={364} rx={36} fill={c} />
        {/* side shade and centre ridge */}
        <rect x={120} y={-440} width={50} height={364} rx={24} fill={dk} opacity={0.7} />
        <rect x={-10} y={-430} width={20} height={344} fill={dk} opacity={0.45} />
        {/* corner guards */}
        <rect x={-170} y={-440} width={60} height={34} rx={14} fill={dk} />
        <rect x={110} y={-440} width={60} height={34} rx={14} fill={dk} />
        <rect x={-170} y={-106} width={60} height={34} rx={14} fill={dk} />
        <rect x={110} y={-106} width={60} height={34} rx={14} fill={dk} />
        {/* top carry handle and latch */}
        <rect x={-54} y={-462} width={108} height={30} rx={14} fill={C.ink} />
        <rect x={-30} y={-300} width={60} height={34} rx={8} fill={C.greyLight} />
      </g>
    </g>
  );
}
