import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Brick wall segment, front view: staggered courses of bricks in mortar, a stone plinth and a coping cap, 1000 px wide
// so segments tile across the frame. Origin = bottom centre; the plinth stands on y.
// About 1040 px wide and 480 px tall at s = 1.
// anim "lights": a string of small wall lights along the coping, one lit after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const brick = p.color && p.color !== "none" ? p.color : C.redDark;
  const mortar = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const rows = Array.from({ length: 9 }, (_, r) => r);
  const bricks: React.ReactNode[] = [];
  for (const r of rows) {
    const top = -82 - r * 42, offset = (r % 2) * 50;
    for (let c = 0; c < 12; c++) {
      const bx = -500 + offset - 102 + c * 102;
      const L = Math.max(bx, -500), R = Math.min(bx + 98, 500);
      if (R - L > 4) {
        bricks.push(
          <rect key={`${r}-${c}`} x={f1(L + 1)} y={top} width={f1(R - L - 2)} height={40} rx={3}
            fill={(r * 7 + c) % 5 === 0 ? shade(brick, 0.14) : brick} />,
        );
      }
    }
  }
  const lights = Array.from({ length: 21 }, (_, i) => -480 + i * 48);
  const litIndex = Math.floor(f / 4) % lights.length;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={540} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-520} y={-40} width={1040} height={40} rx={6} fill={C.greyDark} />
        <rect x={-500} y={-418} width={1000} height={378} fill={mortar} />
        {bricks}
        {/* coping cap */}
        <rect x={-520} y={-446} width={1040} height={28} rx={10} fill={C.greyDark} />
        <rect x={-520} y={-446} width={1040} height={7} rx={4} fill={C.grey} />
        {/* wall lights along the coping */}
        {lights.map((lx, i) => (
          <circle key={lx} cx={lx} cy={-458} r={7}
            fill={anim === "lights" && i === litIndex ? C.yellow : C.greyLight} />
        ))}
      </g>
    </g>
  );
}
