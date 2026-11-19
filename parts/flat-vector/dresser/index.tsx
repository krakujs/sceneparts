import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dresser: wide chest of drawers, three rows of two drawers each with round knobs, short feet. Origin = bottom centre.
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
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const W = 260, top = -700; // half width, top of the carcass
  const rows = [0, 1, 2];
  const rowH = 200;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W + 30} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* feet */}
        <rect x={-W + 20} y={-50} width={40} height={50} rx={10} fill={dk} />
        <rect x={W - 60} y={-50} width={40} height={50} rx={10} fill={dk} />
        {/* carcass */}
        <rect x={-W} y={top} width={2 * W} height={650} rx={18} fill={c} />
        {/* top slab, slightly lighter */}
        <rect x={-W - 20} y={top - 30} width={2 * W + 40} height={40} rx={14} fill={shade(c, -0.08)} />
        {/* drawers */}
        {rows.map((r) => {
          const ry = top + 40 + r * (rowH + 10);
          return (
            <g key={r}>
              {[-1, 1].map((side) => {
                const dx = side < 0 ? -W + 22 : 14;
                return (
                  <g key={side}>
                    <rect x={dx} y={ry} width={W - 36} height={rowH} rx={12} fill={shade(c, 0.07)} />
                    <rect x={dx + 10} y={ry + rowH - 14} width={W - 56} height={6} rx={3} fill={dk} opacity={0.5} />
                    <circle cx={dx + (W - 36) / 2} cy={ry + rowH / 2} r={13} fill={C.greyLight} />
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    </g>
  );
}
