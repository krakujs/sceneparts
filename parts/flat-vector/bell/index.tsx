import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Brass hand bell standing on its wooden handle: flared mouth, rim band, crown knob and a clapper.
// Origin = bottom centre of the handle. anim "ring" swings the bell from its handle, pivoting at the crown.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "ring") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 36) * 12 * Math.exp(-(f % 90) / 40))} 0 -330)`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brass = p.color && p.color !== "none" ? p.color : C.yellowDark;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      {/* wooden handle, fixed to the floor */}
      <rect x={-34} y={-200} width={68} height={196} rx={30} fill={wood} />
      <rect x={-28} y={-190} width={10} height={176} rx={5} fill={C.white} opacity={0.18} />
      <g transform={motion(anim, f)}>
        {/* crown knob and clapper */}
        <circle cx={0} cy={-388} r={24} fill={shade(brass, 0.15)} />
        <rect x={-30} y={-372} width={60} height={22} rx={8} fill={brass} />
        {/* bell body: dome, flared mouth */}
        <path d="M -40 -362 Q -40 -430 0 -430 Q 40 -430 40 -362 L 120 -150 Q 150 -110 150 -90 L -150 -90 Q -150 -110 -120 -150 Z" fill={brass} />
        <path d="M -150 -90 L 150 -90 L 150 -60 Q 150 -40 130 -40 L -130 -40 Q -150 -40 -150 -60 Z" fill={shade(brass, 0.22)} />
        <path d="M -120 -150 Q -90 -200 -60 -230" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.3} />
        <path d="M -150 -90 L -150 -60 Q -150 -40 -130 -40 L 130 -40 Q 150 -40 150 -60 L 150 -90 Z" fill="none" />
        <circle cx={0} cy={-330} r={14} fill={shade(brass, 0.35)} />
      </g>
    </g>
  );
}
