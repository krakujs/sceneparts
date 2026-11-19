import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Folding ironing board: a patterned cover on a board with a pointed tip, held up by an X-frame of legs.
// Origin = bottom centre (the feet rest on y), real size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const TOP = -540, BOARD_H = 60;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const dk = shade(c, 0.2);
  // a repeating pattern of dots across the cover
  const dots: React.ReactNode[] = [];
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 9; i++) {
      dots.push(<circle key={`${row}-${i}`} cx={-340 + i * 84 + (row % 2) * 42} cy={TOP + 20 + row * 22} r={7} fill={C.white} opacity={0.55} />);
    }
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* X-frame legs, behind the board */}
        <line x1={-190} y1={TOP + BOARD_H} x2={150} y2={-6} stroke={C.greyDark} strokeWidth={24} strokeLinecap="round" />
        <line x1={150} y1={TOP + BOARD_H} x2={-190} y2={-6} stroke={C.greyDark} strokeWidth={24} strokeLinecap="round" />
        <circle cx={-20} cy={-270} r={16} fill={C.greyLight} />
        <rect x={-150} y={-14} width={44} height={14} rx={6} fill={C.inkSoft} />
        <rect x={112} y={-14} width={44} height={14} rx={6} fill={C.inkSoft} />

        {/* board underside */}
        <path d={`M -400 ${TOP + BOARD_H} L 300 ${TOP + BOARD_H} Q 360 ${TOP + BOARD_H} 360 ${TOP + BOARD_H - 22} L -400 ${TOP + BOARD_H - 2} Z`} fill={dk} />
        {/* patterned cover with a pointed tip */}
        <path d={`M -410 ${TOP} L 330 ${TOP} Q 412 ${TOP} 412 ${TOP + BOARD_H / 2} Q 412 ${TOP + BOARD_H} 330 ${TOP + BOARD_H} L -410 ${TOP + BOARD_H} Q -440 ${TOP + BOARD_H / 2} -410 ${TOP} Z`} fill={c} />
        {dots}
        {/* the cover's top edge */}
        <rect x={-410} y={TOP} width={740} height={8} rx={4} fill={shade(c, 0.1)} />
      </g>
    </g>
  );
}
