import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// First aid kit: a box with a carry handle and a white cross on a green panel (a generic cross, not a red emblem).
// Origin = bottom centre; hero size. anim "pulse" gently scales the cross.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const panel = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const k = p.anim === "pulse" ? 1 + 0.05 * Math.sin((f * 2 * Math.PI) / 40) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* carry handle behind the box */}
        <path d="M -70 -240 V -300 Q -70 -330 -40 -330 H 40 Q 70 -330 70 -300 V -240" stroke={C.greyDark} strokeWidth={22} strokeLinecap="round" fill="none" />
        {/* box with a darker right side and a bottom band */}
        <rect x={-180} y={-250} width={360} height={240} rx={26} fill={c} />
        <path d="M 130 -250 H 154 A 26 26 0 0 1 180 -224 V -36 A 26 26 0 0 1 154 -10 H 130 Z" fill={shade(c, 0.15)} />
        <rect x={-180} y={-30} width={360} height={20} rx={10} fill={shade(c, 0.12)} />
        {/* green panel with a white cross */}
        <rect x={-120} y={-224} width={240} height={150} rx={26} fill={panel} />
        <g transform={`translate(0 -150) scale(${f1(k)}) translate(0 150)`}>
          <rect x={-26} y={-210} width={52} height={120} rx={10} fill={C.white} />
          <rect x={-70} y={-176} width={140} height={52} rx={10} fill={C.white} />
        </g>
        {/* latch */}
        <rect x={-18} y={-118} width={36} height={18} rx={6} fill={C.greyDark} />
      </g>
    </g>
  );
}
