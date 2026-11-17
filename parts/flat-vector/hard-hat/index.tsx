import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Yellow safety helmet standing upright on the floor on its brim, with a central ridge and a highlight.
// Origin = floor centre under the brim. Hero size: about 460 px wide and 340 px tall at s = 1.
// anim "hop": the helmet hops up and comes back down.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "hop") return `translate(0 ${f1(-Math.abs(Math.sin((f * 2 * Math.PI) / 36)) * 60)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.yellow;
  const ridge = p.color2 && p.color2 !== "none" ? p.color2 : C.yellowDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M-180,-130 A180,200 0 0 1 180,-130 Z" fill={body} />
        <path d="M-180,-130 A180,200 0 0 1 -150,-210 L-150,-130 Z" fill={C.white} opacity={0.1} />
        <rect x={-28} y={-330} width={56} height={200} rx={24} fill={ridge} />
        <ellipse cx={-96} cy={-246} rx={24} ry={44} fill={C.white} opacity={0.35} />
        <rect x={-230} y={-130} width={460} height={34} rx={17} fill={shade(body, 0.2)} />
        <rect x={-210} y={-124} width={420} height={8} rx={4} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
