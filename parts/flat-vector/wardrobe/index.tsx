import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wardrobe: tall cabinet with two doors on a plinth and a top cornice. variant open swings both doors back
// (narrow dark strips) and shows a rail with hanging clothes. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const dk = shade(c, 0.2);
  const open = p.variant === "open";
  const W = 180; // half width of the body
  const H = 1000;
  const inner = "#3A3346";
  const clothes = [
    { x: -110, c: C.blue }, { x: -70, c: C.red }, { x: -30, c: C.teal }, { x: 20, c: C.yellow }, { x: 60, c: C.pink }, { x: 100, c: C.purple },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* plinth */}
        <rect x={-W} y={-40} width={2 * W} height={40} rx={8} fill={dk} />
        {/* cabinet body */}
        <rect x={-W} y={-H} width={2 * W} height={H - 40} rx={14} fill={c} />
        {/* cornice */}
        <rect x={-W - 14} y={-H - 36} width={2 * W + 28} height={44} rx={12} fill={dk} />
        {open ? (
          <g>
            {/* interior */}
            <rect x={-W + 14} y={-H + 20} width={2 * W - 28} height={H - 80} rx={6} fill={inner} />
            {/* rail */}
            <rect x={-W + 20} y={-H + 200} width={2 * W - 40} height={14} rx={7} fill={C.greyLight} />
            {clothes.map((g, i) => (
              <g key={i}>
                <path d={`M ${g.x - 26} ${-H + 214} L ${g.x + 26} ${-H + 214} L ${g.x + 36} ${-H + 420} L ${g.x - 36} ${-H + 420} Z`} fill={g.c} />
                <rect x={g.x - 8} y={-H + 194} width={16} height={22} rx={6} fill={C.greyDark} />
              </g>
            ))}
            {/* shelf */}
            <rect x={-W + 14} y={-H + 620} width={2 * W - 28} height={16} rx={6} fill={dk} />
            {/* left door swung back (thin dark panel) */}
            <rect x={-W - 34} y={-H + 10} width={34} height={H - 60} rx={8} fill={dk} />
            <rect x={W} y={-H + 10} width={34} height={H - 60} rx={8} fill={dk} />
          </g>
        ) : (
          <g>
            {/* two doors */}
            <rect x={-W + 14} y={-H + 20} width={W - 22} height={H - 80} rx={12} fill={shade(c, 0.06)} />
            <rect x={8} y={-H + 20} width={W - 22} height={H - 80} rx={12} fill={shade(c, 0.06)} />
            {/* panel insets */}
            <rect x={-W + 44} y={-H + 80} width={W - 82} height={H - 200} rx={8} fill={shade(c, 0.12)} />
            <rect x={38} y={-H + 80} width={W - 82} height={H - 200} rx={8} fill={shade(c, 0.12)} />
            {/* knobs */}
            <circle cx={-18} cy={-H / 2 + 20} r={12} fill={C.greyLight} />
            <circle cx={18} cy={-H / 2 + 20} r={12} fill={C.greyLight} />
          </g>
        )}
      </g>
    </g>
  );
}
