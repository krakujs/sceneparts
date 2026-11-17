/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pea pod: an open green pod lying on the ground with a row of round peas in it.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const pod: string = p.color ?? C.green;
  const inside = shade(pod, 0.35);
  const peaC: string = p.peaColor ?? "#8AD26A";
  const PEAS: [number, number][] = [];
  for (let i = 0; i < 6; i++) PEAS.push([-150 + i * 60, -128]);

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={215} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {/* stem ends */}
        <path d="M -200 -140 Q -235 -158 -252 -192" stroke={C.greenDark} strokeWidth={10} strokeLinecap="round" fill="none" />
        <path d="M 200 -140 Q 235 -158 252 -192" stroke={C.greenDark} strokeWidth={10} strokeLinecap="round" fill="none" />
        {/* inside of the open pod */}
        <ellipse cx={0} cy={-140} rx={200} ry={40} fill={inside} />
        {PEAS.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={36} fill={shade(peaC, 0.22)} />
            <circle cx={cx - 4} cy={cy - 4} r={32} fill={peaC} />
            <ellipse cx={cx - 13} cy={cy - 14} rx={8} ry={5} fill="#FFFFFF" opacity={0.55} transform={`rotate(-35 ${f1(cx - 13)} ${f1(cy - 14)})`} />
          </g>
        ))}
        {/* front wall of the pod, a U-shape that hides the lower part of the peas */}
        <path d="M -200 -140 A 200 40 0 0 0 200 -140 Q 0 140 -200 -140 Z" fill={shade(pod, 0.12)} />
        <path d="M -200 -140 A 200 40 0 0 0 200 -140 Q 0 96 -200 -140 Z" fill={pod} />
        <path d="M -150 -88 Q 0 -46 150 -88" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.25} />
      </g>
    </g>
  );
}
