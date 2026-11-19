import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden basket sled, side view, facing right: a wicker-style basket on curved runners, a raised handlebar at the back
// and a tow line running forward. Just the sled, no dogs. Origin = floor centre; the runners stand on y.
// About 760 px wide and 450 px tall at s = 1. anim "drive": the sled bounces and the tow line sways.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.brownDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  const sway = driving ? Math.sin((f * 2 * Math.PI) / 30) * 4 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* tow line running forward, with a loose end */}
          <path d={`M 280 -214 Q 350 ${f1(-236 + sway)} 430 ${f1(-214 + sway)}`} fill="none" stroke={C.greyDark} strokeWidth={9} strokeLinecap="round" />
          <circle cx={432} cy={f1(-214 + sway)} r={9} fill={C.greyDark} />
          {/* runners with a curled front */}
          <path d="M -320 -22 L -320 -8 Q -320 0 -310 0 L 290 0 Q 340 0 364 -52 Q 374 -74 392 -72 Q 404 -68 398 -54 Q 376 -18 292 -22 L -310 -22 Z" fill={frame} />
          {/* struts linking runners and basket */}
          <rect x={-200} y={-150} width={22} height={130} fill={frame} />
          <rect x={60} y={-150} width={22} height={130} fill={frame} />
          {/* basket: rim, weave and sides */}
          <rect x={-300} y={-290} width={580} height={22} rx={10} fill={shade(wood, 0.2)} />
          <rect x={-290} y={-270} width={580} height={120} rx={14} fill={wood} />
          {[-250, -226, -202, -178].map((wy, i) => (
            <rect key={i} x={-280 + i * 2} y={wy} width={560 - i * 4} height={6} rx={3} fill={shade(wood, 0.25)} />
          ))}
          {/* handlebar at the back */}
          <rect x={-340} y={-420} width={22} height={150} rx={8} fill={frame} />
          <rect x={-372} y={-440} width={120} height={26} rx={13} fill={frame} />
        </g>
      </g>
    </g>
  );
}
