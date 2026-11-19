import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Glass test tube standing in a small wooden rack. Origin = bottom centre (the rack rests on y).
// About 340 px wide and 600 px tall at s = 1. anim "bubbles": bubbles rise through the liquid in a 60-frame loop.
const f1 = (v: number) => v.toFixed(1);
const BUBBLES = [
  { x: -18, r: 7, o: 0 }, { x: 12, r: 5, o: 17 }, { x: -6, r: 9, o: 31 }, { x: 20, r: 6, o: 44 }, { x: -22, r: 4, o: 9 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const liquid = p.color && p.color !== "none" ? p.color : C.teal;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const glass = "#E3F3FA";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      {/* tube with a rounded bottom; the lower end is hidden inside the rack */}
      <path d="M -46 -560 L -46 -156 A 46 46 0 0 0 46 -156 L 46 -560 Z" fill={glass} />
      <rect x={24} y={-556} width={20} height={400} rx={8} fill="#C4E0EF" />
      <path d="M -40 -380 L -40 -156 A 40 40 0 0 0 40 -156 L 40 -380 Z" fill={liquid} />
      <rect x={-40} y={-384} width={80} height={10} rx={4} fill={shade(liquid, 0.2)} />
      {anim === "bubbles" && BUBBLES.map((b, i) => {
        const ph = ((f + b.o) % 60) / 60;
        return <circle key={i} cx={b.x} cy={f1(-160 - ph * 200)} r={b.r} fill={C.white} opacity={(0.75 * (1 - ph * 0.6)).toFixed(2)} />;
      })}
      <rect x={-32} y={-540} width={10} height={200} rx={5} fill={C.white} opacity={0.7} />
      <rect x={-58} y={-574} width={116} height={18} rx={8} fill={C.grey} />
      {/* wooden rack in front of the lower tube */}
      <rect x={-170} y={-120} width={340} height={120} rx={16} fill={wood} />
      <rect x={-170} y={-120} width={340} height={24} rx={8} fill={shade(wood, 0.22)} />
      <rect x={-130} y={-60} width={260} height={14} rx={6} fill={shade(wood, 0.3)} />
    </g>
  );
}
