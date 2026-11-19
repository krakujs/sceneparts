import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round hand tambourine seen face-on: a wooden ring with a pale skin head and pairs of jingles set in the rim.
// Origin = bottom centre, the frame rests on y. anim "shake" tilts it and rattles the jingles.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const R = 200;
const SLOTS = 12;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const jingle = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "shake" ? 8 * Math.sin((f * 2 * Math.PI) / 18) : 0;
  const cy = -R - 10;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(cy)}) rotate(${f1(tilt)})`}>
          {/* wooden ring */}
          <circle cx={0} cy={0} r={R} fill={wood} />
          <circle cx={0} cy={0} r={R - 26} fill={shade(wood, 0.2)} />
          {/* skin head */}
          <circle cx={0} cy={0} r={R - 30} fill={C.sand} />
          <circle cx={0} cy={0} r={R - 60} fill={shade(C.sand, 0.06)} opacity={0.5} />
          {/* highlight on the ring */}
          <path d={`M ${-R * 0.7} ${-R * 0.55} A ${R * 0.92} ${R * 0.92} 0 0 1 ${-R * 0.2} ${-R * 0.94}`} fill="none" stroke={C.white} strokeWidth={12} strokeLinecap="round" opacity={0.22} />
          {/* jingle pairs in the slots of the rim */}
          {Array.from({ length: SLOTS }, (_, i) => {
            const a = (i / SLOTS) * 2 * Math.PI;
            const cx = Math.cos(a) * (R - 13), cyy = Math.sin(a) * (R - 13);
            const k = anim === "shake" ? Math.sin((f * 2 * Math.PI) / 18 + i) * 4 : 0;
            return (
              <g key={i} transform={`translate(${f1(cx + k * Math.cos(a))} ${f1(cyy + k * Math.sin(a))})`}>
                <rect x={-14} y={-9} width={28} height={18} rx={6} fill={jingle} />
                <rect x={-14} y={3} width={28} height={6} rx={3} fill={shade(jingle, 0.2)} />
              </g>
            );
          })}
        </g>
      </g>
    </g>
  );
}
