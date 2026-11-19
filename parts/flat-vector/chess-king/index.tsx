import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single chess king, generic silhouette: round base, tapered stem, collar ring and a crown with a cross on top.
// Origin = bottom centre. About 300 px wide and 620 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const trim = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* base */}
        <rect x={-130} y={-40} width={260} height={40} rx={16} fill={body} />
        <rect x={-130} y={-14} width={260} height={14} rx={6} fill={shade(body, 0.18)} />
        <rect x={-100} y={-70} width={200} height={34} rx={12} fill={body} />
        {/* stem */}
        <path d="M -78 -70 L -48 -330 L 48 -330 L 78 -70 Z" fill={body} />
        <path d="M 30 -70 L 48 -330 L 78 -330 L 78 -70 Z" fill={shade(body, 0.12)} />
        {/* collar */}
        <rect x={-74} y={-352} width={148} height={34} rx={12} fill={body} />
        <rect x={-74} y={-340} width={148} height={10} rx={5} fill={trim} />
        {/* crown */}
        <path d="M -90 -352 L -104 -460 L -52 -410 L -20 -470 L 0 -420 L 20 -470 L 52 -410 L 104 -460 L 90 -352 Z" fill={body} />
        <rect x={-92} y={-372} width={184} height={20} rx={8} fill={shade(body, 0.12)} />
        <circle cx={-104} cy={-460} r={11} fill={trim} />
        <circle cx={0} cy={-420} r={13} fill={trim} />
        <circle cx={104} cy={-460} r={11} fill={trim} />
        {/* cross on top */}
        <rect x={-10} y={-600} width={20} height={130} rx={8} fill={body} />
        <rect x={-50} y={-550} width={100} height={20} rx={8} fill={body} />
        <rect x={-6} y={-600} width={6} height={130} rx={3} fill={shade(body, 0.15)} />
        <rect x={-12} y={-604} width={24} height={12} rx={6} fill={trim} />
      </g>
    </g>
  );
}
