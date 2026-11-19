import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Barbell resting on the floor, front view: a long bar with knurled grip rings, collars and two large
// round plates each side of the sleeve. Origin = floor centre (plate bottoms touch y). About 900 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const plateC = p.color && p.color !== "none" ? p.color : C.navy;
  const barC = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  // plates are drawn as circles standing on the floor: centre height = radius
  const plate = (cx: number, r: number, w: number) => (
    <g key={cx}>
      <rect x={cx - w / 2} y={-2 * r} width={w} height={2 * r} rx={w / 2} fill={plateC} />
      <circle cx={cx} cy={-r} r={r} fill={plateC} />
      <circle cx={cx} cy={-r} r={r * 0.62} fill={shade(plateC, 0.22)} />
      <circle cx={cx} cy={-r} r={r * 0.18} fill={barC} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* bar, lying on the floor (bar centre at height 180 px) */}
        <rect x={-430} y={-196} width={860} height={32} rx={16} fill={barC} />
        <rect x={-430} y={-180} width={860} height={16} rx={8} fill={shade(barC, 0.2)} />
        {/* knurled grip zones */}
        <rect x={-150} y={-196} width={300} height={32} fill={shade(barC, 0.12)} opacity={0.6} />
        {/* outer plates (larger) then inner plates */}
        {plate(-300, 170, 56)}
        {plate(300, 170, 56)}
        {plate(-240, 120, 40)}
        {plate(240, 120, 40)}
        {/* collars */}
        <rect x={-230} y={-210} width={22} height={60} rx={6} fill={C.greyDark} />
        <rect x={208} y={-210} width={22} height={60} rx={6} fill={C.greyDark} />
      </g>
    </g>
  );
}
