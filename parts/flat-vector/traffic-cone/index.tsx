import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Orange traffic cone standing on a wide square base, with two white reflective bands. Hero size at s = 1: about 360 px wide, 420 px tall.
// Origin = floor centre under the base. anim "flash": the reflective bands brighten and dim.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
// Half-width of the cone body at height y (y is negative, base at -40, tip near -400).
const hw = (y: number) => 120 - 102 * ((-40 - y) / 360);
const band = (y1: number, y2: number) =>
  `${f1(-hw(y1))},${f1(y1)} ${f1(hw(y1))},${f1(y1)} ${f1(hw(y2))},${f1(y2)} ${f1(-hw(y2))},${f1(y2)}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const stripe = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const lit = anim === "flash" ? 0.55 + 0.45 * Math.sin((f * 2 * Math.PI) / 50) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-172} y={-52} width={344} height={52} rx={10} fill={shade(body, 0.2)} />
        <path d="M-120,-40 L-18,-398 Q0,-420 18,-398 L120,-40 Z" fill={body} />
        <path d="M-120,-40 L-80,-40 L-12,-390 Q0,-412 -4,-416 Q-14,-418 -18,-398 Z" fill={C.white} opacity={0.18} />
        <polygon points={band(-130, -190)} fill={stripe} opacity={lit} />
        <polygon points={band(-270, -330)} fill={stripe} opacity={lit} />
        <rect x={-150} y={-40} width={300} height={10} rx={5} fill={shade(body, 0.35)} opacity={0.5} />
      </g>
    </g>
  );
}
