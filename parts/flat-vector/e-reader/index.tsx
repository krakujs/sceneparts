import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Slim e-reader standing upright: paper-white body, grey text lines on a paper screen, page button at the bottom.
// Origin = bottom centre (bottom edge on y). About 280 px wide and 450 px tall at s = 1.
// anim "page": a page edge sweeps across the screen.
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
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const anim: string = p.anim ?? "none";
  const sweep = anim === "page" ? 92 - ((f * 5) % 180) : 0;
  const lines = Array.from({ length: 12 }, (_, i) => i);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-138} y={-452} width={276} height={452} rx={34} fill={shade(body, 0.15)} />
        <rect x={-130} y={-444} width={260} height={444} rx={30} fill={body} />
        <rect x={-108} y={-410} width={216} height={340} rx={8} fill={shade(body, 0.12)} />
        <rect x={-106} y={-408} width={212} height={336} rx={6} fill={C.paper} />
        <rect x={-88} y={-388} width={120} height={16} rx={8} fill={C.ink} />
        {lines.map((i) => (
          <rect key={i} x={-88} y={-352 + i * 24} width={i % 4 === 3 ? 110 : 176} height={9} rx={4.5} fill={C.grey} />
        ))}
        <rect x={-88} y={-96} width={176} height={6} rx={3} fill={C.greyLight} />
        <rect x={-88} y={-96} width={70} height={6} rx={3} fill={C.blue} />
        {anim === "page" && <rect x={sweep - 14} y={-406} width={14} height={332} fill={C.white} opacity={0.7} />}
        <circle cx={0} cy={-30} r={8} fill={shade(body, 0.2)} />
      </g>
    </g>
  );
}
