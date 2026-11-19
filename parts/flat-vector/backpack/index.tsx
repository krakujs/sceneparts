import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Backpack: school or day backpack with rounded body, a front pocket with a zip line, shoulder straps and a top carry loop.
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Hero size.
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
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  const dk = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={16} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* carry loop on top */}
        <path d="M -60 -400 Q -60 -460 0 -460 Q 60 -460 60 -400" fill="none" stroke={dk} strokeWidth={26} strokeLinecap="round" />
        {/* shoulder straps behind the body */}
        <rect x={-150} y={-420} width={52} height={250} rx={22} fill={dk} />
        <rect x={98} y={-420} width={52} height={250} rx={22} fill={dk} />
        {/* main body */}
        <rect x={-180} y={-420} width={360} height={410} rx={70} fill={c} />
        <rect x={120} y={-420} width={60} height={410} rx={30} fill={dk} opacity={0.5} />
        {/* front pocket with flap and zip */}
        <rect x={-120} y={-200} width={240} height={150} rx={36} fill={dk} />
        <rect x={-120} y={-200} width={240} height={72} rx={36} fill={shade(c, 0.1)} />
        <rect x={-100} y={-142} width={200} height={8} rx={4} fill={C.ink} opacity={0.5} />
        <rect x={-30} y={-132} width={60} height={22} rx={8} fill={C.yellow} />
        {/* top zip seam and label patch */}
        <rect x={-150} y={-336} width={300} height={8} rx={4} fill={dk} opacity={0.6} />
        <rect x={-120} y={-296} width={70} height={36} rx={8} fill={C.white} opacity={0.8} />
        {/* feet strip */}
        <rect x={-180} y={-30} width={360} height={30} rx={14} fill={dk} />
      </g>
    </g>
  );
}
