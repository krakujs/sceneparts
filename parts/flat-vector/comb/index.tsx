import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Plastic comb lying slightly angled on the floor, teeth down. Origin = bottom centre; hero size.
// anim "swipe" slides the comb a little from side to side.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "swipe") return `translate(${f1(Math.sin((f * 2 * Math.PI) / 50) * 18)} 0)`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.pink;
  const teeth: number[] = Array.from({ length: 24 }, (_, i) => i);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={10} fill={C.shadow} />
      <g transform={`rotate(-8) ${motion(p.anim ?? "none", f)}`}>
        {/* teeth: longest in the middle, drawn before the spine so they meet it */}
        {teeth.map((i) => {
          const h = 96 - Math.abs(i - 11.5) * 2;
          return <rect key={i} x={-204 + i * 17.5} y={-96} width={9} height={h} rx={4} fill={i % 2 ? c : shade(c, 0.12)} />;
        })}
        {/* spine with a darker lower edge and a highlight */}
        <rect x={-214} y={-150} width={428} height={60} rx={26} fill={c} />
        <rect x={-200} y={-104} width={400} height={14} rx={7} fill={shade(c, 0.2)} />
        <rect x={-200} y={-144} width={400} height={10} rx={5} fill={C.white} opacity={0.25} />
      </g>
    </g>
  );
}
