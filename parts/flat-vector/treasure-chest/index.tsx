import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden treasure chest with iron bands and a lock. Open state: the lid is tipped back and a heap of gold
// coins and glowing gems sits inside. Origin = bottom centre. About 440 px wide and 340 px tall at s = 1
// (the open lid adds about 160 px).
const f1 = (v: number) => v.toFixed(1);
const WOOD = C.brown, WOOD_D = C.brownDark, IRON = C.greyDark;
const GEMS = [{ x: -110, y: -270, c: C.teal }, { x: -20, y: -300, c: C.red }, { x: 80, y: -270, c: C.purple }, { x: 140, y: -300, c: C.blue }];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const open = (p.state ?? "open") !== "closed";
  const glow = (p.anim ?? "glow") === "glow" && open;
  const tw = (i: number) => (glow ? 0.5 + 0.5 * Math.sin(f * 0.2 + i * 1.7) : 1);
  const bands = (top: number, h: number) => [-150, 0, 150].map((bx) => <rect key={bx} x={bx - 14} y={top} width={28} height={h} fill={IRON} />);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={16} fill={C.shadow} />
      {open && (
        <g>
          {/* lid tipped back behind the chest */}
          <path d="M -200 -226 L -180 -390 Q 0 -420 180 -390 L 200 -226 Z" fill={shade(WOOD, 0.1)} />
          <path d="M -170 -240 L -158 -370 Q 0 -392 158 -370 L 170 -240 Z" fill={WOOD} opacity={0.6} />
          {bands(-400, 170).map((b, i) => <g key={i}>{b}</g>)}
        </g>
      )}
      {/* chest body */}
      <rect x={-210} y={-220} width={420} height={220} rx={12} fill={WOOD} />
      <rect x={-210} y={-220} width={60} height={220} rx={10} fill={WOOD_D} opacity={0.4} />
      {bands(-220, 220)}
      <rect x={-210} y={-130} width={420} height={18} fill={IRON} />
      <rect x={-30} y={-150} width={60} height={60} rx={10} fill={C.yellow} />
      <circle cx={0} cy={-124} r={8} fill={C.yellowDark} />
      {open ? (
        <g>
          {/* interior and treasure, sitting in the open top */}
          <ellipse cx={0} cy={-222} rx={196} ry={30} fill={C.navy} />
          {[-120, -50, 20, 90].map((cx, i) => (
            <ellipse key={i} cx={cx} cy={-236} rx={52} ry={24} fill={i % 2 ? C.yellow : C.yellowDark} />
          ))}
          {GEMS.map((g, i) => (
            <g key={i} opacity={tw(i)}>
              {glow && <circle cx={g.x} cy={g.y} r={34} fill={g.c} opacity={0.18} />}
              <path d={`M ${g.x} ${g.y - 22} L ${g.x + 18} ${g.y} L ${g.x} ${g.y + 22} L ${g.x - 18} ${g.y} Z`} fill={g.c} />
            </g>
          ))}
        </g>
      ) : (
        <path d="M -210 -220 Q -210 -320 0 -326 Q 210 -320 210 -220 Z" fill={shade(WOOD, 0.1)} />
      )}
      {!open && bands(-326, 106)}
    </g>
  );
}
