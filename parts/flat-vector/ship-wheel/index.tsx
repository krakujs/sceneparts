import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden ship's helm wheel on a post, front view. Origin = bottom centre. About 440 px wide, 520 px tall.
// Rim, eight spokes with brass handle knobs and a hub. anim "spin" turns the wheel on its post.
const f1 = (v: number) => v.toFixed(1);
const HUB_Y = -270;
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const brass = p.color2 && p.color2 !== "none" ? p.color2 : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? f * 2 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* post and base (fixed) */}
        <rect x={-20} y={HUB_Y + 40} width={40} height={-HUB_Y - 40 - 26} fill={shade(wood, 0.2)} />
        <rect x={-110} y={-26} width={220} height={26} rx={10} fill={shade(wood, 0.3)} />
        {/* the wheel turns about its hub */}
        <g transform={`rotate(${f1(turn)} 0 ${HUB_Y})`}>
          <circle cx={0} cy={HUB_Y} r={190} fill="none" stroke={wood} strokeWidth={26} />
          {Array.from({ length: 8 }, (_, k) => (
            <g key={k} transform={`rotate(${k * 45} 0 ${HUB_Y})`}>
              <rect x={-11} y={HUB_Y - 214} width={22} height={214} rx={10} fill={wood} />
              <circle cx={0} cy={HUB_Y - 214} r={22} fill={brass} />
            </g>
          ))}
          <circle cx={0} cy={HUB_Y} r={42} fill={brass} />
          <circle cx={0} cy={HUB_Y} r={16} fill={shade(brass, 0.25)} />
        </g>
      </g>
    </g>
  );
}
