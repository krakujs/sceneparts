import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Raised garden bed: a wooden box of soil with a row of lettuces, carrot tops and a staked tomato plant.
// Origin = centre of the bed's ground line. About 900 px wide and 620 px tall at s = 1. anim sway moves the plants.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#B07A4A", SOIL = "#6B4A2E", LEAF = "#4BB46A", CARROT = "#3E9B4F", TOMATO = "#E8503F";
const TOP = -235; // soil surface

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wood = p.color && p.color !== "none" ? p.color : WOOD;
  const greens = p.color2 && p.color2 !== "none" ? p.color2 : LEAF;
  const anim: string = p.anim ?? "none";
  const rot = (i: number, amp: number) => (anim === "sway" ? amp * Math.sin((f * 2 * Math.PI) / 80 + i * 0.9) : 0);
  const lettuce = [-250, -120];
  const carrots = [-30, 10, 50, 90];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-2} rx={430} ry={18} fill={C.shadow} />
      {/* soil inside the box */}
      <rect x={-380} y={TOP - 4} width={760} height={30} fill={SOIL} />
      {/* lettuces: rosettes of broad leaves */}
      {lettuce.map((lx, li) => (
        <g key={`l${li}`} transform={`translate(${lx} ${TOP}) rotate(${f1(rot(li, 2))}) scale(1.35)`}>
          {[-70, -45, -20, 0, 20, 45, 70].map((a, i) => (
            <ellipse key={i} cx={0} cy={-52} rx={28} ry={56} fill={i % 2 ? shade(greens, 0.15) : greens} transform={`rotate(${a})`} />
          ))}
          <ellipse cx={0} cy={-10} rx={20} ry={16} fill={shade(greens, 0.3)} />
        </g>
      ))}
      {/* carrot tops: feathery fronds */}
      {carrots.map((cx, ci) => (
        <g key={`c${ci}`} transform={`translate(${cx} ${TOP}) rotate(${f1(rot(ci + 3, 3))})`}>
          {[-24, -8, 10, 26].map((a, i) => (
            <g key={i} transform={`rotate(${a})`}>
              <path d="M 0 0 L 0 -200" stroke={CARROT} strokeWidth={4} strokeLinecap="round" fill="none" />
              {[-170, -130, -90, -50].map((t, j) => (
                <ellipse key={j} cx={j % 2 ? 9 : -9} cy={t} rx={10} ry={5} fill={shade(CARROT, 0.1)} transform={`rotate(${j % 2 ? 30 : -30} 0 ${t})`} />
              ))}
            </g>
          ))}
        </g>
      ))}
      {/* tomato plant on a stake */}
      <rect x={244} y={-560} width={8} height={330} fill="#C9A36A" />
      <g transform={`translate(248 ${TOP}) rotate(${f1(rot(9, 2))})`}>
        <path d="M 0 0 Q 8 -160 0 -320 Q -6 -400 4 -470" stroke={CARROT} strokeWidth={10} strokeLinecap="round" fill="none" />
        {[-290, -350, -410, -460].map((ly, i) => (
          <g key={i}>
            <ellipse cx={-40} cy={ly} rx={42} ry={20} fill={greens} transform={`rotate(-25 -40 ${ly})`} />
            <ellipse cx={42} cy={ly - 20} rx={42} ry={20} fill={shade(greens, 0.15)} transform={`rotate(25 42 ${ly - 20})`} />
          </g>
        ))}
        <circle cx={-34} cy={-270} r={22} fill={TOMATO} />
        <circle cx={38} cy={-330} r={24} fill={TOMATO} />
        <circle cx={-26} cy={-390} r={22} fill={shade(TOMATO, 0.1)} />
        <circle cx={34} cy={-440} r={20} fill={TOMATO} />
        <circle cx={-28} cy={-262} r={5} fill={C.white} opacity={0.5} />
        <circle cx={30} cy={-322} r={5} fill={C.white} opacity={0.5} />
      </g>
      {/* box: back rim, soil edge, front boards and corner posts */}
      <rect x={-400} y={TOP - 30} width={800} height={26} rx={6} fill={shade(wood, 0.1)} />
      <rect x={-400} y={TOP - 4} width={800} height={16} fill={shade(wood, 0.25)} />
      <rect x={-400} y={TOP + 12} width={800} height={247} rx={6} fill={wood} />
      {[-120, -40, 40, 120].map((by, i) => (
        <rect key={i} x={-400} y={TOP + 12 + by + 40} width={800} height={8} fill={shade(wood, 0.18)} />
      ))}
      <rect x={-400} y={TOP + 12} width={24} height={247} fill={shade(wood, 0.2)} />
      <rect x={376} y={TOP + 12} width={24} height={247} fill={shade(wood, 0.2)} />
    </g>
  );
}
