import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bunk bed, front-on: two wooden frames stacked, each with a mattress and a blanket, a ladder at the right
// and four posts. Origin = bottom centre.
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
  const wood = p.color && p.color !== "none" ? p.color : "#D9A066";
  const blanket = p.color2 && p.color2 !== "none" ? p.color2 : C.pink;
  const dk = shade(wood, 0.2);
  const W = 400; // half width of the frame
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W + 40} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* posts */}
        {[-W + 10, W - 40].map((px) => <rect key={px} x={px} y={-1000} width={30} height={1000} rx={10} fill={dk} />)}
        {/* ladder on the right end: two rails from the floor up to the top bunk, with rungs between */}
        <rect x={W + 6} y={-800} width={18} height={800} rx={8} fill={wood} />
        <rect x={W + 72} y={-800} width={18} height={800} rx={8} fill={wood} />
        {[-90, -170, -250, -330, -410, -490, -570, -650, -730].map((ry) => (
          <rect key={ry} x={W + 6} y={ry} width={84} height={12} rx={6} fill={dk} />
        ))}
        {/* top bunk: mattress, blanket, rail */}
        <rect x={-W + 10} y={-620} width={2 * W - 20} height={60} rx={14} fill={dk} />
        <rect x={-W + 20} y={-700} width={2 * W - 40} height={80} rx={22} fill="#FFFFFF" />
        <rect x={-W + 60} y={-740} width={180} height={50} rx={22} fill="#FFFFFF" />
        <path d={`M ${-W + 250} -700 L ${W - 40} -700 L ${W - 40} -640 L ${-W + 250} -640 Z`} fill={blanket} />
        <rect x={-W - 20} y={-790} width={2 * W + 40} height={24} rx={10} fill={wood} />
        {/* bottom bunk: mattress, blanket */}
        <rect x={-W + 20} y={-300} width={2 * W - 40} height={80} rx={22} fill="#FFFFFF" />
        <rect x={-W + 60} y={-340} width={180} height={50} rx={22} fill="#FFFFFF" />
        <path d={`M ${-W + 250} -300 L ${W - 40} -300 L ${W - 40} -240 L ${-W + 250} -240 Z`} fill={blanket} />
        <rect x={-W + 10} y={-240} width={2 * W - 20} height={40} rx={14} fill={dk} />
        {/* bottom frame and feet */}
        <rect x={-W + 10} y={-200} width={2 * W - 20} height={20} rx={8} fill={dk} />
        <rect x={-W + 10} y={-40} width={30} height={40} rx={8} fill={dk} />
        <rect x={W - 40} y={-40} width={30} height={40} rx={8} fill={dk} />
      </g>
    </g>
  );
}
