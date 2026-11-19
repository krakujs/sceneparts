import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Water bottle (preset of flat-vector/drink): clear blue-tinted plastic bottle, half full of water, ridged base, blue cap, plain label band.
const LOOK = { vessel: "bottle", color: "#DDF1FA", lid: "#3D6FE0", h: 480 };
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s = q.s ?? 1, f = q.f ?? 0, x = q.x ?? 540, y = q.y ?? 1560, h = q.h;
  const hw = 65;
  const waterTop = -0.66 * h;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {/* water filling the lower body */}
          <rect x={-hw + 2} y={f1(waterTop)} width={2 * hw - 4} height={f1(-8 - waterTop)} rx={12} fill="#5FB8E8" opacity={0.42} />
          <path d={`M ${-hw + 4} ${f1(waterTop)} Q 0 ${f1(waterTop + 6)} ${hw - 4} ${f1(waterTop)}`} fill="none" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={3} />
          {/* plain label band */}
          <rect x={-hw + 1} y={f1(-0.62 * h)} width={2 * hw - 2} height={f1(0.26 * h)} fill="#FFFFFF" />
          {/* grip ridges on the lower body */}
          {[-46, -60, -74].map((ry) => (
            <path key={ry} d={`M -54 ${ry} Q 0 ${ry + 7} 54 ${ry}`} fill="none" stroke="#2F7FB8" strokeOpacity={0.22} strokeWidth={3} strokeLinecap="round" />
          ))}
          {/* glint */}
          <rect x={-46} y={f1(-0.64 * h)} width={8} height={f1(0.5 * h)} rx={4} fill="#FFFFFF" opacity={0.55} />
        </g>
      </g>
    </g>
  );
}
