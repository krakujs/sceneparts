import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hi-vis safety vest hanging on a hanger, with two reflective bands, a zip and two pockets. No text.
// Origin = floor centre under the vest. Size at s = 1: about 400 px wide and 460 px tall including the hanger.
// anim "sway": the vest swings like a pendulum from the hook.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "sway") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 60) * 4)} 0 -420)`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const band = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={180} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M-16,-470 Q0,-512 16,-470 Q24,-456 10,-446 L0,-420" fill="none" stroke={C.greyDark} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-200,-366 L0,-420 L200,-366" fill="none" stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-120,-352 L-44,-352 L0,-300 L44,-352 L120,-352 L190,-270 L180,-40 Q180,-30 170,-30 L-170,-30 Q-180,-30 -180,-40 L-190,-270 Z" fill={body} />
        <path d="M-120,-352 L-44,-352 L0,-300 L-30,-296 L-100,-340 Z" fill={C.white} opacity={0.12} />
        <rect x={-6} y={-300} width={12} height={262} fill={shade(body, 0.25)} />
        <rect x={-120} y={-300} width={92} height={64} rx={8} fill={shade(body, 0.15)} />
        <rect x={28} y={-300} width={92} height={64} rx={8} fill={shade(body, 0.15)} />
        <rect x={-186} y={-200} width={372} height={26} fill={band} />
        <rect x={-184} y={-130} width={368} height={22} fill={band} />
      </g>
    </g>
  );
}
