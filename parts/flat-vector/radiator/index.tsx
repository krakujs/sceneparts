import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall panel radiator: ten vertical columns between a top and bottom manifold, with a valve and pipe at the
// lower right. anim "heat" makes warm waves rise above it. Wall item: centred on (x, y), default y 760,
// no ground shadow. Real size (about 430 px wide).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 0.8)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(c, 0.18);
  const cols = Array.from({ length: 10 }, (_, i) => -216 + i * 44);
  const wave = (wx: number, phase: number) => {
    const dy = p.anim === "heat" ? -Math.abs(Math.sin((f * 2 * Math.PI) / 70 + phase)) * 26 : 0;
    return (
      <path
        key={wx}
        d={`M ${wx} -206 q 16 -18 0 -36 q -16 -18 0 -36`}
        fill="none"
        stroke={C.orange}
        strokeWidth={10}
        strokeLinecap="round"
        opacity={p.anim === "heat" ? 0.55 : 0}
        transform={`translate(0 ${f1(dy)})`}
      />
    );
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim === "heat" ? "none" : (p.anim ?? "none"), f)}>
        {/* heat waves above the panel */}
        {[-120, 0, 120].map((wx, i) => wave(wx, i * 1.3))}

        {/* columns with a shaded right side */}
        {cols.map((cx) => (
          <g key={cx}>
            <rect x={cx} y={-168} width={36} height={336} rx={16} fill={c} />
            <rect x={cx + 24} y={-168} width={12} height={336} rx={6} fill={dk} />
          </g>
        ))}
        {/* top and bottom manifolds */}
        <rect x={-216} y={-188} width={432} height={24} rx={12} fill={dk} />
        <rect x={-216} y={164} width={432} height={24} rx={12} fill={dk} />

        {/* valve and pipe at the lower right */}
        <rect x={160} y={188} width={22} height={60} rx={6} fill={C.greyDark} />
        <rect x={140} y={176} width={62} height={18} rx={9} fill={C.greyDark} />
        <circle cx={171} cy={160} r={14} fill={C.red} />
      </g>
    </g>
  );
}
