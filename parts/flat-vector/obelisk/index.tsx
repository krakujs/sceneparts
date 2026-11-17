import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Monument obelisk: a tall tapering stone shaft with a pyramidion tip on a stepped square base. Plain, no lettering.
// Origin = bottom centre on the ground. About 320 px wide and 1200 px tall at s = 1.
// anim "lights": a soft highlight slides up the shaft with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.greyLight;
  const cap = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const glint = anim === "lights" ? -900 + ((f * 6) % 800) : -900;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={300} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* stepped base */}
        <rect x={-240} y={-80} width={480} height={80} rx={8} fill={shade(stone, 0.15)} />
        <rect x={-200} y={-150} width={400} height={70} rx={6} fill={shade(stone, 0.08)} />
        <rect x={-170} y={-190} width={340} height={40} rx={4} fill={stone} />
        {/* tapering shaft */}
        <path d="M -130 -190 L -100 -1080 L 100 -1080 L 130 -190 Z" fill={stone} />
        <path d="M 40 -190 L 62 -1080 L 100 -1080 L 130 -190 Z" fill={shade(stone, 0.12)} />
        <rect x={-100} y={-1080} width={200} height={10} fill={shade(stone, 0.1)} />
        {/* pyramidion tip */}
        <path d="M -100 -1080 L 0 -1190 L 100 -1080 Z" fill={cap} />
        <path d="M 0 -1190 L 100 -1080 L 0 -1080 Z" fill={shade(cap, 0.15)} />
        {/* sliding highlight */}
        <rect x={-70} y={glint} width={22} height={300} rx={11} fill={C.white} opacity={anim === "lights" ? 0.35 : 0} />
      </g>
    </g>
  );
}
