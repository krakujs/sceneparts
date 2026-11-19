import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Parking meter: a pole with a rounded meter head, a small screen with two bars, a coin slot and a button.
// Origin = pole base. Room scale: about 930 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const head = p.color && p.color !== "none" ? p.color : C.teal;
  const base = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-80} y={-36} width={160} height={36} rx={18} fill={base} />
        <rect x={-14} y={-700} width={28} height={670} fill={base} />
        {/* meter head with a rounded top */}
        <rect x={-70} y={-930} width={140} height={60} rx={30} fill={shade(head, 0.15)} />
        <rect x={-90} y={-880} width={180} height={180} rx={40} fill={head} />
        <rect x={-56} y={-842} width={112} height={72} rx={10} fill={C.ink} />
        <rect x={-40} y={-826} width={80} height={10} rx={4} fill={C.lime} />
        <rect x={-40} y={-806} width={50} height={8} rx={4} fill={C.greyLight} />
        <rect x={-28} y={-744} width={56} height={12} rx={4} fill={C.ink} />
        <circle cx={0} cy={-712} r={14} fill={C.yellow} />
      </g>
    </g>
  );
}
