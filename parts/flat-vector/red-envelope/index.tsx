import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Red envelope (hongbao): a flat red pouch with a gold diamond motif, a gold coin peeking from the top flap.
// Origin = bottom centre. About 440 px wide and 460 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  let tr = "";
  if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;
  else if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  const W = 220, H = 230; // half-width and height of the body above y
  const diamond = (cx: number, cy: number, r: number, c: string, id: string) => (
    <path key={id} d={`M ${cx} ${cy - r} L ${cx + r * 0.7} ${cy} L ${cx} ${cy + r} L ${cx - r * 0.7} ${cy} Z`} fill={c} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W + 20} ry={16} fill={C.shadow} />
      <g transform={tr}>
        {/* gold coin peeking out from behind the top of the envelope */}
        <g transform="translate(70 -250)">
          <circle cx={0} cy={0} r={62} fill={shade(gold, 0.18)} />
          <circle cx={0} cy={0} r={50} fill={gold} />
          <rect x={-14} y={-14} width={28} height={28} rx={4} fill={shade(gold, 0.25)} />
        </g>
        {/* envelope body */}
        <rect x={-W} y={-H} width={2 * W} height={H} rx={18} fill={red} />
        {/* top flap as a shaded triangle */}
        <path d={`M ${-W} ${-H} L 0 ${-H + 120} L ${W} ${-H} Z`} fill={shade(red, 0.12)} />
        {/* gold seal on the flap point */}
        <circle cx={0} cy={-H + 118} r={44} fill={gold} />
        <circle cx={0} cy={-H + 118} r={30} fill={shade(gold, 0.12)} />
        {/* gold diamond pattern across the lower body */}
        {diamond(-120, -92, 36, gold, "a")}
        {diamond(0, -62, 36, gold, "b")}
        {diamond(120, -92, 36, gold, "c")}
        <rect x={-W} y={-14} width={2 * W} height={14} fill={shade(red, 0.15)} />
      </g>
    </g>
  );
}
