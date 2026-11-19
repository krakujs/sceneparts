import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat ruler lying on the floor with chunky tick marks along the top edge (no numbers).
// Origin = floor centre under the ruler. Hero size: about 480 px long at s = 1.
// anim "slide": the ruler drifts gently from side to side.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "slide") return `translate(${f1(Math.sin((f * 2 * Math.PI) / 80) * 24)} 0)`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.sand;
  const tick = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const ticks = Array.from({ length: 13 }, (_, i) => i);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-240} y={-70} width={480} height={70} rx={10} fill={body} />
        <rect x={-240} y={-16} width={480} height={16} rx={6} fill={shade(body, 0.2)} />
        <rect x={-228} y={-62} width={460} height={8} rx={4} fill={C.white} opacity={0.3} />
        {ticks.map((i) => {
          const h = i % 3 === 0 ? 38 : 22;
          return <rect key={i} x={-228 + i * 38} y={-16 - h} width={8} height={h} fill={tick} />;
        })}
      </g>
    </g>
  );
}
