import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector butter: a butter block with a curl on a small dish, next to a butter knife.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 420 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Butter(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const butterC = p.butterColor ?? "#FFE27A";
  const knife = p.knife ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // block sits on the dish surface (dish width 420: surface centre y -67)
  const baseY = -67;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <Dish x={0} y={0} vessel="plate" w={420} fill="none" rimColor="#E9EEF3" vesselColor="#FFFFFF" />
      <g transform={tr}>
        {knife && (
          <g transform={`translate(110 ${baseY + 6}) rotate(-6)`}>
            <path d="M 0 0 L 110 -10 L 110 2 L 0 10 Z" fill="#C5CCD8" />
            <path d="M 0 2 L 108 -8 L 106 -3 L 0 6 Z" fill="#FFFFFF" opacity={0.6} />
            <rect x={-2} y={-3} width={6} height={14} rx={2} fill="#8C949F" />
          </g>
        )}
        <g transform={`translate(-72 ${baseY}) scale(1.45)`}>
          {/* block: right side, front, top */}
          <path d="M 0 0 L 110 0 L 110 -90 L 0 -90 Z" fill={butterC} />
          <path d="M 110 0 L 150 -22 L 150 -106 L 110 -90 Z" fill={shade(butterC, 0.2)} />
          <path d="M 0 -90 L 110 -90 L 150 -106 L 40 -106 Z" fill={shade(butterC, 0.07)} />
          <path d="M 0 0 L 110 0 L 110 -8 L 0 -8 Z" fill={shade(butterC, 0.25)} opacity={0.4} />
          <rect x={12} y={-74} width={20} height={6} rx={3} fill="#FFFFFF" opacity={0.5} />
          {/* butter curl on top */}
          <path d="M 70 -106 Q 92 -132 116 -116 Q 130 -102 116 -94 Q 98 -88 84 -98 Q 74 -102 76 -112 Z" fill={butterC} />
          <path d="M 70 -106 Q 92 -132 116 -116" stroke="#FFFFFF" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />
          <path d="M 116 -94 Q 130 -102 116 -116" stroke={shade(butterC, 0.2)} strokeWidth={3} fill="none" opacity={0.7} />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Butter {...p} />;
}
