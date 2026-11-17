import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mop: long handle with a blue clamp holding a bar and a head of stringy strands. Origin = floor under the strands.
// anim "swish" rocks the mop from the floor point, as if mopping.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "swish") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 56) * 5)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};
// Strand ends: [start x, end x, end y]. Drawn as curved strokes inside the head.
const STRANDS: [number, number, number][] = [
  [-120, -124, -16], [-96, -100, -38], [-70, -84, -22], [-44, -52, -42], [-18, -10, -14],
  [10, 12, -34], [38, 50, -20], [64, 78, -40], [92, 98, -18], [118, 124, -30],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.yellow;
  const body = (
    <g>
      {/* metal handle with a grip knob */}
      <rect x={-13} y={-880} width={26} height={630} rx={13} fill={C.greyDark} />
      <circle cx={0} cy={-884} r={20} fill={C.greyDark} />
      {/* head: a soft mass of strands with a darker stroke for each string */}
      <path d="M -150 -160 Q -176 -70 -128 -26 Q -64 4 0 -4 Q 64 4 128 -26 Q 176 -70 150 -160 Z" fill={c} />
      {STRANDS.map(([x0, x1, y1], i) => (
        <path key={i} d={`M ${x0} -156 Q ${(x0 + x1) / 2 + (i % 2 ? 14 : -14)} -84 ${x1} ${y1}`} stroke={shade(c, 0.22)} strokeWidth={9} strokeLinecap="round" fill="none" />
      ))}
      {/* clamp and head bar */}
      <rect x={-140} y={-200} width={280} height={42} rx={18} fill={C.greyDark} />
      <rect x={-52} y={-262} width={104} height={68} rx={16} fill={C.blue} />
      <rect x={24} y={-262} width={28} height={68} rx={12} fill={C.blueDark} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>{body}</g>
    </g>
  );
}
