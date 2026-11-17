import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden toboggan sledge, side view, facing right: a plank seat board with a curled front, on two curved runners.
// Origin = floor centre; the runners stand on y. About 680 px wide and 220 px tall at s = 1.
// anim "drive": the sled bounces a little over the snow; vx slides it along.
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
  const runner = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* runner with a curled front */}
          <path d="M -300 -26 L -300 -8 Q -300 0 -290 0 L 250 0 Q 310 0 336 -48 Q 348 -72 366 -70 Q 378 -66 372 -52 Q 350 -18 296 -22 L -290 -26 Z" fill={runner} />
          {/* struts */}
          <rect x={-200} y={-112} width={22} height={88} fill={shade(wood, 0.25)} />
          <rect x={-12} y={-112} width={22} height={88} fill={shade(wood, 0.25)} />
          <rect x={170} y={-112} width={22} height={88} fill={shade(wood, 0.25)} />
          {/* seat board with a curled front */}
          <path d="M -290 -150 L 262 -150 Q 318 -158 350 -226 L 388 -216 Q 344 -110 262 -110 L -290 -110 Z" fill={wood} />
          <path d="M -290 -110 L 262 -110 Q 300 -112 318 -128 L -290 -128 Z" fill={shade(wood, 0.2)} />
          {[-120, 40, 200].map((px) => (
            <rect key={px} x={px} y={-150} width={6} height={40} fill={shade(wood, 0.25)} />
          ))}
        </g>
      </g>
    </g>
  );
}
