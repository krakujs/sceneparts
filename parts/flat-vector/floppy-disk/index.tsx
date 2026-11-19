import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// 3.5-inch floppy disk: square diskette with a metal shutter and a blank label. Hero scale, origin = bottom centre.
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
  const body = p.color && p.color !== "none" ? p.color : C.blueDark;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* diskette body, square with clipped top-right corner */}
        <path d="M -200 -400 L 150 -400 L 200 -350 L 200 -20 Q 200 0 180 0 L -180 0 Q -200 0 -200 -20 Z" fill={body} />
        <path d="M -200 -20 L 200 -20 L 200 0 L -200 0 Z" fill={shade(body, 0.3)} />
        <path d="M -180 -380 Q -40 -395 120 -380" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" opacity={0.25} />
        {/* metal shutter at the top */}
        <rect x={-100} y={-390} width={200} height={130} rx={6} fill={C.greyLight} />
        <rect x={-100} y={-390} width={200} height={130} rx={6} fill={C.white} opacity={0.2} />
        <rect x={30} y={-375} width={40} height={100} rx={6} fill={C.greyDark} opacity={0.5} />
        {/* label area, blank */}
        <rect x={-150} y={-230} width={300} height={190} rx={10} fill={C.white} />
        <rect x={-150} y={-230} width={300} height={190} rx={10} fill={C.sand} opacity={0.15} />
        {/* write-protect notch and lower slot */}
        <rect x={-60} y={-40} width={120} height={14} rx={6} fill={C.ink} opacity={0.35} />
      </g>
    </g>
  );
}
