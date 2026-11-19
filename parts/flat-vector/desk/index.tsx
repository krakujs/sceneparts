import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Desk, front view: a plain top about 420 px above the floor (about 75 cm at this scale) and 800 px wide, on
// a solid drawer pedestal (three drawers with knobs) on one side and a matching solid panel leg on the other.
// flip moves the pedestal to the left. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const dk = shade(c, 0.2);
  const TOP = -420, SLAB = 40; // top surface and slab thickness
  const PED_X = 120, PED_W = 260, LEG_X = -400, LEG_W = 200;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={420} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* solid panel leg on the left, same colour as the pedestal */}
        <rect x={LEG_X} y={TOP + SLAB} width={LEG_W} height={-(TOP + SLAB)} rx={12} fill={c} />
        <rect x={LEG_X} y={-44} width={LEG_W} height={44} rx={10} fill={dk} />
        {/* drawer pedestal on the right */}
        <rect x={PED_X} y={TOP + SLAB} width={PED_W} height={-(TOP + SLAB)} rx={14} fill={c} />
        {[0, 1, 2].map((r) => {
          const ry = TOP + SLAB + 20 + r * 120;
          return (
            <g key={r}>
              <rect x={PED_X + 18} y={ry} width={PED_W - 36} height={100} rx={12} fill={shade(c, 0.07)} />
              <rect x={PED_X + PED_W / 2 - 28} y={ry + 40} width={56} height={14} rx={7} fill={C.greyLight} />
            </g>
          );
        })}
        <rect x={PED_X} y={-44} width={PED_W} height={44} rx={10} fill={dk} />
        {/* plain desk top */}
        <rect x={-400} y={TOP} width={800} height={SLAB} rx={16} fill={c} />
        <rect x={-380} y={TOP + 6} width={760} height={10} rx={5} fill="#FFFFFF" opacity={0.16} />
        <rect x={-400} y={TOP + SLAB - 10} width={800} height={10} rx={5} fill={dk} />
      </g>
    </g>
  );
}
