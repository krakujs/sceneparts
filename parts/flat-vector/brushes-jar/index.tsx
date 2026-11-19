import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Glass jar of water with four paintbrushes standing in it, handles up, bristles in the water.
// Origin = bottom centre of the jar. Hero size: about 330 px wide and 620 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);

// A brush standing in the jar: handle up and out of the mouth, ferrule, and a paint-tipped head inside the water.
const Brush = ({ x, lean, c, handle, sway }: { x: number; lean: number; c: string; handle: string; sway: number }) => (
  <g transform={`translate(${f1(x)} -250) rotate(${f1(lean + sway)} 0 0)`}>
    <rect x={-9} y={-300} width={18} height={250} rx={9} fill={handle} />
    <rect x={-12} y={-70} width={24} height={36} rx={6} fill={C.greyDark} />
    <path d="M -12 -40 L 12 -40 L 14 60 L -14 60 Z" fill={C.sand} />
    <path d="M -14 60 L 14 60 L 9 110 L -9 110 Z" fill={c} />
    <circle cx={0} cy={112} r={10} fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const water = p.water && p.water !== "none" ? p.water : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const sway = anim === "wobble" ? Math.sin((f * 2 * Math.PI) / 50) * 4 : 0;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 - Math.exp(-f / 6) * Math.cos(f / 3) * 0.06 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)}) scale(${f1(pop)})`}>
        {/* brushes behind the glass (their handles stick out of the mouth) */}
        <Brush x={-70} lean={-10} c={C.blue} handle={C.brown} sway={sway} />
        <Brush x={-20} lean={-3} c={C.red} handle={C.brownDark} sway={-sway * 0.6} />
        <Brush x={30} lean={4} c={C.green} handle={C.sand} sway={sway * 0.8} />
        <Brush x={75} lean={11} c={C.yellow} handle={C.brown} sway={-sway} />
        {/* jar back wall and water */}
        <rect x={-140} y={-420} width={280} height={420} rx={40} fill={water} opacity={0.55} />
        <rect x={-140} y={-300} width={280} height={300} rx={36} fill={water} opacity={0.75} />
        <rect x={-140} y={-300} width={280} height={14} fill="#FFFFFF" opacity={0.3} />
        {/* front glass with highlights */}
        <path d="M -140 -420 L 140 -420 L 140 -40 Q 140 0 100 0 L -100 0 Q -140 0 -140 -40 Z" fill="none" stroke="#FFFFFF" strokeWidth={6} opacity={0.5} />
        <rect x={-110} y={-380} width={18} height={310} rx={9} fill="#FFFFFF" opacity={0.45} />
        <rect x={-140} y={-436} width={280} height={24} rx={10} fill={shade(C.grey, 0.1)} />
        <rect x={-150} y={-20} width={300} height={20} rx={10} fill={C.greyDark} />
      </g>
    </g>
  );
}
