import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tiered stone fountain: a wide basin, a middle bowl and a tall top spout, with water jets and drips.
// Origin = bottom centre on the ground. About 760 px wide and 760 px tall at s = 1 (jets rise above the top bowl).
// anim "lights": the water jets pulse up and down in turn with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stone = p.color && p.color !== "none" ? p.color : C.greyLight;
  const water = p.color2 && p.color2 !== "none" ? p.color2 : C.skyDeep;
  const anim: string = p.anim ?? "none";
  const pulse = (i: number) => (anim === "lights" ? 1 + 0.35 * Math.sin((f / 30) * Math.PI * 2 + i * 1.3) : 1);
  const jets = [-240, -120, 120, 240];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={400} ry={22} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* base basin */}
        <ellipse cx={0} cy={-90} rx={370} ry={80} fill={shade(stone, 0.12)} />
        <ellipse cx={0} cy={-110} rx={370} ry={80} fill={stone} />
        <ellipse cx={0} cy={-120} rx={330} ry={62} fill={water} />
        <path d="M -250 -140 Q -150 -110 0 -116 Q 150 -110 250 -140" fill="none" stroke={C.white} strokeWidth={6} opacity={0.5} />
        {/* middle bowl and pedestal */}
        <rect x={-60} y={-330} width={120} height={160} rx={18} fill={stone} />
        <ellipse cx={0} cy={-330} rx={210} ry={44} fill={shade(stone, 0.08)} />
        <ellipse cx={0} cy={-340} rx={200} ry={36} fill={water} />
        {/* top bowl and spout */}
        <rect x={-18} y={-500} width={36} height={180} fill={stone} />
        <ellipse cx={0} cy={-500} rx={120} ry={32} fill={stone} />
        <ellipse cx={0} cy={-508} rx={104} ry={24} fill={water} />
        <ellipse cx={0} cy={-520} rx={36} ry={10} fill={stone} />
        {/* water jets */}
        {jets.map((jx, i) => {
          const h = 110 * pulse(i);
          return (
            <g key={jx}>
              <path d={`M ${jx} -140 Q ${jx * 0.9} ${f1(-140 - h)} ${jx * 0.7} -150`} fill="none" stroke={water} strokeWidth={10} strokeLinecap="round" />
              <circle cx={jx * 0.7} cy={-150} r={12} fill={C.white} opacity={0.7} />
            </g>
          );
        })}
        <path d={`M 0 -520 Q -10 ${f1(-520 - 120 * pulse(4))} 0 ${f1(-520 - 180 * pulse(4))}`} fill="none" stroke={water} strokeWidth={12} strokeLinecap="round" />
        <path d={`M -40 -508 Q -110 -460 -100 -420`} fill="none" stroke={water} strokeWidth={8} strokeLinecap="round" opacity={0.7} />
        <path d={`M 40 -508 Q 110 -460 100 -420`} fill="none" stroke={water} strokeWidth={8} strokeLinecap="round" opacity={0.7} />
        {/* plinth */}
        <rect x={-380} y={-30} width={760} height={30} rx={10} fill={shade(stone, 0.2)} />
      </g>
    </g>
  );
}
