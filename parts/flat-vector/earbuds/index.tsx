import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wireless earbuds: an open charging case with one bud sitting in it and one bud standing beside it.
// Origin = bottom centre (the floor line). Hero scale: at s = 1 about 580 px wide and 330 px tall. Use s about 0.3 next to a person.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const buds = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.green;
  const anim: string = p.anim ?? "none";
  const led = anim === "pulse" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={30} cy={0} rx={290} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-150} y={-262} width={260} height={130} rx={30} fill={shade(body, 0.15)} />
        <rect x={-150} y={-150} width={260} height={150} rx={34} fill={body} />
        <rect x={-150} y={-60} width={260} height={20} rx={10} fill={shade(body, 0.2)} />
        <rect x={-130} y={-160} width={220} height={24} rx={12} fill={shade(body, 0.45)} />
        <circle cx={-20} cy={-100} r={11} fill={accent} opacity={led} />
        {/* bud standing in the open case */}
        <rect x={-74} y={-220} width={30} height={80} rx={15} fill={shade(buds, 0.12)} />
        <ellipse cx={-59} cy={-236} rx={44} ry={50} fill={buds} />
        <circle cx={-59} cy={-236} r={16} fill={C.greyLight} />
        {/* bud standing beside the case */}
        <rect x={154} y={-110} width={30} height={110} rx={15} fill={shade(buds, 0.12)} />
        <ellipse cx={169} cy={-150} rx={46} ry={52} fill={buds} />
        <circle cx={169} cy={-150} r={16} fill={C.greyLight} />
      </g>
    </g>
  );
}
