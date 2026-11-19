import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open paint tin with a wire handle, paint showing on the surface and a drip running down the side.
// Origin = floor centre under the tin. Hero size: about 360 px wide and 420 px tall at s = 1.
// anim "drip": the drip grows longer, then restarts.
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
  const paint = p.color && p.color !== "none" ? p.color : C.blue;
  const tin = p.color2 && p.color2 !== "none" ? p.color2 : "#B9C0CE";
  const anim: string = p.anim ?? "none";
  const drip = anim === "drip" ? 80 + ((f * 2) % 90) : 120;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M-150,-300 Q0,-500 150,-300" fill="none" stroke={C.greyDark} strokeWidth={16} strokeLinecap="round" />
        <path d="M-160,-290 L160,-290 L130,-16 Q0,6 -130,-16 Z" fill={tin} />
        <path d="M-160,-290 L-130,-16 Q-100,-6 -90,-10 L-120,-290 Z" fill={C.white} opacity={0.2} />
        <rect x={-156} y={-200} width={312} height={16} fill={shade(tin, 0.15)} opacity={0.6} />
        <rect x={-170} y={-312} width={340} height={32} rx={14} fill={shade(tin, 0.25)} />
        <rect x={40} y={-296} width={36} height={drip} rx={18} fill={paint} />
        <circle cx={58} cy={-296 + drip} r={18} fill={paint} />
        <rect x={-110} y={-296} width={26} height={60} rx={13} fill={paint} />
        <ellipse cx={0} cy={-296} rx={152} ry={16} fill={paint} />
        <ellipse cx={-40} cy={-300} rx={60} ry={5} fill={C.white} opacity={0.3} />
      </g>
    </g>
  );
}
