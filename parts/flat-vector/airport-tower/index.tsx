import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Air traffic control tower: a tapered shaft, a glass cab with a roof, a mast and a radar dish with a feed horn.
// anim "spin": the dish turns about its mast, drawn as its width going through cos(angle), so it reads as rotating.
// Origin = base of the tower. Room scale: about 1240 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const tower = p.color && p.color !== "none" ? p.color : C.white;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const sc = anim === "spin" ? Math.cos(f * 0.15) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* base and tapered shaft */}
        <rect x={-130} y={-50} width={260} height={50} rx={10} fill={frame} />
        <polygon points="-100,-40 100,-40 60,-850 -60,-850" fill={tower} />
        <polygon points="0,-40 100,-40 60,-850 0,-850" fill={shade(tower, 0.15)} />
        <polygon points="-74,-560 74,-560 76,-530 -76,-530" fill={C.red} />
        {/* glass cab */}
        <rect x={-170} y={-960} width={340} height={110} rx={30} fill={frame} />
        <rect x={-150} y={-940} width={300} height={70} rx={16} fill={C.sky} />
        <rect x={-120} y={-932} width={30} height={54} rx={6} fill={C.white} opacity={0.5} />
        <rect x={-190} y={-1000} width={380} height={42} rx={14} fill={frame} />
        {/* mast and radar dish, which turns in spin */}
        <rect x={-10} y={-1130} width={20} height={130} fill={frame} />
        <g transform={`translate(0 -1130) scale(${f1(sc)} 1)`}>
          <path d="M -150 0 A 150 70 0 0 1 150 0 Z" fill={C.white} />
          <rect x={-150} y={0} width={300} height={14} rx={6} fill={frame} />
          <rect x={-8} y={-120} width={16} height={60} fill={frame} />
        </g>
      </g>
    </g>
  );
}
