import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Laboratory microscope: eyepiece, tube, C-arm, stage with a light aperture and objective lens.
// Origin = bottom centre (base rests on y). About 400 px wide and 620 px tall at s = 1.
// anim "light": the lamp under the stage pulses.
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
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  const glow = anim === "light" ? 0.2 + 0.15 * (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2 * 2 : 0.2;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* lamp beam between base and stage */}
        <polygon points="-40,-252 20,-252 34,-62 -54,-62" fill={C.yellow} opacity={glow} />
        {/* base */}
        <rect x={-200} y={-60} width={400} height={60} rx={22} fill={body} />
        <rect x={-170} y={-44} width={340} height={10} rx={5} fill={shade(body, 0.3)} />
        <rect x={-50} y={-62} width={80} height={8} rx={4} fill={C.yellow} />
        {/* C-arm */}
        <rect x={-120} y={-460} width={52} height={400} rx={24} fill={body} />
        <rect x={-120} y={-480} width={170} height={60} rx={24} fill={body} />
        <rect x={-112} y={-450} width={10} height={370} rx={5} fill={C.white} opacity={0.2} />
        <circle cx={-96} cy={-330} r={28} fill={shade(body, 0.2)} />
        <circle cx={-96} cy={-330} r={12} fill={C.greyDark} />
        {/* tube and eyepiece */}
        <rect x={-10} y={-560} width={60} height={170} rx={18} fill={shade(body, 0.1)} />
        <rect x={-2} y={-600} width={44} height={50} rx={10} fill={shade(body, 0.4)} />
        <rect x={20} y={-300} width={24} height={40} rx={4} fill={C.greyDark} />
        {/* stage */}
        <rect x={-150} y={-270} width={270} height={24} rx={6} fill={C.greyLight} />
        <rect x={-40} y={-266} width={60} height={14} rx={4} fill={C.ink} />
        <circle cx={-132} cy={-258} r={9} fill={C.ink} />
        <rect x={-150} y={-270} width={270} height={6} rx={3} fill={C.white} opacity={0.6} />
      </g>
    </g>
  );
}
