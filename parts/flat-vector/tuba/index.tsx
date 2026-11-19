import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Upright tuba, side view: a big upturned bell at the top, a wide conical main tube running down
// into a thick U bow at the bottom, a narrower branch rising back up on the left into a block of four
// piston valves with finger buttons, a looped tuning slide and a lead pipe to the mouthpiece.
// Origin = bottom centre (the bow rests on y). About 480 px wide and 680 px tall at s = 1.
// anim "toot" = sound rings rise out of the bell in turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brass = p.color && p.color !== "none" ? p.color : C.yellow;
  const dk = shade(brass, 0.18), dk2 = shade(brass, 0.34), lt = "#FFF1C2";
  const anim: string = p.anim ?? "none";
  const rings = anim === "toot" ? [0, 1, 2].map((i) => ((f / 36 + i / 3) % 1)) : [];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={220} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* looped tuning slide on the left */}
        <ellipse cx={-196} cy={-250} rx={48} ry={96} fill="none" stroke={dk} strokeWidth={24} />
        <path d="M -150 -300 L -110 -300 M -150 -200 L -110 -200" stroke={dk} strokeWidth={22} />
        {/* narrow branch rising on the left from the bow to the valves */}
        <path d="M -110 -120 L -110 -440" stroke={dk} strokeWidth={60} strokeLinecap="round" />
        <path d="M -126 -140 L -126 -420" stroke={brass} strokeWidth={16} strokeLinecap="round" opacity={0.7} />
        {/* thick U bow at the bottom */}
        <path d="M 66 -140 C 66 -20 -110 -20 -110 -130" stroke={dk2} strokeWidth={100} fill="none" />
        <path d="M 66 -150 C 66 -40 -110 -40 -110 -140" stroke={brass} strokeWidth={70} fill="none" />
        {/* wide conical main tube flaring into the bell */}
        <path d="M 10 -150 L -36 -520 Q -60 -604 -170 -640 L 210 -640 Q 120 -604 116 -520 L 122 -150 Z" fill={brass} />
        <path d="M 80 -150 L 86 -520 Q 98 -600 210 -640 L 160 -640 Q 66 -600 60 -520 L 54 -150 Z" fill={dk} />
        <path d="M 0 -200 L -26 -500" stroke={lt} strokeWidth={14} strokeLinecap="round" opacity={0.7} />
        {/* bell rim, seen from slightly above */}
        <ellipse cx={20} cy={-640} rx={192} ry={36} fill={dk} />
        <ellipse cx={20} cy={-644} rx={162} ry={24} fill={dk2} />
        <ellipse cx={20} cy={-640} rx={192} ry={36} fill="none" stroke={brass} strokeWidth={10} />
        {/* cross tubes joining the branch and the valve block to the main tube */}
        <rect x={-112} y={-336} width={100} height={26} rx={10} fill={dk} />
        <rect x={-112} y={-470} width={92} height={26} rx={10} fill={dk} />
        {/* four piston valves */}
        {[-100, -78, -56, -34].map((vx, i) => (
          <g key={vx}>
            <rect x={vx - 10} y={-470} width={20} height={176} rx={6} fill={i % 2 ? dk : brass} />
            <rect x={vx - 13} y={-488} width={26} height={20} rx={5} fill={C.greyLight} />
            <rect x={vx - 3} y={-512} width={6} height={26} fill={C.grey} />
            <ellipse cx={vx} cy={-516} rx={12} ry={7} fill={C.white} />
            <rect x={vx - 13} y={-300} width={26} height={14} rx={5} fill={dk2} />
          </g>
        ))}
        {/* lead pipe and mouthpiece */}
        <path d="M -112 -456 Q -190 -500 -222 -592" stroke={dk} strokeWidth={20} fill="none" strokeLinecap="round" />
        <path d="M -230 -604 L -214 -588 L -226 -576 L -244 -594 Z" fill={C.grey} />
        <ellipse cx={-240} cy={-604} rx={22} ry={10} fill={C.greyDark} transform="rotate(-50 -240 -604)" />
        {/* sound rings out of the bell */}
        {rings.map((r, i) => (
          <ellipse key={i} cx={20} cy={f1(-680 - r * 260)} rx={f1(150 + r * 90)} ry={f1(28 + r * 16)} fill="none"
            stroke={C.white} strokeWidth={10} opacity={f1(0.8 * (1 - r))} />
        ))}
      </g>
    </g>
  );
}
