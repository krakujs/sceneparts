import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Handheld hair dryer, side view: a round housing with vents, a narrower nozzle pointing left, a grip below and a
// cord. anim "blow" sends airflow lines out of the nozzle. Origin = bottom centre (the grip rests on y), hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.purple;
  const dk = shade(c, 0.2);
  const blow = p.anim === "blow";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={10} fill={C.shadow} />
      <g transform={motion(p.anim === "blow" ? "none" : (p.anim ?? "none"), f)}>
        {/* airflow lines out of the nozzle */}
        {blow && [-222, -196, -170].map((ay, i) => (
          <path
            key={ay}
            d={`M ${-300 + i * 14} ${ay} H ${-236 + i * 10}`}
            stroke={C.skyDeep}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray="30 22"
            strokeDashoffset={f1(-f * 5)}
            fill="none"
          />
        ))}
        {/* cord leaving the grip */}
        <path d="M 58 -6 Q 110 14 150 -6" fill="none" stroke={C.inkSoft} strokeWidth={8} strokeLinecap="round" />
        {/* grip */}
        <rect x={16} y={-140} width={70} height={140} rx={34} fill={c} />
        <rect x={60} y={-140} width={26} height={140} rx={13} fill={dk} />
        <rect x={42} y={-96} width={28} height={14} rx={7} fill={C.white} opacity={0.8} />
        {/* housing */}
        <rect x={-86} y={-232} width={190} height={112} rx={52} fill={c} />
        <rect x={-86} y={-150} width={190} height={30} rx={15} fill={dk} />
        {[20, 50, 80].map((vx) => (
          <rect key={vx} x={vx} y={-214} width={14} height={38} rx={7} fill={dk} />
        ))}
        {/* nozzle */}
        <rect x={-206} y={-204} width={150} height={52} rx={22} fill={dk} />
        <rect x={-214} y={-206} width={24} height={56} rx={10} fill={C.greyDark} />
      </g>
    </g>
  );
}
