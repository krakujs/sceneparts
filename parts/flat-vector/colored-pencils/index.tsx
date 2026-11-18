import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fanned set of coloured pencils standing from one base point, each in a different colour with a sharpened tip.
// Origin = bottom centre of the fan, where the pencils meet. Hero size: about 520 px wide, 430 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const COLOURS = [C.red, C.orange, C.yellow, C.lime, C.green, C.teal, C.blue, C.purple, C.pink];

// One pencil from the base point, rotated by angle deg (0 = straight up), length L.
const Pencil = ({ angle, c, len }: { angle: number; c: string; len: number }) => (
  <g transform={`rotate(${f1(angle)} 0 0)`}>
    <rect x={-14} y={-len} width={28} height={len - 60} rx={6} fill={c} />
    <rect x={-14} y={-len} width={6} height={len - 60} fill="#FFFFFF" opacity={0.25} />
    <rect x={-14} y={-len + 20} width={28} height={8} fill={shade(c, 0.25)} opacity={0.6} />
    <path d={`M -14 ${f1(-60)} L 14 ${f1(-60)} L 0 ${f1(-60 - 40)} Z`} fill={C.sand} />
    <path d={`M -5 ${f1(-82)} L 5 ${f1(-82)} L 0 ${f1(-100)} Z`} fill={C.inkSoft} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const sway = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 50) * 3 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  const n = COLOURS.length;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) rotate(${f1(sway)}) scale(${f1(pop)})`}>
        {COLOURS.map((c, i) => {
          const angle = -62 + (124 * i) / (n - 1);
          const len = 430 - Math.abs(angle) * 1.2;
          return <Pencil key={i} angle={angle} c={c} len={len} />;
        })}
        <circle cx={0} cy={0} r={22} fill={C.greyDark} />
      </g>
    </g>
  );
}
