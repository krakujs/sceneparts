import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Slide trombone held level, bell to the right: mouthpiece on the left, a long main tube, the hand-slide
// bracket and the moving U-shaped slide, and a big flared bell. anim "slide" moves the slide out and back.
// Origin = bottom centre (bottom of the bell on y). About 760 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brass = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  // slide position: 0 = closed (pushed in), -110 = fully out
  const slide = anim === "slide" ? -55 - 55 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const S = (k: number) => shade(brass, k);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform="translate(0 -110)">
          {/* mouthpiece */}
          <ellipse cx={-368} cy={0} rx={14} ry={24} fill={C.greyDark} />
          <rect x={-360} y={-14} width={24} height={28} rx={8} fill={C.greyDark} />
          {/* fixed main tube, through the slide bracket to the bell */}
          <rect x={-340} y={-16} width={600} height={32} rx={16} fill={S(0.25)} />
          <rect x={-340} y={-8} width={600} height={14} rx={7} fill={brass} />
          {/* slide bracket on the fixed tube */}
          <rect x={-60} y={-30} width={22} height={60} rx={6} fill={C.greyLight} />
          {/* moving slide: two outer bars and a U bend, sliding left and right */}
          <g transform={`translate(${f1(slide)} 0)`}>
            <rect x={-210} y={-96} width={460} height={20} rx={10} fill={brass} />
            <rect x={-210} y={-40} width={460} height={20} rx={10} fill={brass} />
            <rect x={240} y={-96} width={26} height={76} rx={10} fill={S(0.2)} />
            <rect x={-210} y={-96} width={460} height={6} rx={3} fill={C.white} opacity={0.35} />
          </g>
          {/* bell tube and flare */}
          <rect x={250} y={-18} width={40} height={36} rx={12} fill={S(0.2)} />
          <path d="M 280 -18 L 350 -112 Q 388 0 350 112 L 280 18 Z" fill={S(0.25)} />
          <path d="M 280 -12 L 344 -100 Q 368 0 344 100 L 280 12 Z" fill={brass} />
          <ellipse cx={350} cy={0} rx={20} ry={112} fill={S(0.4)} />
          <ellipse cx={350} cy={0} rx={14} ry={102} fill={C.ink} opacity={0.5} />
          <rect x={290} y={-80} width={10} height={160} rx={5} fill={C.white} opacity={0.3} />
        </g>
      </g>
    </g>
  );
}
