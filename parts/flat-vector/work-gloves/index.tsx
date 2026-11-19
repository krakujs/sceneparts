import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pair of leather work gloves standing upright side by side, with thumbs out and cuffs at the bottom.
// Origin = floor centre between the gloves. Hero size: about 460 px wide and 410 px tall at s = 1.
// anim "clap": the gloves move towards each other and apart again.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

// One glove, origin = bottom centre of its cuff.
const glove = (leather: string, trim: string, key: string) => (
  <g key={key}>
    <rect x={-84} y={-260} width={168} height={170} rx={36} fill={leather} />
    {[[-80, -388], [-38, -412], [4, -398], [46, -352]].map(([fx, top], i) => (
      <rect key={i} x={fx} y={top} width={36} height={-236 - top} rx={18} fill={leather} />
    ))}
    <g transform="translate(-84 -180) rotate(-30)">
      <rect x={-23} y={-70} width={46} height={130} rx={23} fill={leather} />
    </g>
    <rect x={-60} y={-240} width={10} height={120} rx={5} fill={C.white} opacity={0.18} />
    <rect x={-82} y={-110} width={164} height={110} rx={14} fill={leather} />
    <rect x={-82} y={-110} width={164} height={22} rx={10} fill={trim} />
    <rect x={-82} y={-40} width={164} height={6} rx={3} fill={shade(leather, 0.3)} opacity={0.6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const leather = p.color && p.color !== "none" ? p.color : "#C98E55";
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const c = anim === "clap" ? 25 + 25 * Math.sin((f * 2 * Math.PI) / 50) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(${f1(-120 + c)} 0)`}>{glove(leather, trim, "l")}</g>
        <g transform={`translate(${f1(120 - c)} 0) scale(-1 1)`}>{glove(leather, trim, "r")}</g>
      </g>
    </g>
  );
}
