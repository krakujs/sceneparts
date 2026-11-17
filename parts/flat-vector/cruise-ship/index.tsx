import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big cruise liner, side view facing right. Origin = waterline centre. Room scale: about 940 px wide.
// Stacked white decks with rows of portholes, a red funnel and a navy hull. anim "drive" rocks it gently.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 110) * 0.9)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 120} y={8} width={110} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 230} y={18} width={120} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const white = p.color && p.color !== "none" ? p.color : C.white;
  const hull = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const decks = [
    { x: -430, y: -196, w: 840, h: 64 },
    { x: -390, y: -248, w: 760, h: 52 },
    { x: -320, y: -292, w: 620, h: 44 },
    { x: -200, y: -330, w: 380, h: 38 },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* hull */}
        <path d="M -470 -132 L 440 -132 L 490 -70 L 420 12 L -440 12 Q -480 -40 -470 -132 Z" fill={hull} />
        <rect x={-462} y={-116} width={890} height={8} fill={shade(hull, -0.5)} opacity={0.6} />
        {/* funnel and mast */}
        <path d="M 60 -330 L 74 -430 L 160 -430 L 172 -330 Z" fill={C.red} />
        <rect x={62} y={-440} width={110} height={14} rx={6} fill={C.ink} />
        <rect x={-110} y={-400} width={8} height={70} fill={C.greyDark} />
        <rect x={-120} y={-352} width={180} height={22} rx={8} fill={white} />
        {/* decks with rows of portholes and windows */}
        {decks.map((d, i) => (
          <g key={i}>
            <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={12} fill={white} />
            <rect x={d.x} y={d.y + d.h - 6} width={d.w} height={6} fill={shade(white, 0.12)} />
          </g>
        ))}
        {Array.from({ length: 21 }, (_, k) => (
          <circle key={`p${k}`} cx={-400 + k * 40} cy={-164} r={12} fill={C.skyDeep} />
        ))}
        {Array.from({ length: 22 }, (_, k) => (
          <rect key={`w${k}`} x={-366 + k * 34} y={-236} width={22} height={18} rx={4} fill={C.skyDeep} />
        ))}
        {Array.from({ length: 21 }, (_, k) => (
          <rect key={`c${k}`} x={-300 + k * 30} y={-280} width={18} height={16} rx={4} fill={C.skyDeep} />
        ))}
        {Array.from({ length: 13 }, (_, k) => (
          <rect key={`b${k}`} x={-180 + k * 28} y={-318} width={16} height={14} rx={4} fill={C.skyDeep} />
        ))}
      </g>
      <Water w={960} />
    </g>
  );
}
