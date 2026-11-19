import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Building blocks: a stack of wooden toy blocks with dots and shapes only (no letters): a red cube with dots,
// a blue cube set back on top, a yellow cylinder and a green triangle prism beside them.
// Origin = bottom centre; faces the viewer, honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** A square block face with a shaded right side and a top face. */
const Cube = ({ x, y, size, c }: { x: number; y: number; size: number; c: string }) => {
  const d = size * 0.18;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={18} fill={c} />
      <rect x={x + size} y={y} width={d} height={size} rx={8} fill={shade(c, 0.22)} />
      <rect x={x} y={y} width={size} height={d * 0.7} rx={8} fill={shade(c, -0.12)} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.red;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const dots = (cx: number, cy: number, c: string) => (
    <g fill={c}>
      <circle cx={cx - 40} cy={cy - 40} r={18} />
      <circle cx={cx + 40} cy={cy - 40} r={18} />
      <circle cx={cx} cy={cy} r={18} />
      <circle cx={cx - 40} cy={cy + 40} r={18} />
      <circle cx={cx + 40} cy={cy + 40} r={18} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={18} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* bottom cube */}
        <Cube x={-230} y={-220} size={220} c={c1} />
        {dots(-120, -110, C.white)}
        {/* top cube, set back to the right */}
        <Cube x={-60} y={-400} size={190} c={c2} />
        {dots(35, -305, C.yellow)}
        {/* cylinder block on the right */}
        <rect x={60} y={-150} width={150} height={150} fill={C.yellow} />
        <ellipse cx={135} cy={-150} rx={75} ry={22} fill={shade(C.yellow, -0.1)} />
        <ellipse cx={135} cy={0} rx={75} ry={22} fill={shade(C.yellow, 0.2)} />
        {/* green triangle prism on the left */}
        <polygon points="-250,-40 -130,-40 -190,-140" fill={C.green} />
        <rect x={-250} y={-40} width={120} height={40} rx={8} fill={shade(C.green, 0.2)} />
      </g>
    </g>
  );
}
