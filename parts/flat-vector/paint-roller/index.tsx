import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Paint roller: a loaded sleeve resting on the floor, with yoke, pole and T-grip handle.
// Origin = floor centre under the sleeve. Hero size: about 480 px tall at s = 1.
// anim "roll": stripes run across the sleeve as if it is rolling over the wall.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const paint = p.color && p.color !== "none" ? p.color : C.blue;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const offset = anim === "roll" ? (f * 3) % 40 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <line x1={0} y1={-170} x2={-110} y2={-430} stroke={frame} strokeWidth={26} strokeLinecap="round" />
        <g transform="translate(-110 -430) rotate(-25)">
          <rect x={-58} y={-22} width={116} height={44} rx={22} fill={C.brown} />
          <rect x={-40} y={-16} width={80} height={8} rx={4} fill={C.white} opacity={0.25} />
        </g>
        <rect x={-48} y={-176} width={16} height={84} rx={8} fill={frame} />
        <rect x={32} y={-176} width={16} height={84} rx={8} fill={frame} />
        <rect x={-48} y={-176} width={96} height={20} rx={10} fill={frame} />
        <rect x={-170} y={-110} width={340} height={110} rx={55} fill={paint} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
          <rect key={k} x={-150 + offset + k * 40} y={-110} width={10} height={110} fill={shade(paint, 0.3)} opacity={0.35} />
        ))}
        <rect x={-170} y={-110} width={44} height={110} rx={22} fill={C.greyLight} />
        <rect x={126} y={-110} width={44} height={110} rx={22} fill={C.greyLight} />
        <rect x={-150} y={-98} width={300} height={10} rx={5} fill={C.white} opacity={0.25} />
      </g>
    </g>
  );
}
