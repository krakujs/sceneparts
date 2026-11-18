import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dumbbell lying on the floor, side view: a grey handle with a hexagonal plate at each end, each plate
// with a darker inner face for depth. Origin = floor centre (the plates touch y). About 560 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

// Hexagon with a flat top, centred on (cx, cy), with circumradius r.
const hex = (cx: number, cy: number, r: number) => {
  const pts = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (Math.PI / 3) * i;
    return `${f1(cx + Math.cos(a) * r)} ${f1(cy + Math.sin(a) * r)}`;
  });
  return `M ${pts.join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const plate = p.color && p.color !== "none" ? p.color : C.blue;
  const handle = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={270} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* handle */}
        <rect x={-200} y={-80} width={400} height={28} rx={14} fill={handle} />
        <rect x={-200} y={-62} width={400} height={10} rx={5} fill={shade(handle, 0.2)} />
        {/* hex plates, two per end, the inner one slightly smaller */}
        <path d={hex(-200, -68, 72)} fill={plate} />
        <path d={hex(-200, -68, 48)} fill={shade(plate, 0.18)} />
        <path d={hex(200, -68, 72)} fill={plate} />
        <path d={hex(200, -68, 48)} fill={shade(plate, 0.18)} />
        {/* collars */}
        <rect x={-150} y={-86} width={18} height={40} rx={6} fill={C.greyDark} />
        <rect x={132} y={-86} width={18} height={40} rx={6} fill={C.greyDark} />
        {/* hex centre bosses */}
        <circle cx={-200} cy={-68} r={14} fill={C.greyDark} />
        <circle cx={200} cy={-68} r={14} fill={C.greyDark} />
      </g>
    </g>
  );
}
