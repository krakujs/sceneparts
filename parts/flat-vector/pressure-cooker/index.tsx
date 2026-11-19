import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pressure cooker: Indian-style steel pressure cooker with a long side handle and a whistle weight on the lid.
// anim "whistle": the weight jiggles and puffs of steam burst out of it.
// Origin = bottom centre (resting point). Honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : "#C9D1DC";
  const dk = shade(c, 0.2), handle = C.inkSoft;
  const whistle = p.anim === "whistle";
  const jiggle = whistle ? Math.sin((f * Math.PI) / 6) * 4 : 0;
  const puffs = whistle
    ? [0, 1, 2].map((i) => {
        const ph = ((f + i * 15) % 45) / 45;
        return (
          <circle
            key={i}
            cx={f1((i - 1) * 16 + (i - 1) * ph * 22)}
            cy={f1(-306 - ph * 120)}
            r={f1(12 + ph * 28)}
            fill="#FFFFFF"
            opacity={((1 - ph) * 0.9).toFixed(2)}
          />
        );
      })
    : null;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "whistle" ? "none" : p.anim ?? "none", f)}>
        {/* long handle, behind the lid */}
        <rect x={120} y={-236} width={240} height={26} rx={13} fill={handle} />
        <circle cx={330} cy={-223} r={7} fill={shade(handle, 0.4)} />
        {/* body */}
        <path d="M -160 -220 L -160 -40 Q -160 -4 -120 -4 L 120 -4 Q 160 -4 160 -40 L 160 -220 Z" fill={c} />
        <path d="M 100 -220 L 160 -220 L 160 -40 Q 160 -4 120 -4 L 96 -4 Q 130 -14 132 -60 Z" fill={dk} />
        <rect x={-124} y={-4} width={248} height={4} rx={2} fill={dk} />
        {/* rim gasket and lid */}
        <ellipse cx={0} cy={-220} rx={160} ry={24} fill={shade(c, -0.2)} />
        <path d="M -160 -222 C -160 -262 160 -262 160 -222 A 160 24 0 0 1 -160 -222 Z" fill={shade(c, 0.1)} />
        {/* whistle weight */}
        <g transform={`rotate(${f1(jiggle)} 0 -248)`}>
          <rect x={-22} y={-288} width={44} height={40} rx={10} fill={C.greyDark} />
          <rect x={-26} y={-300} width={52} height={14} rx={7} fill={handle} />
        </g>
        {puffs}
      </g>
    </g>
  );
}
