import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long-handled metal detector standing upright: search coil on the floor, shaft, control box with a meter,
// armrest cuff and grip. Origin = bottom centre (coil rests on y). About 300 px wide and 790 px tall at s = 1.
// anim "sweep": the meter bars move and a beep ring expands from the coil.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const BARS = [20, 30, 40, 28, 14];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const anim: string = p.anim ?? "none";
  const sweep = anim === "sweep";
  const ringT = (f * 3) % 120;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-14} y={-770} width={28} height={730} rx={12} fill={C.greyDark} />
        {sweep && <ellipse cx={0} cy={-40} rx={150 + ringT} ry={40 + ringT * 0.27} fill="none" stroke={C.yellow} strokeWidth={6} opacity={1 - ringT / 120} />}
        <ellipse cx={0} cy={-40} rx={150} ry={40} fill={body} />
        <ellipse cx={0} cy={-40} rx={112} ry={26} fill={shade(body, 0.25)} />
        <path d="M -120 -56 A 124 40 0 0 1 -30 -78" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.3} />
        {/* armrest cuff */}
        <ellipse cx={0} cy={-600} rx={74} ry={30} fill="none" stroke={C.inkSoft} strokeWidth={16} />
        {/* grip */}
        <rect x={-26} y={-500} width={52} height={130} rx={26} fill={C.inkSoft} />
        {/* control box */}
        <rect x={-72} y={-790} width={144} height={110} rx={18} fill={shade(body, 0.2)} />
        <rect x={-56} y={-772} width={112} height={50} rx={8} fill={C.ink} />
        {BARS.map((h, i) => (
          <rect key={i} x={-46 + i * 20} y={-730 - (sweep ? h * (0.6 + 0.4 * Math.sin(f * 0.25 + i)) : h)} width={12} height={sweep ? h * (0.6 + 0.4 * Math.sin(f * 0.25 + i)) : h} rx={3} fill={C.green} />
        ))}
        <circle cx={-36} cy={-700} r={14} fill={C.yellow} />
        <circle cx={36} cy={-700} r={14} fill={C.greenDark} />
        <rect x={-40} y={-684} width={80} height={6} rx={3} fill={C.ink} />
      </g>
    </g>
  );
}
