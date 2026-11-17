/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cabbage: round green head built from layered pale leaves with curved veins. Origin = resting point.
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
  const green: string = p.color ?? "#6DB35F";
  const pale = shade(green, -0.0) === green ? "#A9DA86" : "#A9DA86";
  const vein = "#4E8A45";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={185} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        <circle cx={0} cy={-195} r={190} fill={shade(green, 0.12)} />
        {/* outer leaf wrap, then inner leaves getting paler towards the core */}
        <ellipse cx={14} cy={-203} rx={166} ry={172} fill={green} />
        <ellipse cx={20} cy={-212} rx={134} ry={142} fill={pale} />
        <ellipse cx={26} cy={-222} rx={92} ry={98} fill="#C9EAA8" />
        <ellipse cx={30} cy={-230} rx={46} ry={50} fill="#E2F5CC" />
        {/* veins fanning from the base */}
        <g stroke={vein} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.75}>
          <path d="M 10 -30 Q -60 -150 -120 -262" />
          <path d="M 10 -30 Q -10 -170 -30 -322" />
          <path d="M 10 -30 Q 70 -150 120 -255" />
          <path d="M 10 -30 Q 110 -110 150 -190" />
          <path d="M 10 -30 Q -110 -110 -150 -170" />
        </g>
        <rect x={-22} y={-14} width={44} height={16} rx={7} fill="#D8C9A0" />
      </g>
    </g>
  );
}
