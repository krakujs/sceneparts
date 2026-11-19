import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Spice rack: small wooden rack with two shelves of three spice jars each, in six different colours. No text.
// Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const SPICES = [C.red, C.orange, C.yellow, C.green, C.purple, C.brown];
const COLS = [-110, 0, 110];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : "#B9824F";
  const dk = shade(wood, 0.2);
  // jar: top row sits on the middle shelf, bottom row on the base board
  const jar = (cx: number, bottom: number, col: string, key: number) => {
    const top = bottom - 92;
    return (
      <g key={key}>
        <rect x={cx - 39} y={top - 16} width={78} height={16} rx={6} fill={shade(col, 0.25)} />
        <rect x={cx - 39} y={top} width={78} height={92} rx={16} fill={col} />
        <rect x={cx - 30} y={top + 22} width={60} height={36} rx={6} fill="#FFFFFF" opacity={0.85} />
        <rect x={cx + 26} y={top + 8} width={7} height={70} rx={3} fill="#FFFFFF" opacity={0.3} />
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={210} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* middle shelf and base */}
        <rect x={-190} y={-150} width={380} height={22} rx={6} fill={wood} />
        <rect x={-190} y={-22} width={380} height={22} rx={6} fill={wood} />
        {/* jars */}
        {COLS.map((cx, i) => jar(cx, -150, SPICES[i], i))}
        {COLS.map((cx, i) => jar(cx, -22, SPICES[i + 3], i + 3))}
        {/* uprights and top board */}
        <rect x={-190} y={-274} width={380} height={18} rx={6} fill={wood} />
        <rect x={-190} y={-274} width={18} height={274} rx={6} fill={wood} />
        <rect x={172} y={-274} width={18} height={274} rx={6} fill={dk} />
      </g>
    </g>
  );
}
