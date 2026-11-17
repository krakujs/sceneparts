import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// White picket fence segment, front view: thirteen pointed pickets on two rails, 1040 px wide so segments tile.
// Origin = bottom centre; the pickets stand on y. About 1040 px wide and 360 px tall at s = 1.
// anim "lights": a string of fairy lights along the top rail, one bulb lit after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const picket = p.color && p.color !== "none" ? p.color : C.white;
  const rails = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const pickets = Array.from({ length: 13 }, (_, i) => -480 + i * 80);
  const bulbs = Array.from({ length: 26 }, (_, i) => -500 + i * 40);
  const litIndex = Math.floor(f / 4) % bulbs.length;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={540} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-520} y={-270} width={1040} height={26} rx={6} fill={rails} />
        <rect x={-520} y={-140} width={1040} height={26} rx={6} fill={rails} />
        <rect x={-520} y={-262} width={1040} height={6} fill={shade(rails, 0.12)} />
        {pickets.map((px) => (
          <g key={px}>
            <path d={`M ${px - 28} 0 L ${px - 28} -300 L ${px} -360 L ${px + 28} -300 L ${px + 28} 0 Z`} fill={picket} />
            <rect x={px + 16} y={-296} width={12} height={296} fill={shade(picket, 0.12)} />
          </g>
        ))}
        {/* fairy lights along the top rail */}
        <rect x={-500} y={-288} width={1000} height={3} fill={C.greyDark} />
        {bulbs.map((bx, i) => (
          <circle key={bx} cx={bx} cy={-284} r={7}
            fill={anim === "lights" && i === litIndex ? C.yellow : C.greyLight} />
        ))}
      </g>
    </g>
  );
}
