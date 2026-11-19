import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall-mounted CCTV camera on a bracket: a capsule body with a hood, a round lens and a red LED.
// It is wall mounted, not standing: x,y is the point where the bracket meets the wall, and the camera points right.
// anim "pan": the camera head slowly swivels from side to side.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 300, y = p.y ?? 900;
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const swivel = anim === "pan" ? 8 * Math.sin((f * 2 * Math.PI) / 180) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-70} y={-120} width={26} height={240} rx={6} fill={C.greyDark} />
        <rect x={-44} y={-24} width={60} height={22} rx={8} fill={C.inkSoft} />
        <g transform={`rotate(${f1(swivel)} 0 -13)`}>
          <circle cx={0} cy={-13} r={14} fill={C.inkSoft} />
          <rect x={-20} y={-68} width={230} height={104} rx={52} fill={body} />
          <rect x={10} y={-82} width={200} height={26} rx={12} fill={shade(body, 0.2)} />
          <rect x={-8} y={-56} width={150} height={8} rx={4} fill={C.white} opacity={0.3} />
          <circle cx={150} cy={-46} r={9} fill={C.red} />
          <circle cx={214} cy={-16} r={58} fill={shade(body, 0.25)} />
          <circle cx={214} cy={-16} r={36} fill={C.navy} />
          <circle cx={214} cy={-16} r={20} fill={C.skyDeep} />
          <circle cx={206} cy={-24} r={6} fill={C.white} opacity={0.7} />
        </g>
      </g>
    </g>
  );
}
